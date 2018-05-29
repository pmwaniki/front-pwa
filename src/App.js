import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Layout from "./containers/Layout/Layout";
import {connect} from 'react-redux'


import './App.css';
import * as actions from "./store/actions";

class App extends Component {

    componentWillMount=()=>{
        this.props.loadImages();
        this.props.loadSynced();
        this.props.checkAuthState();
        this.props.loadHospitals();
        this.props.getHospitals();
        this.props.loadHospital();
        this.props.getValidations();
        this.props.loadValidations();
        this.props.sync("delete");
        this.props.sync("sync");
    };
    componentWillUnmount=()=>{
        //this.props.sync("delete");
        //console.log("Unmounting app");
    };
  render() {
    return (
        <MuiThemeProvider>
            <Layout/>
        </MuiThemeProvider>
    );
  }
}

const mapStateToProps=(state)=>{
    return {
        images:state.images.images,
        hosp:state.images.hosp,
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        loadImages:()=>dispatch(actions.loadImages()),
        loadSynced:()=>dispatch(actions.loadSynced()),
        checkAuthState:()=>dispatch(actions.checkAuthState()),
        getHospitals:()=>dispatch(actions.getHospitals()),
        loadHospitals:()=>dispatch(actions.loadHospitals()),
        loadHospital:()=>dispatch(actions.loadHospital()),
        getValidations:()=>dispatch(actions.getValidations()),
        loadValidations:()=>dispatch(actions.loadValidations()),
        sync:(action)=>dispatch(actions.syncAction(action))
    }
};
export default connect(mapStateToProps,mapDispatchToProps) (App);
