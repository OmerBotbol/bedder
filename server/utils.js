const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const register = async (req, modelName) => {
  const reg = "[a-zA-Z0-9]$";
  const { email, password } = req.body;
  const isValidEmail = await axios.get(
    `http://apilayer.net/api/check?access_key=7f5ccfb6d92c49b992ad51d6c10278fb&email=${email}&smtp=1&format=1`
  );
  if (
    !(
      isValidEmail.data.format_valid &&
      isValidEmail.data.mx_found &&
      isValidEmail.data.smtp_check
    ) ||
    email === "" ||
    password === "" ||
    !email.match(reg) ||
    !password.match(reg)
  )
    return "Invalid email or password";
  const exists = await modelName.findOne({ where: { email: email } });
  if (exists) return "Email exists";
  return await bcrypt.hash(password, bcrypt.genSaltSync(10));
};

const validateEmail = (email) => {
  const unirest = require("unirest");
  const req = unirest("GET", "https://email-checker.p.rapidapi.com/verify/v1");
  req.query({
    email: email,
  });
  req.headers({
    "x-rapidapi-host": "email-checker.p.rapidapi.com",
    useQueryString: true,
  });

  req.end(function (res) {
    if (res.error) return new Error(res.error);

    return res.body;
  });
};

const login = async (req, res, modelName, isOwner) => {
  const { email, password } = req.body;
  const user = await modelName.findOne({ where: { email: email } });
  if (!user) return res.status(404).json({ error: "User doesn't exists" });
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect)
    return res.status(403).json({ error: "Incorrect password" });
  const accessToken = jwt.sign({ email, isOwner }, process.env.ACCESS_TOKEN, {
    expiresIn: "2m",
  });
  const refreshToken = jwt.sign({ email, isOwner }, process.env.REFRESH_TOKEN, {
    expiresIn: "7d",
  });
  sendRefreshToken(refreshToken, res);
  return res.json({ email, accessToken, refreshToken });
};

//send the refresh token to cookie
function sendRefreshToken(refreshToken, response) {
  response.cookie("refreshToken", refreshToken, {
    expires: new Date(Date.now() * 1000 * 60 * 60 * 24 * 7),
    httpOnly: true,
    // secure: true,
  });
}

module.exports = { register, login, sendRefreshToken };
