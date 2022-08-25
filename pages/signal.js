// for functionality of User Interface, this function will allow to access NFTs 
// from the market place and display in User Interface.

// call 'fetchMarketItems' in the smart contracts and show unsold NFTs by using
// the following 'loadNFTs' function.
async function loadNFTs() {
    const source = new ethers.providers.JsonRpcProvider()
    const NFTFactoryContract = new ethers.Contract(nftaddress, NFT.abi, source)
    const NFTMarketContract = new ethers.Contract(nftmarketaddress, Market.abi, source)
    const data = await NFTMarketContract.fetchMarketItems()

    const items = await Promise.all(data.map(async i => {
        const tokenURI = await NFTFactoryContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenURI)
        let price = web3.utils.fromWei(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.token.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
        }
        return item
    }))
    setNfts(items)
    setLoaded('loaded')
}