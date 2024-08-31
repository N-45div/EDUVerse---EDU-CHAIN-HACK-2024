// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Marketplace is ERC721URIStorage {
    // State variables
    address payable public marketplaceOwner;
    uint256 public feePercent = 10;
    uint256 private tokenIdCounter;
    uint256 private itemsSold;

    struct Listing {
        uint256 tokenId;
        address payable currentOwner;
        address payable creator;
        uint256 price;
    }

    mapping(uint256 => Listing) private idToListing;

    modifier onlyOwner {
        require(msg.sender == marketplaceOwner, "Caller is not the marketplace owner");
        _;
    }

    constructor() ERC721("Marketplace", "MP") {
        marketplaceOwner = payable(msg.sender);
    }

    // Admin functions
    function setFeePercent(uint256 _feePercent) public onlyOwner {
        feePercent = _feePercent;
    }

    function getFeePercent() public view returns (uint256) {
        return feePercent;
    }

    function getTokenIdCounter() public view returns(uint256) {
        return tokenIdCounter;
    }

    function getListingById(uint256 _tokenId) public view returns(Listing memory) {
        return idToListing[_tokenId];
    }

    // Main functions
    function mintToken(string memory _tokenURI, uint256 _price) public returns(uint256) {
        require(_price > 0, "Price must be greater than zero");
        tokenIdCounter++;
        uint256 newTokenId = tokenIdCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        _createListing(newTokenId, _price);

        return newTokenId;
    }

    function _createListing(uint256 _tokenId, uint256 _price) private {
        idToListing[_tokenId] = Listing({
            tokenId: _tokenId,
            currentOwner: payable(msg.sender),
            creator: payable(msg.sender),
            price: _price
        });
    }

    function purchaseNFT(uint256 _tokenId) public payable {
        Listing storage listing = idToListing[_tokenId];
        uint256 price = listing.price;
        address payable creator = listing.creator;

        require(msg.value == price, "Incorrect payment amount");

        listing.creator = payable(msg.sender);
        itemsSold++;

        _transfer(listing.currentOwner, msg.sender, _tokenId);

        uint256 feeAmount = (price * feePercent) / 100;
        marketplaceOwner.transfer(feeAmount);
        creator.transfer(msg.value - feeAmount);
    }

    function listAllNFTs() public view returns (Listing[] memory) {
        uint256 totalTokens = tokenIdCounter;
        Listing[] memory nfts = new Listing[](totalTokens);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalTokens; i++) {
            uint256 tokenId = i + 1;
            Listing storage listing = idToListing[tokenId];
            nfts[currentIndex] = listing;
            currentIndex++;
        }

        return nfts;
    }

    // Get NFTs owned or created by the user
    function getUserNFTs() public view returns(Listing[] memory) {
        uint256 totalTokens = tokenIdCounter;
        uint256 userNFTCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalTokens; i++) {
            if (idToListing[i+1].currentOwner == msg.sender || idToListing[i+1].creator == msg.sender) {
                userNFTCount++;
            }
        }

        Listing[] memory userNFTs = new Listing[](userNFTCount);
        for (uint256 i = 0; i < totalTokens; i++) {
            if (idToListing[i+1].currentOwner == msg.sender || idToListing[i+1].creator == msg.sender) {
                uint256 tokenId = i + 1;
                Listing storage listing = idToListing[tokenId];
                userNFTs[currentIndex] = listing;
                currentIndex++;
            }
        }

        return userNFTs;
    }
}
