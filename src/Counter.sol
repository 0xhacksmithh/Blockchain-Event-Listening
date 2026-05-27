// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract Counter {

    uint256 public count;

    event Incremented(
        address indexed user,
        uint256 value
    );

    constructor(uint256 _count) {
        count = _count;
    }

    function increment() public {

        count++;

        emit Incremented(
            msg.sender,
            count
        );
    }

    function getCount()
        public
        view
        returns(uint256)
    {
        return count;
    }
}