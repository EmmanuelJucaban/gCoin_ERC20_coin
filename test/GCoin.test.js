const GCoin = artifacts.require('GCoin.sol');

const chai = require('chai');
const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;


contract("Test token creation", async (accounts) => {
  it('should create the tokens in my account', async () => {
    const instance = await GCoin.deployed();
    const totalSupply = await instance.totalSupply();
    expect(await instance.balanceOf(accounts[0])).to.be.a.bignumber.equal(totalSupply);
  });
});
