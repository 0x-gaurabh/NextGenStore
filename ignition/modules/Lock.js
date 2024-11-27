// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const fivePercentThreshold = ethers.parseUnits("30", 18); 
const tenPercentThreshold = ethers.parseUnits("60", 18); 
const twentyPercentThreshold = ethers.parseUnits("100", 18); 
const fivePercentDiscount = 5; 
const tenPercentDiscount = 10; 
const twentyPercentDiscount = 20; 

module.exports = buildModule("LockModule", (m) => {
  

  const ecommerce = m.contract("Ecommerce", [fivePercentThreshold,tenPercentThreshold,twentyPercentThreshold,
    fivePercentDiscount,tenPercentDiscount,twentyPercentDiscount]);

  return { ecommerce };
});

