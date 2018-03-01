import React, {Component} from "react";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';

import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn,} from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import NewRecord from "./NewRecord/NewRecord";
var _ = require('lodash');

class Records extends Component{
    state={
        dialogOpen:false,
        records:[]
    };

    addImageHandler=(e)=>{
        this.setState({...this.state,dialogOpen:true});
    };

    closeNewImage=()=>{
        this.setState({...this.state,dialogOpen:false});
    };

    formatImages=(data) =>{
        //IPs= _.chain(data).uniqBy( 'ipno').map('ipno').value();
        var groups=_.groupBy(data, (e) => `${e.record_id}___${e.ipno}`);
        //console.log("Group:",groups);
        return Object.keys(groups).map((key,index)=>{
            let record_id=key.split("___")[0];
            let ipno=key.split("___")[1];
            let filtered=data.filter(e=> e.ipno===ipno && e.record_id===record_id);
            let dates=filtered.map(e=>e.date);
            dates=dates.sort((a,b)=> Date.parse(a) - Date.parse(b));
            let start_date=dates[0],last_modified=dates[dates.length-1];
            return {
                uniqueId:key,
                record_id:record_id,
                ipno:ipno,
                files:filtered,
                date_created:start_date,
                last_modified:last_modified
            }
        });
    };



    render(){
        const style = {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
        };
        let data=this.formatImages(this.props.images);
        const iconStyles = {
            marginRight: 24,
        };
        console.log("Table data:",data);
        return(
            <div>
                <h1>Records <FontIcon className="muidocs-icon-action-home" style={iconStyles}/></h1>
                <Paper style={{ height: '50', width: '100%', overflow: 'auto', }}>
                    <Table bodyStyle={{overflow:'visible'}}>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn style={{ width: 100 }}>ID</TableHeaderColumn>
                                <TableHeaderColumn style={{ width: 100 }}>IP No</TableHeaderColumn>
                                <TableHeaderColumn style={{ width: 100 }}>Created</TableHeaderColumn>
                                <TableHeaderColumn style={{ width: 100 }}>Modified</TableHeaderColumn>

                            </TableRow>

                        </TableHeader>
                        <TableBody>
                            {data.map(record=>{
                                return(
                                    <TableRow key={record.uniqueId}>
                                        <TableRowColumn style={{ width: 100 }}>{record.record_id}</TableRowColumn>
                                        <TableRowColumn style={{ width: 100 }}>{record.ipno}</TableRowColumn>
                                        <TableRowColumn style={{ width: 100 }}>{record.date_created}</TableRowColumn>
                                        <TableRowColumn style={{ width: 100 }}>{record.last_modified}</TableRowColumn>

                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>



                <FloatingActionButton secondary={false} onClick={this.addImageHandler} style={style}>
                    <ContentAdd />
                </FloatingActionButton>
                <NewRecord open={this.state.dialogOpen} onClose={this.closeNewImage}/>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return {
        images:state.images.images,
        hosp:state.images.hosp,
    }
};
export default connect(mapStateToProps) (Records);
