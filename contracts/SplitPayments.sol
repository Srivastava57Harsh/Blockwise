// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SplitPayments {
    address public owner;
    mapping(address => uint256) public balances;
    uint256 public totalBalance;

    event ExpenseAdded(address indexed payer, uint256 amount);
    event ExpenseSettled(address indexed payer, address indexed payee, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addExpense() external payable {
        require(msg.value > 0, "Expense amount must be greater than 0");

        balances[msg.sender] += msg.value;
        totalBalance += msg.value;

        emit ExpenseAdded(msg.sender, msg.value);
    }

    function settleExpense(address payable payee) external onlyOwner {
        require(balances[payee] > 0, "Payee has no outstanding balance");

        uint256 amountToPay = balances[payee];
        balances[payee] = 0;
        totalBalance -= amountToPay;

        payee.transfer(amountToPay);

        emit ExpenseSettled(owner, payee, amountToPay);
    }

    function getBalance(address account) external view returns (uint256) {
        return balances[account];
    }

    function getTotalBalance() external view returns (uint256) {
        return totalBalance;
    }
}
