const siteData = require("../model/jobs");

module.exports.home = function (req, res) {
  res.json(siteData);
};
