import React , { Component} from "react";
import { connect } from "react-redux";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from "../../store/actions/index";


class Login extends Component{

    state={
        username:'',
        password:''
    };

    usernameChange=(e)=>{
        this.setState({...this.state,username:e.target.value})
    };
    passwordChange=(e)=>{
        this.setState({...this.state,password:e.target.value})
    };
    submitHandler=()=>{
        this.props.auth(this.state.username,this.state.password);
    };

    render(){

        return(
            <form>
                <span style={{color:'red'}}>{this.props.error}</span><br/>
                <TextField hintText="USERNAME" value={this.state.username} onChange={this.usernameChange}/> <br/>
                <TextField hintText="PASSWORD" value={this.state.password} type="password" onChange={this.passwordChange}/><br/>
                <RaisedButton label="SUBMIT" primary={true} onClick={this.submitHandler}/>

            </form>
        );
    }
};

const mapStateToProps= (state)=>{
    return {
        error:state.auth.error,
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        auth: (username,password)=>dispatch(actions.auth(username,password)),

    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);