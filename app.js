const dotenv = require('dotenv');
dotenv.config();
const Web3 = require("web3");
const web3  =  new Web3("https://ropsten.infura.io/v3/1679001d1bb04d6fb6a4b0ed4590b846");

// fetch a balance
web3.eth.getBalance('0x2675AA4Ce16B8F8c1d69023f559fB82439f14AB2', async (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    let balance = web3.utils.fromWei(result, "ether");
    console.log(balance + " ETH");
});

// For Transaction
async function eth_transaction(){
    var value = web3.utils.toWei('0.03', 'ether')   
  var SignedTransaction = await web3.eth.accounts.signTransaction({
       to:  process.env.to_address,
       value: value,
       gas: 2000000,
       nonce: web3.eth.getTransactionCount( process.env.from_address)
  },   process.env.Private_Key);

  web3.eth.sendSignedTransaction(SignedTransaction.rawTransaction).then((receipt) => {
        console.log(receipt);
  });
}
eth_transaction();


