const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


const OwnTok = buildModule("OwnTok", (m) => {

  const ownership  = m.contract("Own");

  return { ownership };

})

module.exports = OwnTok
