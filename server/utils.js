const bcrypt = require("bcrypt");

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

module.exports = { register };
