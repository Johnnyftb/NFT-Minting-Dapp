import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-waffle";
import "dotenv/config";
import "@typechain/hardhat";

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY!],
      chainId: 5,
      allowUnlimitedContractSize: true,
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY!
  }
};

export default config;
