// javascript function that deploys the smart contracts
//using hardhat we can launch a local node and test the dapp
//'npx hardhat node' in terminal 
//to create and launch local node in terminal
//open anothert terminal
//'npx hardhat run scripts/deploy.js' --network localhost
//to get addresses of smart contract deployment
//pass addresses from to /Scripts/config.js 


async function main() {
    const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
    const nftMarket = await NFTMarket.deploy();
    await nftMarket.deployed();
    console.log("nftMarket deployed to:", nftMarket.address);
  
    const NFT = await hre.ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(nftMarket.address);
    await nft.deployed();
    console.log("nft deployed to:", nft.address);
  }