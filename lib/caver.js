// const Caver = require('caver-js');
// const config = {
//     rpcURL: 'https://api.baobab.klaytn.net:8651'
// }
// module.exports = new Caver(config.rpcURL);

//경계선
const fs=require('fs');
const Caver = require('caver-js');
const credential=fs.readFileSync('./kas-credential-KASKWU0UE6H7LKAKU7WCN4HU.json',"utf8");
const credentialObj=JSON.parse(credential);
const accessKeyId = `${credentialObj.accessKeyId}`;
const secretAccessKey = `${credentialObj.secretAccessKey}`;

const option = {
    headers: [
        { name: 'Authorization', value: 'Basic ' + Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64') },
        { name: 'x-chain-id', value:  8217 },
    ]
}

module.exports = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));