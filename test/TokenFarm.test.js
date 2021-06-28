const { assert } = require('chai');
const { default: Web3 } = require('web3');

const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require("TokenFarm");

require('chai')
    .use(require('chai-as-promised'))
    .should()

const tokens = n => {
    return web3.utils.toWei(n, 'ether')
}

contract('TokenFarm', ([owner,investor]) => {
    let daiToken, dappToken, tokenFarm

    before(async () => {
        //Load contractos
        daiToken = await DaiToken.new()
        dappToken = await DappToken.new()
        tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)

        //Transfer all Dapp Tokens to farm (1 million)
        await dappToken.transfer(tokenFarm.address, tokens('1000000'))

        //Send tokens to onvestor
        await daiToken.transfer(investor, tokens('100'), {from: owner})

    })

    describe('Mock DAI deployment', async () =>{
        it('has a name', async ()=>{
            
            const name = await daiToken.name()
            assert.equal(name, 'Mock DAI Token')
        })
    })

    describe('MORTY Token deployment', async () =>{
        it('has a name', async ()=>{
            
            const name = await dappToken.name()
            assert.equal(name, 'MORTY TOKEN')
        })
    })

    describe('Token Farm deployment', async () =>{
        it('has a name', async () => {
            
            const name = await tokenFarm.name()
            assert.equal(name, 'DApp Token Farm')
        })

        it('contract has tokens', async () => {
            let balance = await dappToken.balanceOf(tokenFarm.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })

        it('rewards investors for stakin mDai tokens', async () => {
            let result
            
            //Check investor balance before staking
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct before staking')

            // Approve tokens to be farm
            await daiToken.approve(tokenFarm.address, tokens('100'), { from: investor })
            // Stake Mock DAI Tokens
            await tokenFarm.stakeTokens(tokens('100'), { from: investor })
            
            // Check staking result
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('0'), 'investor Mock DAI wallet balance correct after staking')

            result = await daiToken.balanceOf(tokenFarm.address)
            assert.equal(result.toString(), tokens('100'), 'Token Farm Mock DAI balance correct after staking')

            result = await tokenFarm.stakingBalance(investor)
            assert.equal(result.toString(), tokens('100'), 'investor staking balance correct after staking')
            
            //Issue tokens
            await tokenFarm.issueTokens({ from: owner })
            
            //check balances after issuance
            result = await dappToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('100'), 'Investor DApp Token wallet balance correct after issuance')

            //Ensure that only owner can issue tokens
            await tokenFarm.issueTokens({from: investor}).should.be.rejected

            //unstake tokens
            await tokenFarm.unstakeTokens({ from: investor })

            //Check results after unstaking
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('100'), 'Investor Mock DAI wallet balance correct after staking')

            result = await daiToken.balanceOf(tokenFarm.address)
            assert.equal(result.toString(), tokens('0'), 'Investor staking balance correct after staking')

            result = await tokenFarm.stakingBalance(investor)
            assert.equal(result.toString(), tokens('0'), 'Investor staking balance correct after staking')

            result = await tokenFarm.isStaking(investor)
            assert.equal(result.toString(), 'false', 'Investor staking status correct after staking')
        })

    })
})