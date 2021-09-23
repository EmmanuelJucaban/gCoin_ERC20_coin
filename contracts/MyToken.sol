pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GCoin is ERC20 {
  constructor(uint256 initialSupply) ERC20("GCoin", "XRG") {
    _mint(msg.sender, initialSupply);
  }
}
