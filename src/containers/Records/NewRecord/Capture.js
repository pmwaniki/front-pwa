import React, { Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
//import {ImageCapture} from 'image-capture'

import {dataURItoBlob,filenameFromDate} from '../../../utils';
import styles from './Capture.css.js';

let ImageCapture=window.ImageCapture;
let imageCapture=null;
class Capture extends Component{

  state={
    blob:null,
    file_path:'',
      camera:true
  };


    componentDidMount=()=>{
        if(this.props.open){
            console.log("Restarting camera");
            this.openCamera();
        }
    };

    resetCamera=()=>{
      ///

      this.setState({...this.state,
        blob:null,
        file_path:''
      });


    };


    openCamera=()=>{
        //this.setState({...this.state,camera:true});
        this.img.style.display="none";
        this.video.style.display="flex";
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            navigator.mediaDevices.getUserMedia({video: {
                facingMode:{ideal:"environment"},
                    width:{min:640,ideal:1920},
                    height:{min:720,ideal:1080}
                },audio:false})
                .then((stream)=>{
                    console.log("Camera available");
                    //this.setState({stream});
                    //this.video.style.display='block';

                    this.video.srcObject=stream;
                    this.video.play();

                    let track=stream.getVideoTracks()[0];
                    imageCapture=new ImageCapture(track);
                    const photoCapabilities=imageCapture.getPhotoCapabilities()
                        .then(()=>{
                            track.applyConstraints({
                                advanced:[{torch:true}]
                            });
                            return imageCapture.getPhotoSettings();
                        })
                        .then(settings=>{
                          this.img.style.width=settings.imageWidth + "px";
                          this.img.style.height=settings.imageHeight + "px";
                          console.log("Settings",settings);
                        })
                })
                .catch(err=>{
                    console.log("Camera failed",err);
                        alert("Could not connect to Camera");
                        this.props.close();
                });

        } else {
            console.log("cant connect to device");

        }
    };
    closeCamera=()=>{
        //this.setState({...this.state,camera:false});
        if(this.video.srcObject){
            this.video.srcObject.getVideoTracks().forEach(function(track){
                console.log("closing track",track);
                track.stop();

            });
        }

        this.video.style.display="none";
        this.img.style.display="flex";

    };


    capture=(e)=>{

        imageCapture.takePhoto()
            .then(blob=>{
                this.setState({...this.state,blob:blob,file_path: "File_" + Date.now() + ".jpeg", date: new Date().toISOString().split("T")[0]});
                this.img.style.display='flex';
                //this.img.style.width='auto';
                //console.log(blob);
            })






    };



    saveHandler=()=>{
      //
      if(!this.state.blob){
        alert("No picture captured yet");
        return;
      }
      this.props.save(this.state);
      this.resetCamera();
      this.closeCamera();
      this.props.close();
    };





    cancelHandler=(e)=>{
        this.resetCamera();
        this.closeCamera();
        this.props.close();

    };
    componentWillReceiveProps=(newProps)=>{
      if(newProps.open){
        //alert('about to reset camera');
        this.resetCamera();
      }
    };

    shouldComponentUpdate=()=>{
        return true;
    };



    componentDidUpdate=()=>{
        if(this.props.open & !this.state.blob){
            console.log("Restarting camera");
            this.openCamera();
        } else {
            console.log("Closing camera");
            this.closeCamera();
        }
    };



    render(){
        //console.log("Rendering camera");

        const actions=(
            <div style={styles.toolbar}>
                <FlatButton label="CAPTURE" onClick={this.capture}/>
                <FlatButton label="SAVE" onClick={this.saveHandler}/>
                <FlatButton label="CANCEL" onClick={this.cancelHandler}/>
            </div>
        );
        return(

               <div style={{...styles.captureContainer,display:this.props.open? "block":"none" }} open={this.props.open}
                  actions={actions}


               >
                <div>
                <video style={styles.video}

                       ref={(video)=>{this.video=video}}
                       id="capture"
                />
                </div>

                   <img style={styles.image} src={this.state.blob? URL.createObjectURL(this.state.blob) : "#"} ref={(img)=>this.img=img}>
                   </img>



                   {actions}






               </div>

        );
    }
}

export default Capture;
