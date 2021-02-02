const caver=require('./caver');

module.exports={
    getPrivateKey:function (keystore,password) {
        return caver.klay.accounts.decrypt(keystore, password).privateKey;
    },
    getWalletInstance:function (privateKey) {
        return caver.klay.accounts.privateKeyToAccount(privateKey);
    },
    addWallet:function (walletInstance) {
        caver.klay.accounts.wallet.add(walletInstance);
    },
    login:function (keystore,password) {
        const privateKey=this.getPrivateKey(keystore,password);
        const walletInstance=this.getWalletInstance(privateKey);
        caver.klay.accounts.wallet.add(walletInstance);
        return walletInstance;
    }
}