const fs=require('fs');
const caver = require('./caver');
const abi = JSON.parse(fs.existsSync('deployedABI') && fs.readFileSync('deployedABI', "utf8"));
const address = fs.readFileSync('deployedAddress', "utf8").replace(/\n|\r/g, "").replace(/\"/gi, "");
const ArticleContract = new caver.klay.Contract(abi, address);

module.exports=ArticleContract;