// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Test.sol";
import "../src/Counter.sol";

contract CounterTest is Test {

    Counter counter;

    function setUp() public {

        counter =
            new Counter(0);
    }

    function testIncrement() public {

        counter.increment();

        assertEq(
            counter.getCount(),
            1
        );
    }
}