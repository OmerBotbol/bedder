require("dotenv").config();
const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log("listening to port " + process.env.PORT);
});
