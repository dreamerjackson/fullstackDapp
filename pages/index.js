import React,{Component} from 'react';
import factory from '../ethereum/factory';
import { Card } from 'semantic-ui-react'
// export default ()=>{
//   return <h1>hello index</h1>;
// }


class Compaindex extends Component{



    static async getInitialProps(){
          const compaign =  await factory.methods.getDeployedCampaign().call();
            return {compaign};
    }
    // async componentDidMount(){
    //     const compaign =  await factory.methods.getDeployedCampaign().call();
    //     console.log(compaign);
    // }
  
    renderCampaign(){
        const items = this.props.compaign.map(address=>{
              return{
                header: address,
                description: <a>查看众筹</a>,
                fluid:true
              }
        });

        return <Card.Group items={items} />;
    }

  render(){
    return (
    <div>
      <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.0/dist/semantic.min.css"></link>
      {this.renderCampaign()}
    </div>

  );


  }

}
export default Compaindex;
