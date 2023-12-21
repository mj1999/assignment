const fs = require("fs");
const siteData = JSON.parse(fs.readFileSync("./rawSiteData.json", "utf8"));
// console.log(siteData);
module.exports = siteData;
