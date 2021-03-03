const fs = require('fs');
const credential = fs.readFileSync('./kas-credential-KASKWU0UE6H7LKAKU7WCN4HU.json', "utf8");
const credentialObj = JSON.parse(credential);
const accessKeyId = `${credentialObj.accessKeyId}`;
const secretAccessKey = `${credentialObj.secretAccessKey}`;
const chainId =  8217;

const CaverExtKAS = require('caver-js-ext-kas')
const caver = new CaverExtKAS()

caver.initWalletAPI(chainId, accessKeyId, secretAccessKey)

// caver.kas.wallet.createAccount().then((result)=>{
//     console.log(result);
// })
//계정 일단 하나만 쓰자: 주소_ 0x706952aDBFE58e3540a9a465C1a71701bB6529E5
