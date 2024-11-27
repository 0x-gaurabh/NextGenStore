// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Ecommerce is ERC20, Ownable, ReentrancyGuard {
    uint256 public fivePercentThreshold;
    uint256 public tenPercentThreshold;
    uint256 public twentyPercentThreshold;
    uint256 public fivePercentDiscount;
    uint256 public tenPercentDiscount;
    uint256 public twentyPercentDiscount;
    uint256 public data;

    event TokenPurchased(
        address buyer,
        uint256 pricePaid,
        uint256 tokensMinted
    );

    constructor(
        uint256 _fivePercentThreshold,
        uint256 _tenPercentThreshold,
        uint256 _twentyPercentThreshold,
        uint256 _fivePercentDiscount,
        uint256 _tenPercentDiscount,
        uint256 _twentyPercentDiscount
    ) ERC20("BuyableToken", "BTK") Ownable(msg.sender) {
        fivePercentThreshold = _fivePercentThreshold;
        tenPercentThreshold = _tenPercentThreshold;
        twentyPercentThreshold = _twentyPercentThreshold;
        fivePercentDiscount = _fivePercentDiscount;
        tenPercentDiscount = _tenPercentDiscount;
        twentyPercentDiscount = _twentyPercentDiscount;
    }

  
    // 
    function buy() external payable nonReentrant {
        require(msg.value > 0, "Value cannot be 0");

        uint256 ethValue = msg.value;
        uint256 tokensToMint = 10 * 10**decimals();
        uint256 discount = 0;

        if (balanceOf(msg.sender) >= twentyPercentThreshold) {
            discount = (ethValue * twentyPercentDiscount) / 100;
            ethValue -= discount;
            payable(msg.sender).transfer(discount);
            emit TokenPurchased(msg.sender, ethValue, tokensToMint);
            data = 20;
            _burn(msg.sender, balanceOf(msg.sender));
        } else if (balanceOf(msg.sender) >= tenPercentThreshold) {
            discount = (ethValue * tenPercentDiscount) / 100;
            ethValue -= discount;
            payable(msg.sender).transfer(discount);
            emit TokenPurchased(msg.sender, ethValue, tokensToMint);
            data = 10;
        } else {
            discount = (ethValue * fivePercentDiscount) / 100;
            ethValue -= discount;
            payable(msg.sender).transfer(discount);
            data = 5;
            emit TokenPurchased(msg.sender, ethValue, tokensToMint);
        }

        _mint(msg.sender, tokensToMint);
    }

    function withdraw() external onlyOwner {
        require(address(this).balance > 0, "Contract balance is empty");
        payable(owner()).transfer(address(this).balance);
    }

    function setFivePercentThreshold(uint256 newThreshold) external onlyOwner {
        fivePercentThreshold = newThreshold;
    }

    function getBalance(address _account) external view returns (uint){
        return balanceOf(_account);
    }

    function setTenPercentThreshold(uint256 newThreshold) external onlyOwner {
        tenPercentThreshold = newThreshold;
    }

    function setTwentyPercentThreshold(uint256 newThreshold)
        external
        onlyOwner
    {
        twentyPercentThreshold = newThreshold;
    }
}
