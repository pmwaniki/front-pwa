import React, {Component} from "react";
import {GridList, GridTile} from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';


class Gallery extends Component{

    render(){
        return(
            <div>
                <p>Images<StarBorder color="white" /></p>
                <GridList>
                  {this.props.images.map(image=>{
                    return <GridTile
                        key={image.file_path}
                        actionIcon={<IconButton><StarBorder color="blue" /></IconButton>}
                        title={image.record_id}
                        subtitle={<span>by <b>{image.ipno}</b></span>}
                    >
                        <img src={URL.createObjectURL(image.blob)} />

                    </GridTile>
                  })}
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
