const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


const OwnershipTokenModule = buildModule("OwnershipToken", (m) => {

  const ownership  = m.contract("OwnershipToken");

  return { ownership };

})

module.exports = OwnershipTokenModule
