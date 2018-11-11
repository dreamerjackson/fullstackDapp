import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xE454E4d06F155E2D41F07A3a130561102D0495dd'
);

export default instance;
