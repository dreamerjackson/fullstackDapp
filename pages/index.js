import React,{Component} from 'react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Card,Button} from 'semantic-ui-react'
import {Link} from '../routes';
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
                description: <Link route={`/compaigns/${address}`}><a>查看众筹</a></Link>,
                fluid:true
              }
        });

        return <Card.Group items={items} />;
    }

  render(){
    return (
      <Layout>
    <div>
    <h3>众筹列表</h3>

    <Link route="/compaigns/new">
    
     <Button  floated="right" content='创建众筹' icon='add' labelPosition='right'  primary/>
     </Link>
         {this.renderCampaign()}
    </div>
  </Layout>
  );
  }
}
export default Compaindex;
