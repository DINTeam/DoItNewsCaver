const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'keystore/' })
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const fs = require('fs');
const app = express();
const BlockchainLogin = require('./lib/BlockchainLogin');
const BlockchainArticle = require('./lib/BlockchainArticle');
const BlockchainAccount=require('./lib/BlockchianAccount');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: "aa",
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));
app.use(express.static(__dirname + '/public'));


app.get('/', (request, response) => {
    const html = fs.readFileSync('static/login.html', "utf8");
    response.send(html);
})
app.post('/loginpage', upload.single('keystore'), (request, response) => {
    fs.readFile(`keystore/${request.file.filename}`, 'utf8', (err, data) => {
        const walletInstance = BlockchainLogin.login(data, request.body.password);
        request.session.wallet = JSON.parse(JSON.stringify(walletInstance));
        response.writeHead(302, { Location: `/main` });
        response.send();
    })
})
app.get('/main', (request, response) => {
    const address=request.session.wallet.address;
    BlockchainAccount.getBalance(address).then((klay)=>{
        const tpl=`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>in 블록체인, 기사 관리 테스트</h1>
        <hr>
        <section id="uploadArticle">
            <p>기사 올리기</p>
            <form action="http://localhost:8080/uploadpage" method="POST">
                <p>계정 주소:${address}</p>
                <p>잔고:${klay} 클레이</p>
                <textArea id="html" name="html"></textArea>
                <input type="submit" value="기사 블록체인에 업로드">
            </form>
            <a href="http://localhost:8080/view">올린 기사 보기</a>
        </section>
    </body>

    </html>
    `;
    response.send(tpl);
    })
    
})
app.post('/uploadpage', (request, response) => {
    BlockchainLogin.addWallet(request.session.wallet);
    BlockchainArticle.uploadArticle(request.body.html, request.session.wallet.address);
    response.writeHead(302, { Location: `/main` });
    response.send();
})
app.get('/patreon/:articleIndex',(request,response)=>{
    const index=request.params.articleIndex;
    var template=`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>in 블록체인, 기사 관리 테스트</h1>
        <hr>
        <section>
            <form method="POST" action="http://localhost:8080/patreonpage/${index}">
                클레이량: <input type="number" name="klay" step="0.2"><br>
                <input type="submit" value="후원 토큰 전송">
            </form>
        </section>
    </body>
    </html>`;
    response.send(template);
})
app.post('/patreonpage/:articleIndex',(request,response)=>{
    const index=request.params.articleIndex;
    const klayAmount=request.body.klay;
    const senderAddress=request.session.wallet.address;
    BlockchainLogin.addWallet(request.session.wallet);
    BlockchainArticle.transferToken(index,klayAmount,senderAddress)
        response.writeHead(302, { Location: `/main` });
        response.send();
})
app.get('/view', (request, response) => {
    BlockchainArticle.getArticles().then((articles) => {
        var html = '';
        for (var i = 0; i < articles.length; i++) {
            html += `<p>주소:${articles[i].owner}</p>`;
            html += `<p>내용:${articles[i].html}</p>`;
            html += `<p><a href="http://localhost:8080/patreon/${i}">후원하기</a></p>`;
            html += `<hr>`;
        }
        var template = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>in 블록체인, 기사 관리 테스트</h1>
            <hr>
            <section>
                ${html}
            </section>
        </body>
        </html>`;
        response.send(template);
    }
    )
})
app.listen(8080, function () {
    console.log("server is running");
})