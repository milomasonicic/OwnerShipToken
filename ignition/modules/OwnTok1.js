const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


const OwnTok1 = buildModule("OwnTok1", (m) => {

  const ownership  = m.contract("OwnToken1");

  return { ownership };

})

module.exports = OwnTok1
