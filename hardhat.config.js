require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
// 0x9699A5A1d01E061cc77a60334805E89633f2E2dB contract address

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    holesky: {
      url:process.env.URL,
      accounts:[process.env.PRIVATE_KEY]
    },
  },
};