const express = require("express");
const Web3 = require("web3");
const mongoose = require('mongoose')
const path = require('path');
const web3  =  new Web3("https://ropsten.infura.io/v3/1679001d1bb04d6fb6a4b0ed4590b846");
const web3_bnb = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
const receiptApi = require('../model/db.js');
const bodyParser =require('body-parser');

// app.use(bodyParser.urlencoded({ extended: false }))

// Ropsten fetch Balance
exports.balance = function(req,res){
        web3.eth.getBalance(process.env.from_address, async (err, result) => {
            if (err) {
               console.log(err);
                return;
            }
           let balance = web3.utils.fromWei(result, "ether");
             res.json(balance + " ETH");
        });
        }


//Ropsten for Transaction
exports.transaction = function(req,res){
  const transaction_from = req.body.transaction_from;
  const transaction_to = req.body.transaction_to;
  const value = req.body.value;
  // const transaction_hash = req.body.transaction_hash;

    async function eth_transaction(){
        const value = web3.utils.toWei(req.body.value, 'ether')   
      const SignedTransaction = await web3.eth.accounts.signTransaction({
           to: transaction_to, //process.env.to_address,
           value: value,
           gas: 2000000,
           nonce: web3.eth.getTransactionCount(transaction_from)
      },   process.env.Private_Key);
    
      web3.eth.sendSignedTransaction(SignedTransaction.rawTransaction).then((receipt) => {
            res.json(receipt)
            const deatils = new receiptApi ({
              _id:new mongoose.Types.ObjectId(),
              transaction_from:transaction_from,
              transaction_to:transaction_to,
              // transaction_hash: transaction_hash,
              value:value
          })
          deatils.save()
      })
    
     
    }
    eth_transaction();
    }

    //Binance balance
  exports.bnbBalance= function(req,res){
    web3_bnb.eth.getBalance(process.env.from_address, async (err, result) => {
        if (err) {
           console.log(err);
            return;
        }
        let balance = web3.utils.fromWei(result, "ether");
         res.json(balance + " BNB");
    });    
}

// Binance Transaction
exports.bnbTransaction = function(req,res){
  async function eth_transaction(){  
    var SignedTransaction = await web3_bnb.eth.accounts.signTransaction({
         to:  process.env.to_address,
         value: '0.005',
         gas: 5000000,
         gasPrice: 18e9,
         nonce: web3_bnb.eth.getTransactionCount( process.env.from_address)
    },   process.env.Private_Key);
  
    web3_bnb.eth.sendSignedTransaction(SignedTransaction.rawTransaction).then((receipt) => {
          res.json(receipt);
    })
  }
  eth_transaction();
  }

