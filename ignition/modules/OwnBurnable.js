const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


const OwnBurnable = buildModule("OwnBurnable", (m) => {

  const ownership  = m.contract("OwnBurnable");

  return { ownership };

})

module.exports = OwnBurnable
