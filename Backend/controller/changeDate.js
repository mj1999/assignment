const siteData = require("../model/jobs");
siteData.forEach((site, idx) => {
  site.id = idx;
});
module.exports.changeDate = function (req, res) {
  const siteId = req.body.id;
  const newInstallationDate = req.body.date;
  const site = siteData.find((s) => s.id == siteId);
  if (site) {
    console.log(site);
    site.installationDate = newInstallationDate;
    res.json({ message: "Installation date updated successfully" });
  } else {
    res.status(404).json({ message: "Site not found" });
  }
};
