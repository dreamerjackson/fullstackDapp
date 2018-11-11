import Web3 from 'web3';



var web3;
if(typeof window !='undefined' && window.web3 !='undefined'){
   web3 = new Web3(window.web3.currentProvider);
}else{
const provider =  new Web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/de22b468cb7846788b4d1ae36bcc26c2'
  );

  web3 = new Web3(provider);
}


export default web3;
