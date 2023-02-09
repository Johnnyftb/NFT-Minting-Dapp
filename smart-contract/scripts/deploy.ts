// imports
import { ethers, run, network } from 'hardhat';

// async main
async function main() {
  const contractFactory = await ethers.getContractFactory("NFT");
  const contract = await contractFactory.deploy();
  console.log(`Contract deployed to ${contract.address}`);

  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...")
    await contract.deployTransaction.wait(6)
    await verify(contract.address, [])
  }
}

// async function verify(contractAddress, args) {
const verify = async (contractAddress: string, args: any[]) => {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }
}

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })