// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SplitExpense {
    mapping(address => uint256) public shares;
    address[] private _friends;

    event ExpenseSplit(address indexed payer, uint256 amount);

    function splitExpense(address[] calldata friends, uint256 amount) external {
        uint256 numberOfFriends = friends.length;
        require(numberOfFriends > 0, "At least one friend is required");

        _friends = friends; // Set the _friends array

        uint256 sharePerFriend = amount / numberOfFriends;

        for (uint256 i = 0; i < numberOfFriends; i++) {
            shares[friends[i]] = sharePerFriend;
        }

        // Emit event for expense splitting
        emit ExpenseSplit(msg.sender, amount);
    }

    // Function to get all shares and corresponding addresses
    function getShares() external view returns (address[] memory, uint256[] memory) {
        uint256 numberOfFriends = 0;
        for (uint256 i = 0; i < _friends.length; i++) {
            if (shares[_friends[i]] > 0) {
                numberOfFriends++;
            }
        }

        address[] memory friendAddresses = new address[](numberOfFriends);
        uint256[] memory friendShares = new uint256[](numberOfFriends);

        uint256 index = 0;
        for (uint256 i = 0; i < _friends.length; i++) {
            if (shares[_friends[i]] > 0) {
                friendAddresses[index] = _friends[i];
                friendShares[index] = shares[_friends[i]];
                index++;
            }
        }

        return (friendAddresses, friendShares);
    }
}
