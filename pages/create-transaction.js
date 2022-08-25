// This function will mint an NFT and subsequently place it in
// the market place for sale.

async function createTransaction(url) {
    const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
    });

    const bind = await web3Modal.connect()
    const source = new ethers.providers.Web3Provider(bind)
    const signer = source.getSigner()

    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)

    // the 'createToken' function allows for minting of NFT
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event =tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()
    const price = web3.utils.toWei(formInput.price, 'ether')

    // 'createMarketItem' will place newly minted NFT for sale
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    transaction = await contract.createMarketItem(nftaddress, tokenId, price)
    await transaction.wait()
    router.push('/')

}