require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const models = require('./models');

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

const createTokens = (id, email, isOwner) => {
  const accessToken = jwt.sign(
    { email, isOwner, id },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: '15m',
    }
  );
  const refreshToken = jwt.sign(
    { email, isOwner, id },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: '7d',
    }
  );
  return { id, email, isOwner, accessToken, refreshToken };
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const ownerUser = await models.Owners.findOne({ where: { email: email } });
  const renterUser = await models.Renters.findOne({ where: { email: email } });
  if (!ownerUser && !renterUser)
    return res.status(404).json({ error: "User doesn't exists" });
  let isOwnerPasswordCorrect;
  let isRenterPasswordCorrect;
  if (ownerUser) {
    isOwnerPasswordCorrect = bcrypt.compareSync(password, ownerUser.password);
  }
  if (renterUser) {
    isRenterPasswordCorrect = bcrypt.compareSync(password, renterUser.password);
  }
  if (!isOwnerPasswordCorrect && !isRenterPasswordCorrect)
    return res.status(403).json({ error: 'Incorrect password' });
  if (!isOwnerPasswordCorrect && isRenterPasswordCorrect)
    return res.json([createTokens(renterUser.id, email, false)]);
  if (isOwnerPasswordCorrect && !isRenterPasswordCorrect)
    return res.json([createTokens(ownerUser.id, email, true)]);
  if (isOwnerPasswordCorrect && isRenterPasswordCorrect)
    return res.json([
      createTokens(ownerUser.id, email, true),
      createTokens(renterUser.id, email, false),
    ]);
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
