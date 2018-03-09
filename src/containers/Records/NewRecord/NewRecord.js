import React , {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Capture from "./Capture";
import {connect} from "react-redux";

import Grid from "../../Gallery/Grid";
import * as actions from "../../../store/actions/index";



class NewRecord extends Component{

    state={
        recordId:'',
        ipno:'',
        images:[],
        n_images:0,
        cameraOpen:false
    };

    resetNewRecord=()=>{
        this.setState({
            recordId:'',
            ipno:'',
            images:[],
            n_images:0,
            cameraOpen:false
        });
    };

    closeHandler=()=>{
        this.props.onClose();
        this.resetNewRecord();
    };
    saveHandler=(e)=>{
        if(!this.state.recordId){
            alert("You must enter record id");
            return;
        }
        if(!this.state.ipno){
            alert("You must enter record ip number");
            return;
        }
        if(this.state.images.length===0){
            alert("You must have at least one image");
            return;
        }
        if(!this.props.hosp){
            alert("You must set hospital in settings");
            return;
        }

        this.state.images.map(image=>{
            let im=image;
            im['ipno']=this.state.ipno;
            im['hosp_id']=this.props.hosp;
            im['record_id']=this.state.recordId;
            this.props.saveImage(im);
        });

        this.resetNewRecord();
        this.closeHandler();
    };

    changeIdHandler=(e)=>{
        this.setState({...this.state,recordId:e.target.value});
    };

    changeIpnoHandler=(e)=>{
        this.setState({...this.state,ipno:e.target.value});
    };
    startCamera=(e)=>{
        this.setState({...this.state,cameraOpen:true});
    };

    closeCamera=()=>{
      this.setState({...this.state,cameraOpen:false});
    };

    saveFromCamera=(image)=>{
        console.log("Received image:", image.name);
        //this.setState({newer:16})
        let new_state=this.state;
        new_state.images=[...new_state.images,image];
        new_state.n_images=new_state.n_images+1;
        this.setState(new_state);
        console.log("Number of images is now",this.state.n_images);
      //this.closeCamera();
    }

    render(){
        const actions=(
            <div>
                <FlatButton label="SAVE" onClick={this.saveHandler}/>
                <FlatButton label="CANCEL" onClick={this.closeHandler}/>
            </div>


        );
        var styles = {
            dialogRoot: {
                display: 'absolute',
                'zIndex':50,
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 0,
                height:"100%"
            },
            dialogContent: {
                position: 'relative',
                width: '100%',
                height:'100%',
                maxWidth: 500
            },
            dialogBody: {
                paddingBottom: 0
            }
        };
        return(
            <Dialog open={this.props.open}
                    actions={actions} modal={false}
                    onRequestClose={this.closeHandler}
                    autoScrollBodyContent={true}
                    contentStyle={ styles.dialogContent }
                    bodyStyle={ styles.dialogBody }
                    style={ styles.dialogRoot }
                    repositionOnUpdate={ false }

            >
                <div style={{width: '100%', height: '100vh'}}>

                <TextField id="id" value={this.state.recordId} onChange={this.changeIdHandler}
                    hintText="Record ID"
                /><br />
                <br />
                <TextField  onChange={this.changeIpnoHandler} value={this.state.ipno}
                    hintText="Inpatient Number"
                /><br />

                <FlatButton label="Camera" onClick={this.startCamera} />
                <Capture open={this.state.cameraOpen}
                 close={this.closeCamera}
                 save={this.saveFromCamera}

                 />

                 <Grid images={this.state.images} />






                </div>
            </Dialog>
        );
    }
};

const mapStateToProps=(state)=>{
    return {
        images:state.images.images,
        hosp:state.images.hosp,
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        saveImage:(image)=>dispatch(actions.saveImage(image)),
    }
};

export default connect(mapStateToProps,mapDispatchToProps) (NewRecord);
