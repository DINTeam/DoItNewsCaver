const HDWalletProvider=require('truffle-hdwallet-provider-klaytn')
const GASLIMIT='20000000'; //배포시 사용될 가스의 한도
const PRIVATE_KEY ='0xb4ef4af02b9fd81d271186c451f185715a0a1551287fbdf6e40e8ff228240a9b';//비밀키를 담는 상수

const fs = require('fs');
const credential = fs.readFileSync('./kas-credential-KASKWU0UE6H7LKAKU7WCN4HU.json', "utf8");
const credentialObj = JSON.parse(credential);
const accessKeyId = `${credentialObj.accessKeyId}`;
const secretAccessKey = `${credentialObj.secretAccessKey}`;
const chainId =  8217;

const CaverExtKAS = require('caver-js-ext-kas')
const caver = new CaverExtKAS()

caver.initWalletAPI(chainId, accessKeyId, secretAccessKey)
caver.initNodeAPI(chainId, accessKeyId, secretAccessKey)

module.exports={
    networks:{
        mainnet:{//네트워크는 클레이튼을 사용한다는 의미
            provider: () => new HDWalletProvider(PRIVATE_KEY, "https://api.cypress.klaytn.net:8651"),
            //프라이빗키로 해당 URL의 클레이튼 네트워크에 연결하는 것
            network_id:'8217',
            gas:GASLIMIT,
            gasPrice:null,
            //이 가스가격은 바오밥네트워크에서 가스가격을 잡아주기때문에 null로 함
        },
        testnet:{
            provider: () => new HDWalletProvider(PRIVATE_KEY, "https://api.baobab.klaytn.net:8651"),
            network_id:'1001',
            gas:GASLIMIT,
            gasPrice:null,
        },kas:{
            provider: () => new HDWalletProvider(PRIVATE_KEY, "https://node-api.klaytnapi.com/v1/klaytn"),
            //프라이빗키로 해당 URL의 클레이튼 네트워크에 연결하는 것
            network_id:'8217',
            gas:GASLIMIT,
            gasPrice:null,
        }
        
    },
}
