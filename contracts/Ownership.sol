// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Own is ERC20 {

    uint256 public totalDeposit;
    uint256  counterValue = 5;
    mapping(address => uint256) public deposits;
    mapping(address => uint256) public owwnerSip;
    address [] public participants;
    mapping(address => bool) public isParticipant;

    constructor() ERC20("Ownership Token", "OWN"){

    }

    function deposit() external payable {

        require(msg.value > 0, "You have to invest some ETH");

        if(!isParticipant[msg.sender]) {
            participants.push(msg.sender);
            isParticipant[msg.sender] = true;
        }

        deposits[msg.sender] += msg.value;
        totalDeposit += msg.value;

        updateOwnership(msg.sender);

        uint256 amountMint = msg.value/counterValue;
        _mint(msg.sender, amountMint);

    }

    function updateOwnership(address user) internal {

        owwnerSip[user] = (deposits[user] * 100)/ totalDeposit;

    }  

     function getParticipants() external view returns (address[] memory) {
        return participants;
    }

}