import React , {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Clear from 'material-ui/svg-icons/content/clear'

class ImageDetail extends Component{
    style={
        modal:{
            width:'100%',
            height:'100%',
            display:this.props.preview? "block": "none",
            position:"fixed",
            zIndex:10,
            top:56,
            backgroundColor:"black",
            overflow:'auto'
        },
        image:{
            maxWidth:'100%',
            height:'auto',
            position:'fixed',
            margin:'auto auto'

        },
        backButton:{
            position:'fixed',
            top:56,
            left:0,
            //zIndex:11,
            backgroundColor:"white",
        }
    };

    cancelHandler=(e)=>{
        this.props.close();
        this.modal.style.display='none';
    };

    render(){

        return(
            <div style={{...this.style.modal,display:this.props.preview? "block": "none"}} ref={(modal)=>this.modal=modal}>
                <img  src={this.props.selected} style={this.style.image}/>
                <IconButton onClick={this.cancelHandler} style={this.style.backButton}><Clear/></IconButton>
            </div>
        );
    }
};

export default ImageDetail;