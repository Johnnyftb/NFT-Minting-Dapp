// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

/// @title John's ERC721A Contract
/// @author John Pioc (www.johnpioc.com)
/// @notice This contract can be used to mint ERC721A standard NFTs with industry standard functionality - whitelisted addresses, reveals, NFT metadata, etc.

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

error CallerIsNotUser();
error InsufficientFunds();

contract NFT is ERC721A, Ownable {

    uint256 public mintPrice = 0.005 ether;
    string public baseUri = "https://gateway.pinata.cloud/ipfs/QmVnRCPwPBJVpGpCgbEmgBfp5LTm6hT56URrzq4ApNegLm/1.json";

    /// @notice Modifier to verify that caller doesn't come from a contract
    modifier callerIsUser() {
        if (tx.origin != msg.sender) revert CallerIsNotUser();
        _;
    }

    constructor() ERC721A ("NFT", "NFT") {}

    /// @notice Function to mint NFTs during the public sale
    /// @param _mintAmount Number of NFTs to mint
    function mint(uint64 _mintAmount) public payable callerIsUser {
        if (msg.value < _mintAmount * mintPrice) revert InsufficientFunds();

        _safeMint(msg.sender, _mintAmount);
    }

    /// @notice Generates and returns the token URI for a given token ID
    /// @param _tokenId An NFT's token ID
    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        return baseUri;
    }

    /// @notice Withdraws all ETH from contract to owner's address
    /// @dev Only owner can call this function
    function withdraw() public payable onlyOwner {
        (bool os,) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }
}