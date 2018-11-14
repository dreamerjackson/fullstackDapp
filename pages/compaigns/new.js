import React,{Component} from 'react';
import Layout from '../../components/Layout';
import { Button, Form,Input } from 'semantic-ui-react'
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import { Message } from 'semantic-ui-react';
import {Router} from '../../routes';
class CompaignNew extends Component{

  state = {
      minimum:'',
      errorMesasge:'',
      loading:''
  };


  onSubmit = async()=>{
    this.setState({errorMesasge:''});
  this.setState({loading:true});
      try{

        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        await factory.methods.createCampain(this.state.minimum).send({from:accounts[0]});


        Router.pushRoute('/');
      }catch(err){
          this.setState({errorMesasge:err.message});
      }


        this.setState({loading:false});
  }



  render(){

    // console.log(this.state.minimum);
    return (
      <Layout>

        <h3>创建你的众筹项目</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMesasge}>
            <Form.Field>
                  <label>请输入最小的贡献量</label>
                  <Input  label="wei" labelPosition="right"
                  value ={this.state.minimum}
                  onChange={event=>this.setState({minimum:event.target.value})}
                  />
            </Form.Field>
            <Message  error header="错误！" content={this.state.errorMesasge} />
            <Button  loading={this.state.loading} primary> 创建众筹</Button>
        </Form>
      </Layout>
    );

  }
}


export default CompaignNew;
