// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Script.sol";
import "../src/Counter.sol";

contract DeployCounter is Script {

    function run() external {

        vm.startBroadcast();

        Counter counter =
            new Counter(0);

        console.log(
            "Counter deployed to:",
            address(counter)
        );

        vm.stopBroadcast();
    }
}