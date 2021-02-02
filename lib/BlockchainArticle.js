const ArticleContract=require('./ArticleContract');
const caver = require('./caver');

const gaslimit=100800;

module.exports={
    getArticle:async function (index) {
        const length=ArticleContract.methods.getArticle(index).call()
        return length;
    },
    getArticlesCount:async function () {
        const article=ArticleContract.methods.getArticlesCount().call();
        return article;
    },getArticles:async function () {
        const length = await this.getArticlesCount();
        var articles = [];
        for (var i = 0; i < length; i++) {
            const article = await this.getArticle(i);
            articles[i] = {
                owner: article.owner,
                html: article.html
            };
        }
        return articles;
    },uploadArticle:function (html,address) {
        ArticleContract.methods.uploadArticle(html).send({
            from: address, gas: gaslimit,
        })
        .once('transactionHash',(txhash)=>{
            console.log(`txHash: ${txhash}`);
            caver.klay.getTransactionReceipt(txhash).then((result)=>{
                console.log(result);
            })
        })
        .on('receipt',(receipt)=>{
            console.log(`영수증_${receipt}`)
        })
        .once('error',(error)=>{
            console.error(`클레이 전송 오류_${error.message}`);
        })
    },transferToken:function (articleIndex,klay,address) {
        const peb=caver.utils.toPeb(klay,"KLAY");
        ArticleContract.methods.transferToken(articleIndex,peb).send({
            from: address, 
            gas: gaslimit,
            value:peb
        })
        .once('transactionHash',(txhash)=>{
            console.log(`txHash: ${txhash}`);
        })
        .once('error',(error)=>{
            console.error(`클레이 전송 오류_${error.message}`);
        })
    }
}
