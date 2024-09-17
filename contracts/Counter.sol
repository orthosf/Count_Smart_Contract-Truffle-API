// Counter.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 public count = 0;
    function increment() public {
        count++;
    }
    function decrement() public {
        require(count>0, "Count cannot be less than 0");
        count-=1;
    }
    

    function getCount() public view returns (uint256) {
        return count;
    }
}