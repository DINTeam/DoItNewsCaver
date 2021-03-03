const ArticleContract = require('./ArticleContract');
const caver = require('./caver');
const gaslimit = 1008000;

module.exports = {
    getArticle: async function (index) {
        const length = ArticleContract.methods.getArticle(index).call()
        return length;
    },
    getArticlesCount: async function () {
        const article = ArticleContract.methods.getArticlesCount().call();
        return article;
    }, getArticles: async function () {
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
    }, uploadArticle:async function (html, address) {
        // try{
        //     ArticleContract.methods.uploadArticle(html).send({
        //         from: address, gas: gaslimit,
        //     })
        //         .once('transactionHash', (txhash) => {
        //             console.log(`txHash: ${txhash}`);
        //         })
        //         .once('receipt', (receipt) => {
        //             console.log(`영수증_${receipt.message}`)
        //         })
        //         .once('error', (error) => {
        //             console.error(`클레이 전송 오류_${error.message}`);
        //         })
        // }catch(error){
        //     console.log("업로드 에러")
        //     console.log(error);
        // }
        console.log("1")
        ArticleContract.methods.uploadArticle(html).send({
            from: address, gas: gaslimit,
        })
            .once('transactionHash', (txhash) => {
                console.log(`txHash: ${txhash}`);
            })
            .once('receipt', (receipt) => {
                console.log(`영수증_${receipt.message}`)
            })
            .once('error', (error) => {
                console.error(`클레이 전송 오류_${error.message}`);
            })
            console.log("2")
    },
    getArticleOwner:async function (articleIndex) {
        const ownerAddress=ArticleContract.methods.getArticleOwner(articleIndex).call();
        return ownerAddress;
    }
}
