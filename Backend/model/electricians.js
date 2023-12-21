const fs = require("fs");
var electricianData = JSON.parse(
  fs.readFileSync("./electricianData.json", "utf8")
);
module.exports = electricianData;
