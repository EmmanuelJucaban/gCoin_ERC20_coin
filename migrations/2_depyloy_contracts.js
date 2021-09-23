const GCoin = artifacts.require("GCoin.sol");
module.exports = async (deployer) => {
  await deployer.deploy(GCoin, 100000);
};
