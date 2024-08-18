const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const DeployModule = buildModule("NFTModule", (m) => {
  const marketPlace = m.contract("Marketplace");
  return marketPlace;
});

module.exports = DeployModule;
