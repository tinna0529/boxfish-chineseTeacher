/**
 * Created by duanfeng on 16/6/7.
 */
import React from 'react';
import moment from 'moment';

var DataPickerToThirty = React.createClass({
    getInitialState : function(){
        return{
            realTime:""
        }
    },
    componentWillReceiveProps : function(nextProps){
        if(this.props.defaultTime!=nextProps.defaultTime){
            this.setState({
                realTime : nextProps.defaultTime
            });
            console.log("de");
            console.log(nextProps.defaultTime);
            $(this.refs.Time).val(nextProps.defaultTime);
        }
    },
    componentDidMount : function () {
        //初始化表格的日期选择控件
        $(this.refs.Time).daterangepicker({singleDatePicker: true,startDate:new Date(),minDate:moment(),format:"YYYY-MM-DD"},(start,end)=>{
            let real = start.format("YYYY-MM-DD");
            this.setState({
                realTime:real
            });
        });
    },
    render : function () {
        return (
            <div className="form-group" style={{display:'inline-block',width:"180px"}} >
                <div style={{position:'relative', width:'330px'}}>
                    <input type="text" className="form-control datePicker"
                           style={{paddingLeft:'30px'}} ref="Time" readOnly={true}/>
                    <i className="glyphicon glyphicon-calendar"  style={{position:'absolute',left:'10px',top:'8px'}}></i>
                    <i className="glyphicon glyphicon-trash"  style={{position:'absolute',right:'10px',top:'8px',cursor:"pointer"}} onClick={this.clearTime}></i>
                </div>
            </div>
        );
    },
    getTime : function(){
        if(!this.state.realTime){
            this.state.realTime = moment().format("YYYY-MM-DD");
        }
        console.log(this.state.realTime);
        return this.state.realTime
    }
});

export default DataPickerToThirty;