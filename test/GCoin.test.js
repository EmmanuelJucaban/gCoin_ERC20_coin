const GCoin = artifacts.require('GCoin.sol');

const chai = require('chai');
const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;


contract("Test token creation", async (accounts) => {

  let instance;
  let totalSupply;
  beforeEach(async () => {
    instance = await GCoin.deployed();
    totalSupply = await instance.totalSupply();
  });


  const [deployerAccount, receiverAccount, ] = accounts;
  it('should create the tokens in my account', async () => {
    expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  it('should not allow to send more tokens than available in total', async () => {
    const deployerBalance = await instance.balanceOf(deployerAccount);
    expect(instance.transfer(receiverAccount, new BN(deployerBalance + 1))).to.eventually.be.rejected;
    expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(deployerBalance);
  });

  it('should allow tokens to be sent between accounts', async () => {
    const amountToSend = 1;
    expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    expect(instance.transfer(receiverAccount, amountToSend)).to.eventually.be.fulfilled;
    expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(amountToSend)));
    expect(instance.balanceOf(receiverAccount)).to.eventually.be.a.bignumber.equal(new BN(amountToSend));
  });


});
