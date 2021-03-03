const caver=require('./caver');


module.exports={
    getBalance:async function (address) {
        var peb=await caver.klay.getBalance(address);
        const klay=caver.utils.fromPeb(peb.toString(),"KLAY")
        return klay;
    },
    transfer:async function (fromAddress,toAddress,klay) {
        caver.klay.sendTransaction({
            type: 'VALUE_TRANSFER',
            from: fromAddress,
            to: toAddress,
            gas: '300000',
            value: caver.utils.toPeb(klay, 'KLAY'),
        })
        .on('transactionHash', function(transactionHash){
            console.log(`transactionHash:${transactionHash}`);
        })
        .on('receipt', function(receipt){
            console.log(`receipt:${receipt}`);
        })
        .on('error', console.error);
    }
}