//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract ModifyVariable {
    uint public x;
    string public s;

    constructor(uint _x, string memory _s) {
        x = _x;
        s = _s;
    }

    function modifyToLeet() public {
        x = 1337;
        s = "leet";
    }
}
