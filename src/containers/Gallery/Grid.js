import React, {Component} from "react";
import {GridList, GridTile} from 'material-ui/GridList';


class Grid extends Component{

    render(){
        return(
            <div>
                <p>Images</p>
                <GridList>
                    {this.props.images.map(image=>{
                        return <GridTile key={image.file_path}><img src={URL.createObjectURL(image.blob)} /></GridTile>
                    })}
                </GridList>

            </div>
        );
    }
}

export default Grid;