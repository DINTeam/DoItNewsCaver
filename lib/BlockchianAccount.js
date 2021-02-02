const caver=require('./caver');


module.exports={
    getBalance:async function (address) {
        var peb=await caver.klay.getBalance(address);
        const klay=caver.utils.fromPeb(peb.toString(),"KLAY")
        return klay;
    },
}