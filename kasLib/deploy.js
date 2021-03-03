const fs = require('fs');
const credential = fs.readFileSync('./kas-credential-KASKWU0UE6H7LKAKU7WCN4HU.json', "utf8");
const credentialObj = JSON.parse(credential);
const accessKeyId = `${credentialObj.accessKeyId}`;
const secretAccessKey = `${credentialObj.secretAccessKey}`;
const chainId = 8217;

const CaverExtKAS = require('caver-js-ext-kas')
const caver = new CaverExtKAS()

caver.initWalletAPI(chainId, accessKeyId, secretAccessKey)
caver.initKASAPI(chainId, accessKeyId, secretAccessKey)
//'0x706952aDBFE58e3540a9a465C1a71701bB6529E5'

const byteCode = fs.readFileSync('./contracts_ArticleManager_sol_articleManager.bin', "utf8");
//solcjs ArticleManager.sol --bin 명령어 치면 컴파일되서 나온 파일임

const fileStr = fs.readFileSync('./build/contracts/articleManager.json', "utf-8");
const abi = JSON.parse(fileStr).abi;

fs.writeFile('deployedABI', JSON.stringify(abi), (err) => {
    if (err) throw err;
    console.log("파일에 ABI 입력 성공");
});
const contract = new caver.contract(abi)

async function deploy() {
    // SmartContractDeploy 트랜잭션을 발생시키는 from 계정은 충분한 KLAY를 소유하고 있어야 합니다.
    const deployed = await contract.deploy({ data: byteCode }).send({ from: '0x706952aDBFE58e3540a9a465C1a71701bB6529E5', gas: 10000000 })
    console.log(`Deployed contract address: ${deployed.options.address}`)
    fs.writeFile('deployedAddress', JSON.stringify(deployed.options.address), (err) => {
        if (err) throw err;
        console.log("파일에 Address 입력 성공");
    });
}
deploy();

