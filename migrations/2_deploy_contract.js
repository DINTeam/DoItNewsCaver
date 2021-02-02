const ArticleManager = artifacts.require("ArticleManager");
const fs=require('fs');
module.exports = function(deployer) {
  deployer.deploy(ArticleManager).then(()=>{
    if(ArticleManager._json){
      fs.writeFile('deployedABI',JSON.stringify(ArticleManager._json.abi),(err)=>{
        if(err) throw err;
        console.log("파일에 ABI 입력 성공");
      });

      fs.writeFile('deployedAddress',JSON.stringify(ArticleManager.address),(err)=>{
        if(err) throw err;
        console.log("파일에 Address 입력 성공");
      });
    }
})
};
