const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, modelName) => {
  const reg = "[a-zA-Z0-9]$";
  const { email, password } = req.body;
  if (
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
  const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN, {
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
