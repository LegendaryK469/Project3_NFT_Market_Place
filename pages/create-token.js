async function createToken(url) {
    const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
    });

    const bind = await web3Modal.connect()
    const source = new ethers.providers.Web3Provider(bind)
    const signer = source.getSigner()

    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event =tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()
    const price = web3.utils.toWei(formInput.price, 'ether')

    

}