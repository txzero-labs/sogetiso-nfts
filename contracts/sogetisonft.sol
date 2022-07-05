// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "erc721a/contracts/ERC721A.sol";

error MaxSupplyExceeded();

contract SogetiSoNFT is ERC721A, Ownable {

  // Max number of NFTs in collection
  uint16 public constant MAX_SUPPLY = 300;

  // First tokenId from which mint will start
  uint8 public constant START_TOKEN_ID = 1;

  // IPFS Metadata URI
  string private _baseUri;
  
  constructor(
    string memory name,
    string memory symbol,
    string memory base
  ) ERC721A(name, symbol) {
    _baseUri = base;
  }

  function _startTokenId() internal pure override returns (uint256) {
    return START_TOKEN_ID;
  }

  function _baseURI() internal view override returns (string memory) {
    return _baseUri;
  }

  function setBaseUri(string memory newBase) external onlyOwner {
    _baseUri = newBase;
  }

  function mint(address to, uint256 quantity) external onlyOwner {
    if (totalSupply() + quantity > MAX_SUPPLY) revert MaxSupplyExceeded();

    _safeMint(to, quantity);
  }
}