const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async (deployer, network, accounts) => {
  //Depoloy Mock Dai Token
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  //Depoloy DappToken 
  await deployer.deploy(DappToken)
  const dappToken = await DappToken.deployed()

  //Depoloy TokenFarm
  await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
  const tokenFarm = await TokenFarm.deployed()

  //Transfer all tokens to TokenFarm (1M)

  await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

  // Trasnfer 100 mock DAI tokens to investor
  await daiToken.transfer(accounts[1], '1000000000000000000000000')

};
  