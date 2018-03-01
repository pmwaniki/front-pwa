import React, {Component} from "react";
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionFace from "material-ui/svg-icons/action/face"


import {Tab,Tabs} from "material-ui/Tabs"
import Gallery from "../Gallery/Gallery";
import Records from "../Records/Records";
import Capture from "../Records/NewRecord/Capture";
import {connect } from "react-redux";
import Login from "../Authentication/Login";
import * as actions from "../../store/actions/index";


class Layout extends Component{

    state={
        selected:0
    };

    tabChangeHandler=(tab)=>{
        //console.log("Moving to :",tab);
        this.setState({...this.state,selected:tab});
    };
    logoutHandler=(e)=>{
        this.props.logout();
    };
    handleHospHandler=(event,index,value)=>{
        this.props.changeHospital(value);
    }

    render(){
        let body=(<Login/>);
        if(this.props.loggedIn){
            body=(
                <Tabs value={this.state.selected} onChange={this.tabChangeHandler}>
                    <Tab label="Records" value={0}><Records/></Tab>
                    <Tab label="Gallery" value={1}><Gallery images={[]}/></Tab>

                </Tabs>
            );
        }
        return(
            <div>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <ToolbarTitle text={"CIN"}/>
                    </ToolbarGroup>
                    <ToolbarGroup lastChild={true}>
                        <ActionFace/> {this.props.username}
                        <IconMenu
                            iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                            >
                            <DropDownMenu value={+this.props.hosp} onChange={this.handleHospHandler} openImmediately={false}>
                                {this.props.hospitals.map((hosp,index)=>{
                                    return <MenuItem key={hosp.id} value={hosp.id} primaryText={hosp.name}/>
                                })}
                            </DropDownMenu>
                            <MenuItem onClick={this.logoutHandler} primaryText={"logout"}/>


                        </IconMenu>
                    </ToolbarGroup>

                </Toolbar>
                {body}

            </div>

        );
    }
};

const mapStateToProps=(state)=>{
    return {
        loggedIn:state.auth.loggedIn,
        username:state.auth.username,
        hospitals:state.images.hospitals,
        hosp:state.images.hosp,
    }
};
const mapDispatchToProp=(dispatch)=>{
    return {
        logout:()=>dispatch(actions.logout()),
        changeHospital:(hosp)=>dispatch(actions.changeHospital(hosp)),
    }
};

export default connect(mapStateToProps,mapDispatchToProp) (Layout);
