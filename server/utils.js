require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const register = async (req, modelName) => {
  const reg = '[a-zA-Z0-9]$';
  const { email, password } = req.body;
  console.log(email, password);
  const isValidEmail = await axios.get(
    `http://apilayer.net/api/check?access_key=7f5ccfb6d92c49b992ad51d6c10278fb&email=${email}&smtp=1&format=1`
  );
  if (
    !(
      isValidEmail.data.format_valid &&
      isValidEmail.data.mx_found &&
      isValidEmail.data.smtp_check
    ) ||
    email === '' ||
    password === '' ||
    !email.match(reg) ||
    !password.match(reg)
  )
    return 'Invalid email or password';
  const exists = await modelName.findOne({ where: { email: email } });
  if (exists) return 'Email exists';
  return await bcrypt.hash(password, bcrypt.genSaltSync(10));
};

const login = async (req, res, modelName, isOwner) => {
  const { email, password } = req.body;
  const user = await modelName.findOne({ where: { email: email } });
  if (!user) return res.status(404).json({ error: "User doesn't exists" });
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect)
    return res.status(403).json({ error: 'Incorrect password' });
  const accessToken = jwt.sign(
    { email, isOwner, id: user.id },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: '15m',
    }
  );
  const refreshToken = jwt.sign(
    { email, isOwner, id: user.id },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: '7d',
    }
  );
  return res.json({ id: user.id, email, isOwner, accessToken, refreshToken });
};

function validateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token.length < 10) return res.status(401).send('Access Token Required');
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).send('Invalid Access Token');
    }
    req.data = decoded;
    next();
  });
}

module.exports = { register, login, validateToken };
