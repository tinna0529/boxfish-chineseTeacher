/**
 * Created by tinna on 16/5/19.
 */
import React from 'react';

import TeacherAddress from './teacherAddress.js';
import DataRangePicker from './dateRangePicker.js';

var BaseQuery = React.createClass({

    getInitialState : function(){
        return{
            teacherId :"",
            teacherName : "",
            tel : "",
            province : "",
            city : "",
            district : "",
            createTimeStart : "",
            createTimeEnd : ""
        }
    },

    render : function(){

        return(
            <div>
                <div className="field" style={{width:"10%"}}>
                    <input type="tel" className="form-control" ref="teacherId" placeholder="教师ID" onChange={this._changeTeacherID} value={this.state.teacherId}/>
                </div>
                <div className="field" style={{width:"10%"}}>
                    <input type="text" className="form-control" ref="teacherName" placeholder="教师姓名" onChange={this._changeTeacherName} value={this.state.teacherName}/>
                </div>
                <div className="field" style={{width:"13%"}}>
                    <input type="text" className="form-control" ref="tel" placeholder="教师电话" onChange={this._changeTel} value={this.state.tel}/>
                </div>
                <TeacherAddress ref="teacherAddress" callParent={this._changeTeacherAddress}/>
                <DataRangePicker   ref="createTime" callParent={this._changeTime} name="报名日期" defaultTime=""/>
                <div className="field more" onClick={this._showHideQuery}>
                    <span className="glyphicon glyphicon-triangle-bottom"></span>
                </div>
            </div>
        );
    },
    _showHideQuery : function(e){
        let el  = $(e.target).parents(".queryOption").toggleClass("showAllQuery");
    },
    _changeTeacherName(){
        this.setState({teacherName:this.refs.teacherName.value});
    },
    _changeTel(){
        this.setState({tel:this.refs.tel.value});
    },
    _changeTime(start,end){
        this.setState({
            createTimeStart:start,
            createTimeEnd : end
        });
    },
    _changeTeacherID : function(){
        this.setState({teacherId:this.refs.teacherId.value});
    },
    _changeTeacherAddress : function(name,value){
        if(name=="province"&&value=="所有"){
            this.setState({
                province: "",
                city: "",
                district : ""
            });
        }else if(name=="city"&&value=="所有"){
            this.setState({
                city: "",
                district : ""
            });
        }else{
            switch(name) {
                case "province":
                    this.setState({province: value});
                    break;
                case "city" :
                    this.setState({city: value});
                    break;
                case "district" :
                    this.setState({district: value});
                    break;
            }
        }

    },
    getTime : function(){
        return this.refs.createTime.getTime();
    },
    clearTime : function(){
        this.refs.createTime.clearTime();
    }

});

export default BaseQuery;