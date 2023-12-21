const electriciansData = require("../model/electricians");
const siteData = require("../model/jobs");

electriciansData.forEach((electrician) => {
  electrician.assignmentsCount = 0;
});

module.exports.autoAssign = function (req, res) {
  siteData.forEach((site) => {
    const availableElectricians = getAvailableElectricians(
      site.InstallationDate,
      site.grievance
    );
    if (availableElectricians.length > 0) {
      const assignedElectricians = availableElectricians.sort(
        (a, b) => a.assignmentsCount - b.assignmentsCount
      );

      console.log(assignedElectricians);
      assignElectricianToSite(assignedElectricians[0], site);
    }
  });
  res.json(siteData);
};

function getAvailableElectricians(date, isGrievanceSite) {
  const availableElectricians = electriciansData.filter((electrician) => {
    const canHandleGrievances = electrician.grievanceElectrician;
    const assignmentsOnDay = isNaN(electrician[date]) ? 0 : electrician[date];
    return canHandleGrievances === isGrievanceSite && assignmentsOnDay < 3;
  });

  return availableElectricians;
}

function assignElectricianToSite(electrician, site) {
  site.AssignedElectritian.push({
    electricianName: electrician.name,
    electricianAssignDate: new Date(),
  });
  //using below code to take note of assignments on a given day, based on which we can later make sure that we dont have more than three assignments on a given day for a electrician
  electrician[site.InstallationDate] = electrician[site.InstallationDate]
    ? electrician[site.InstallationDate] + 1
    : 1;
  electrician.assignmentsCount++;
}
