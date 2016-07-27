/**
 * Created by duanfeng on 16/6/6.
 */
import React from 'react';
import DataPickerToThirty from '../commons/datePickerToThirty';
import {Get} from '../../util/ajax';

var LectureForm = React.createClass({
    getInitialState : function(){
        return{
            isReadOnly:false,
            lec_account:"",
            stu_account:"",
            lec_lesson:"",
            timeLot:"",
            startTime:"",
            defaultContent : {
                "teacherAccount":"",
                "stuAccount" : "",
                "lectureLesson" : "",
                "defaultRange" :"",
                "timeLot" : ""
            }
        }
    },
    componentWillReceiveProps : function(nextProps){
        this.setState({
            lec_account:nextProps.defaultContent.teacherAccount||"",
            stu_account:nextProps.defaultContent.stuAccount||"",
            lec_lesson:nextProps.defaultContent.lectureLesson||"",
            defaultRange:nextProps.defaultContent.defaultRange||"",
            timeLot : nextProps.defaultContent.timeLot||"",
            isReadOnly :nextProps.isReadOnly||false
        });
        console.log("nextProps.defaultContent.lectureLesson");
        console.log(nextProps.defaultContent.defaultRange);
    },
    render : function(){

        let lectureAccounts = this.props.tList.map((v,i) =>{
                return(
                <option value={v.teacherId}>{v.nickName}</option>
            );
        }),
            studentAccounts = this.props.sList.map((v,i) =>{
                return(
                    <option value={v.studentId}>{v.nickName}</option>
                );
            }),
            demoLessons = this.props.lLessons.map((v,i) =>{
                return(
                    <option value={v.courseId+"||"+v.name}>{v.name}</option>
                );
            });
            let timeLots = this.props.timeLots;
                timeLots.sort(function(a,b){
                return a.slotId - b.slotId;
            });
                timeLots=timeLots.map((v,i) =>{
                return(
                    <option value={v.slotId+"||"+v.startTime+"||"+v.endTime}>{v.startTime+'-'+v.endTime}</option>
                );
            });

        return(
            <div className="modal-form">
                <div className="form-group">
                    <label>试讲账号:</label>
                    <select className="form-control" ref="lec_account" onChange={(e)=>{this._change(e,"lec_account")}} value={this.state.lec_account} disabled={this.state.isReadOnly}>
                        <option value=""></option>
                        {lectureAccounts}
                    </select>
                </div>
                <div className="form-group">
                    <label>学生账号:</label>
                    <select className="form-control" ref="stu_account" onChange={(e)=>{this._change(e,"stu_account")}} value={this.state.stu_account} disabled={(this.props.studentReadOnly||false)||this.state.isReadOnly}>
                        <option value=""></option>
                        {studentAccounts}
                    </select>
                </div>
                <div className="form-group">
                    <label>试讲时间:</label>
                    <DataPickerToThirty  defaultTime={this.state.defaultRange} ref="time"/>
                    <select className="form-control timeLot" ref="timeLot"  onChange={(e)=>{this._change(e,"timeLot")}} value={this.state.timeLot} disabled={this.state.isReadOnly}>
                        <option value=" "></option>
                        {timeLots}
                    </select>
                </div>
                <div className="form-group">
                    <label>demo课:</label>
                    <select className="form-control" ref="lec_lesson" onChange={(e)=>{this._change(e,"lec_lesson")}} value={this.state.lec_lesson} disabled={this.state.isReadOnly}>
                        <option value=""></option>
                        {demoLessons}
                    </select>
                </div>

            </div>
        );
    },
    _change : function(e,name){
        switch(name){
            case "lec_account" :
                this.setState({lec_account:this.refs[name].value});
                break;
            case "stu_account" :
                this.setState({stu_account:this.refs[name].value});
                break;
            case "lec_lesson" :
                this.setState({lec_lesson:this.refs[name].value});
                break;
            case "timeLot" :
                this.setState({timeLot:this.refs[name].value});
                break;
        }
    },
    getTime : function(){
       return  this.refs.time.getTime();
    }

});

export default LectureForm;