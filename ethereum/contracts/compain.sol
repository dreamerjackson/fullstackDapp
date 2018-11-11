pragma solidity ^0.4.24;



contract CampaignFactory{

  address[] public deployedCampain;
  function createCampain(uint mininum) public{
      address newCampain = new Campaign(mininum,msg.sender);
      deployedCampain.push(newCampain);
  }

  function getDeployedCampaign() public view returns(address[]){
      return deployedCampain;
  }


}



contract Campaign{

  struct Request{
    string description;//描述
    uint value; //申请总金额
    address recipients;//受益人的地址
    bool compelte;//项目是否完成
    uint approvalCount;//同意请求的投资人的总数
    mapping(address=>bool) approvers;//投资人的意见，true or false
  }
  Request[] public requests;//存储请求
  address public manager;//管理者地址
  uint public minimunContribute;//最小的贡献量
  mapping(address=>bool) public approvers;//存储投资人
  uint public approvesCount;//投资人的数量


  modifier restricted{
      require(msg.sender == manager);
      _;
  }

    constructor(uint minimum,address _address) public{
      manager = _address;
      minimunContribute =minimum;
    }

    function contribute() public payable{ //投资人投资
        require(msg.value > minimunContribute);
        approvers[msg.sender] = true;
        approvesCount++;
    }

    function createRequest(string _description,uint _value,address _addr) public restricted{//管理者创建一个请求
      Request memory newquest = Request({
          description:_description,
          value:_value,
          recipients:_addr,
          compelte:false,
          approvalCount:0
        });
        requests.push(newquest);
    }

    function approvalRequest(uint index)  public{ //投资人是否支持请求
      Request storage request = requests[index];
      require(approvers[msg.sender]);
      require(!request.approvers[msg.sender]);
      request.approvers[msg.sender] = true;
      request.approvalCount++;
    }


function finalizeRequest(uint index) public restricted payable{ //请求是否成功
    Request storage request = requests[index];
    require(request.approvalCount > approvesCount / 2 );

    request.recipients.transfer(request.value);
    request.compelte = true;
}



  function getSummary() public view returns(uint,uint,uint,uint,address){
    return (minimunContribute,address(this).balance,requests.length,approvesCount,manager);
  }

function getRequestCount() public view returns(uint){
  return requests.length;
}
}
