// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SettleExpense {
    address public owner;

    event FundsTransferred(address indexed sender, address indexed recipient, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function settleExpense(address payable _recipient, uint256 _amount) external onlyOwner {
        require(_recipient != address(0), "Invalid recipient address");
        require(_amount > 0, "Invalid amount");

        uint256 balanceBeforeTransfer = address(this).balance;

        // Transfer funds to the recipient
        _recipient.transfer(_amount);

        // Ensure the balance has been updated correctly
        require(address(this).balance == balanceBeforeTransfer - _amount, "Transfer failed");
        
        // Log the event
        emit FundsTransferred(msg.sender, _recipient, _amount);
    }

    receive() external payable {
        require(msg.value > 0, "Invalid amount");
        // Additional custom logic if needed
    }
}