const caver=require('./caver');

module.exports={
    getPrivateKey:function (keystore,password) {
        return caver.klay.accounts.decrypt(keystore, password).privateKey;
    },
    getWalletInstance:function (privateKey) {
        return caver.klay.accounts.privateKeyToAccount(privateKey);
    },
    addWallet:function (walletInstance) {
        if(!caver.klay.accounts.wallet.length){
            caver.klay.accounts.wallet.add(walletInstance);
        }
        console.log("length:"+caver.klay.accounts.wallet.length)
    },
    login:function (keystore,password) {
        const privateKey=this.getPrivateKey(keystore,password);
        const walletInstance=this.getWalletInstance(privateKey);
        this.addWallet(walletInstance)
        return walletInstance;
    }
}