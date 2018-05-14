import React , { Component} from "react";
import { connect } from "react-redux";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from "../../store/actions/index";


class Login extends Component{

    state={
        username:'',
        task:'login',
        password:'',
        new_password1:'',
        new_password2:''
    };

    usernameChange=(e)=>{
        this.setState({...this.state,username:e.target.value})
    };
    passwordChange=(e)=>{
        this.setState({...this.state,password:e.target.value})
    };
    passwordChange1=(e)=>{
        this.setState({...this.state,new_password1:e.target.value})
    };
    passwordChange2=(e)=>{
        this.setState({...this.state,new_password2:e.target.value})
    };
    submitHandler=()=>{
        if(this.state.task==="login"){
            this.props.auth(this.state.username,this.state.password);
        }else{
            if(this.state.new_password1 !== this.state.new_password2){
                alert("New password dont match");
                return;
            }
            this.props.change_password(this.state.username,this.state.password,this.state.new_password1);
        }

    };
    taskChange=()=>{
        this.setState({...this.state,task: this.state.task==="login"? "change_password" : "login"})
    };

    render(){

        const change_password_fields=(<div><TextField hintText="NEW PASSWORD" value={this.state.new_password1} type="password" onChange={this.passwordChange1}/>
            <br/>
            <TextField hintText="Confirm NEW PASSWORD" value={this.state.new_password2} type="password" onChange={this.passwordChange2}/>
        <br/></div>);
        return(
            <form>
                <span style={{color:'red'}}>{this.props.error}</span><br/>
                <TextField hintText="USERNAME" value={this.state.username} onChange={this.usernameChange}/> <br/>
                <TextField hintText="PASSWORD" value={this.state.password} type="password" onChange={this.passwordChange}/><br/>
                {this.state.task!=="login"? change_password_fields : null
                }

                <RaisedButton label={this.state.task!=="login" ? "change password" : "login"} primary={true} onClick={this.submitHandler}/><br/>

                <a href='#' style={{color:"blue"}} onClick={this.taskChange}>{this.state.task==="login" ? "change password" : "login"}</a>

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
        change_password: (username,password,new_password)=>dispatch(actions.change_password(username,password,new_password)),

    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);