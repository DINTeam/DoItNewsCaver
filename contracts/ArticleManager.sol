// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract articleManager{
    struct Article{
        uint256 serialNumber;
        address owner;
        string html;
    }
    
    Article[] private articles;
    
    event articleUploaded(uint256 serialNumber);

    modifier isRightSerial(uint _serialNumber){
        require(0<=_serialNumber&&_serialNumber<articles.length);
        _;
    }

    function uploadArticle(string memory _html)public{
        articles.push(Article(articles.length,msg.sender,_html));
        
        emit articleUploaded(articles.length);
    }
    
    function getArticle(uint256 _serialNumber)public view isRightSerial(_serialNumber)
    returns(address owner,string memory html)
    {
        require(articles.length>_serialNumber);
        Article memory _article=articles[_serialNumber];
        return (_article.owner,_article.html);
    }
    function getArticlesCount()public view returns(uint){
        return articles.length;
    }
    function getArticleOwner(uint256 _serialNumber) public view returns(address){
        return articles[_serialNumber].owner;
    }
}