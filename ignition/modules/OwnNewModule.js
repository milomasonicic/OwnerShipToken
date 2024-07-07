const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


const OwnNew = buildModule("OwnNew", (m) => {

  const ownership  = m.contract("OwnNew");

  return { ownership };

})

module.exports = OwnNew
