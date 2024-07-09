// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

//preTest
contract OwnBurnable is ERC20, ERC20Burnable {

    uint256 public totalDeposit;
    uint256  counterValue = 5;
    mapping(address => uint256) public deposits;
    mapping(address => uint256) public ownership;
    address [] public participants;
    mapping(address => bool) public isParticipant;

    constructor() ERC20("Ownership Token", "OWN"){}

    function deposit() external payable {

        require(msg.value > 0, "You have to invest some ETH");

        if(!isParticipant[msg.sender]) {
            participants.push(msg.sender);
            isParticipant[msg.sender] = true;
        }

        deposits[msg.sender] += msg.value;
        totalDeposit += msg.value;

        updateOwnership();

        uint256 amountMint = msg.value/counterValue;
        _mint(msg.sender, amountMint);

    }

    function updateOwnership() internal {

        for(uint256 i = 0; i<participants.length; i++) {
            address participant = participants[i];
            ownership[participant] = (deposits[participant] * 100)/ totalDeposit;
        }

    }  

     function getParticipants() external view returns (address[] memory) {
        return participants;
    }

    function burn(uint256 amount) public override {
        require(balanceOf(msg.sender) >= amount, "Not Enough OWN tokens to burn");

        _burn(msg.sender, amount);

        uint256 ethAmount = amount * counterValue;
        require(address(this).balance >= ethAmount, "Not Enough OWN tokens to burn");

        uint256 withdrawAmount = ethAmount;

        deposits[msg.sender] -= withdrawAmount;
        totalDeposit -= withdrawAmount;

        payable(msg.sender).transfer(withdrawAmount);
        updateOwnership();

    }

}