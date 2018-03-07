import React, {Component} from "react";
import {GridList, GridTile} from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';
import Subheader from 'material-ui/Subheader';


class Gallery extends Component{

    render(){
        let dates=this.props.images.map(im=>im.date);
        dates=[... new Set(dates)];
        dates.sort((a,b)=>a<b ? 1:-1);
        let elements=[];
        dates.forEach(date=>{
            elements.push(<Subheader>{date}</Subheader>);
            let images2=this.props.images.filter(im=>im.date===date);
            images2.forEach(image=>{
                let tile= (<GridTile
                    key={image.file_path}
                    actionIcon={<IconButton><StarBorder color={this.props.synced_images.filter(sImage=>sImage.file_path===image.file_path).length>0? "green":"white"} /></IconButton>}
                    title={image.record_id}
                    subtitle={<span>by <b>{image.ipno}</b></span>}
                >
                    <img src={URL.createObjectURL(image.blob)} />

                </GridTile>);

                elements.push(tile);
            });

        });

        console.log("Available dates",dates);
        return(
            <div>
                <p>Images<StarBorder color="white" /></p>
                <GridList>
                    {elements}

                </GridList>

            </div>
        );
    }
};

const mapStateToProps=(state)=>{
    return {
        images:state.images.images,
        synced_images:state.images.synced_images,

    }
};

export default connect(mapStateToProps) (Gallery);
