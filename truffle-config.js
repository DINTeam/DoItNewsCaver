const PrivateKeyConnector=require('connect-privkey-to-provider');
const NETWORK_ID='1001'; //바오밥(테스트넷) 아이디임
const GASLIMIT='20000000'; //배포시 사용될 가스의 한도
const URL='https://api.baobab.klaytn.net:8651'; //클레이튼에 현재 풀노드가 돌아가고 있는 네트워크 주소임
//메인넷 주소 https://api.cypress.klaytn.net:8651
//테스트넷 주소 https://api.baobab.klaytn.net:8651
const PRIVATE_KEY ='0x9a75f9c597a6ade15950afbd10255139dd490b836ad9c747c61fe38293f053c8';//비밀키를 담는 상수

module.exports={
    networks:{
        klaytn:{//네트워크는 클레이튼을 사용한다는 의미
            provider:new PrivateKeyConnector(PRIVATE_KEY,URL),
            //프라이빗키로 해당 URL의 클레이튼 네트워크에 연결하는 것
            network_id:NETWORK_ID,
            gas:GASLIMIT,
            gasPrice:null,
            //이 가스가격은 바오밥네트워크에서 가스가격을 잡아주기때문에 null로 함
        }
    },
}