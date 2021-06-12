pragma solidity ^0.5.0;
import './DappToken.sol';
import './DaiToken.sol';


contract TokenFarm {
    
    string public name = "DApp Token Farm";
    DappToken public dappToken;
    DaiToken public daiToken;

    address[] public stakers;
    mapping(address => unit) public stakingBalance;
    mapping(address => bool) public hasStaked;

    constructor(DappToken _dappToken, DaiToken _daiToken) public {
        dappToken = _dappToken;
        daiToken = _daiToken;
    }

    mapping
    
    // 1. Stake tokens (Deposit) --> here the investor will deposit Dai to earn rewards
    function stakeTokens(unit _amount) public {
        // Transfer Mock Dai tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        //update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        //Add user to stakers array *only* if they haven't staked already
        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender)
        }
    }
    // 2. Unsaking tokens (Withdraw)

    // 3. Issuing Tokens
}

