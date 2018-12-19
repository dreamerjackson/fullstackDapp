import React from 'react';

import Campaign from '../../ethereum/campaign';
import Layout from '../../components/Layout';
import { Card,Grid,Button} from 'semantic-ui-react';
import ContributeFrom from '../../components/contributeForm';

import web3 from '../../ethereum/web3';

import {Link} from '../../routes';
class Compaingnshow extends React.Component{
  static async getInitialProps(props){

    //  console.log(props.query.address);
      const campaign = Campaign(props.query.address);

      const summary =   await campaign.methods.getSummary().call();
    //  console.log(summary);
      return {
          address:props.query.address,
          minimunContribute:summary[0],
          balance:summary[1],
          requestcount:summary[2],
          approvalCount:summary[3],
          manager:summary[4]
      };
  }
  renderCards(){
      const {
        address,
        minimunContribute,
        balance,
        requestcount,
        approvalCount,
        manager
      }=this.props;

    const items = [
        {
          header:manager,
          meta:'管理者的地址',
          description:' 当前管理者创建了众筹列表，并且是众筹的受益人',
          style:{overflowWrap:'break-word'}
        },
        {
          header:minimunContribute,
          meta:'最小贡献量',
          description:' 如果你想对此总筹投资，你就需要至少大于当前的金额',
          style:{overflowWrap:'break-word'}
        },
        {
          header:requestcount,
          meta:'请求数量',
          description:'当前的管理者创建请求从合约中提钱，必须要大于50%的投资人同意',
          style:{overflowWrap:'break-word'}
        },
        {
          header:approvalCount,
          meta:'投资人的数量',
          description:'已经为当前众筹投资的投资人的数量',
          style:{overflowWrap:'break-word'}
        },
        {
          header:web3.utils.fromWei(balance,'ether'),
          meta:'总筹总的金额(ether)',
          description:'当前总筹中，还剩下了多少的金额。',
          style:{overflowWrap:'break-word'}
        }
    ];

    return <Card.Group items={items}/>
  }


render(){

  return (
    <Layout>
      <h1>众筹显示</h1>

        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
                    {this.renderCards()}

            </Grid.Column>

            <Grid.Column width={6}>
                    <ContributeFrom  address={this.props.address}/>
            </Grid.Column>

              </Grid.Row>

                <Grid.Row>
                  <Grid.Column>
                <Link route={`/compaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>查看请求</Button>
                </a>
                </Link>
                  </Grid.Column>
                </Grid.Row>


        </Grid>

    </Layout>
  );
}

}


export default Compaingnshow;
