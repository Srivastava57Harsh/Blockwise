// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SplitExpense {
    address public owner;
    uint256 public totalExpense;
    mapping(address => uint256) public shares;
    mapping(address => bool) public paymentSettled;

    // Mapping to store group name to the mapping of addresses to shares
    mapping(string => mapping(address => uint256)) public groupShares;

    // Array to store friends
    address[] public friends;

    event ExpenseCreated(address indexed creator, uint256 totalExpense);
    event ExpenseSplit(address indexed payer, uint256 amount, string groupName);
    event ExpenseSettled(address indexed payer, uint256 amount, string groupName);

    // Remove the onlyOwner modifier from the constructor
    constructor() {
        owner = msg.sender;
    }

    // Function to set the total expense
    function setExpense(uint256 _totalExpense) external {
        // Allow any wallet to call this function
        totalExpense = _totalExpense;

        // Emit event for expense creation
        emit ExpenseCreated(msg.sender, _totalExpense);
    }

    // Function to split the expense among friends in a group
    function splitExpense(address[] calldata _friends, string memory _groupName) external {
        uint256 numberOfFriends = _friends.length;
        require(numberOfFriends > 0, "At least one friend is required");

        // Set the friends array
        friends = _friends;

        uint256 sharePerFriend = totalExpense / numberOfFriends;

        for (uint256 i = 0; i < numberOfFriends; i++) {
            shares[_friends[i]] = sharePerFriend;
            paymentSettled[_friends[i]] = false; // Initialize paymentSettled to false for each friend
            groupShares[_groupName][_friends[i]] = sharePerFriend; // Store shares in the group mapping
        }

        // Emit event for expense splitting
        emit ExpenseSplit(msg.sender, totalExpense, _groupName);
    }

    // Function to calculate individual payment
    function calculatePayment() external view returns (uint256) {
        return shares[msg.sender];
    }

    // Function to calculate group payment for a specific group
    function calculateGroupPayment(string memory _groupName) external view returns (uint256) {
        return groupShares[_groupName][msg.sender];
    }

    // Function to settle individual payment
    function payMyShare() external payable {
        uint256 amountToPay = shares[msg.sender];
        require(amountToPay > 0, "You don't have any outstanding payment");
        require(!paymentSettled[msg.sender], "Payment has already been settled");
        require(msg.value >= amountToPay, "Insufficient funds sent");

        // Mark payment as settled before transferring funds
        paymentSettled[msg.sender] = true;

        // Emit event for expense settlement
        emit ExpenseSettled(msg.sender, amountToPay, "");

        // Optionally, you can transfer any excess funds back to the payer
        if (msg.value > amountToPay) {
            payable(msg.sender).transfer(msg.value - amountToPay);
        }

        // You can implement additional logic here, such as emitting an event
        // or updating other state variables
    }

    // Function to settle group payment for a specific group
    function payGroupShare(string memory _groupName) external payable {
        uint256 amountToPay = groupShares[_groupName][msg.sender];
        require(amountToPay > 0, "You don't have any outstanding group payment");
        require(!paymentSettled[msg.sender], "Group payment has already been settled");
        require(msg.value >= amountToPay, "Insufficient funds sent");

        // Mark group payment as settled before transferring funds
        paymentSettled[msg.sender] = true;

        // Emit event for group expense settlement
        emit ExpenseSettled(msg.sender, amountToPay, _groupName);

        // Optionally, you can transfer any excess funds back to the payer
        if (msg.value > amountToPay) {
            payable(msg.sender).transfer(msg.value - amountToPay);
        }

        // You can implement additional logic here, such as emitting an event
        // or updating other state variables
    }

    // Function to get all shares and corresponding addresses for a specific group
    function getGroupShares(string memory _groupName) external view returns (address[] memory, uint256[] memory) {
        uint256 numberOfFriends = 0;
        for (uint256 i = 0; i < friends.length; i++) {
            if (groupShares[_groupName][friends[i]] > 0) {
                numberOfFriends++;
            }
        }

        address[] memory friendAddresses = new address[](numberOfFriends);
        uint256[] memory friendShares = new uint256[](numberOfFriends);

        uint256 index = 0;
        for (uint256 i = 0; i < friends.length; i++) {
            if (groupShares[_groupName][friends[i]] > 0) {
                friendAddresses[index] = friends[i];
                friendShares[index] = groupShares[_groupName][friends[i]];
                index++;
            }
        }

        return (friendAddresses, friendShares);
    }
}
