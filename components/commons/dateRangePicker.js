
import React from 'react';
import moment from 'moment';

var DataRangePicker = React.createClass({

    getInitialState : function(){
        return{
            time :"",
            startTime : "",
            endTime : ""
        }
    },
    componentWillReceiveProps : function(nextProps){
        if(nextProps.defaultTime!=this.props.defaultTime){
            this.setState({
                time : nextProps.defaultTime
            });
            $(this.refs.Time).val(nextProps.defaultTime);
        }


    },
    componentDidMount : function () {
        let pattern = this.props.place?{parentEl:this.props.place}:{parentEl:".content"};
        //初始化表格的日期选择控件
        pattern = this.props.isMinute?Object.assign({
            timePicker: true,
            timePickerIncrement: 10,
            format: 'YYYY-MM-DD HH:mm:ss'
        },pattern):pattern;
        pattern = this.props.isSingle?Object.assign({singleDatePicker: true,startDate:moment().startOf('second'),format:"YYYY-MM-DD HH:mm:ss"},pattern):pattern;
        $(this.refs.Time).daterangepicker(pattern,(start, end)=>{
            if(this.props.isSingle){
                this.setState({time:start.format("YYYY-MM-DD HH:mm:ss")});
            }else{
                let t = "";
                if(this.props.isMinute){
                     t =`${start.format("YYYY-MM-DD HH:mm:ss")}-${end.format("YYYY-MM-DD HH:mm:ss")}` ;
                }else{
                    t =`${start.format("YYYY-MM-DD")}-${end.format("YYYY-MM-DD")}` ;
                }
                this.setState({
                    time:t,
                    startTime : start.format("YYYY-MM-DD HH:mm:ss"),
                    endTime : end.format("YYYY-MM-DD HH:mm:ss")
                });
                $(this.refs.Time).attr("title",this.state.time);
            }
            if(this.props.callBlur){
                this.props.callBlur(this.props.teacherId)
            }
        });

        $(this.refs.Time).val(this.props.defaultTime);
    },
    render : function () {
        if(this.props.isInterview){
            return (
                <div className="field" >
                    <div style={{position:'relative', width:'180px'}}>
                        <input type="text" className="form-control datePicker"
                               style={{paddingLeft:'30px'}} ref={"Time"} placeholder={this.props.name||""} readOnly={true}/>
                        <i className="glyphicon glyphicon-calendar"  style={{position:'absolute',left:'10px',top:'8px'}}></i>
                    </div>
                </div>
            );
        }
        return (
            <div className="field" style={{width:"220px"}}>
                <div style={{position:'relative', width:'100%'}}>
                    <input type="text" className="form-control datePicker"
                           style={{paddingLeft:'30px'}} ref={"Time"} placeholder={this.props.name||""} readOnly={true} title="请选择区间"/>
                    <i className="glyphicon glyphicon-calendar"  style={{position:'absolute',left:'10px',top:'8px'}}></i>
                    <i className="glyphicon glyphicon-trash"  style={{position:'absolute',right:'10px',top:'8px',cursor:"pointer"}} onClick={this.clearTime}></i>
                </div>
            </div>
        );
    },
    getTime : function(){
        if(!this.state.startTime&&$(this.refs.Time).val()){
            this.state.startTime = this.props.isMinute?moment().format("YYYY-MM-DD HH:mm:ss"):moment().format("YYYY-MM-DD");
        }

        if(!this.state.endTime&&$(this.refs.Time).val()){
            this.state.endTime = moment().format("YYYY-MM-DD");
        }
        if(!$(this.refs.Time).val()){
            this.setState({
                startTime : "",
                endTime : ""
            });
        }
        return {
            startTime : this.state.startTime,
            endTime : this.state.endTime
        }
    },
    clearTime : function(){
        this.setState({
            startTime : "",
            endTime : ""
        });
        $(this.refs.Time).val("");
    }
});

export default DataRangePicker;