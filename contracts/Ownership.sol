// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OwnershipToken is ERC20 {

    uint256 public totalDeposit;
    mapping(address => uint256) public deposits;
    mapping(address => uint256) public owwnerShip;

    constructor() ERC20("Ownership Token", "OWN"){

    }

    function deposit() external payable {

        require(msg.value > 0, "You have to invest some ETH");

        deposits[msg.sender] += msg.value;
        totalDeposit += msg.value;

        updateOwnership(msg.sender);

        _mint(msg.sender, msg.value);
    }

    function updateOwnership(address user) internal {

        owwnerShip[user] = (deposits[user] * 100)/ totalDeposit;

    }

}