const Caver = require('caver-js');
const config = {
    rpcURL: 'https://api.baobab.klaytn.net:8651'
}
module.exports= new Caver(config.rpcURL);//caver 인스턴스화