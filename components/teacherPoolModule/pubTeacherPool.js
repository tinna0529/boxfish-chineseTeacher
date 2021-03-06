/**
 * Created by duanfeng on 16/6/1.
 */
import React from 'react';

import BaseQuery from './../commons/baseQuery';
import SelectComponent from './../commons/selectComponent.js';
import Table from './../commons/table.js';
import DateRangePicker from '../commons/dateRangePicker';
import {Get,Post} from '../../util/ajax';
import store from 'store';
import Page from '../commons/page';
import Detail from './pubTeacherPoolDetail';
import ConfirmDialog from '../commons/confirmDialog';
import {findElementByTeacherId} from '../../util/formTest';



//获取一些数据
var tableConfig = require('../../conf/config.json');
var selectConfig = require('../../conf/selectConfig.json');
var urlConfig = require('../../conf/urlConfig.json');



var PubTP = React.createClass({

    getInitialState : function(){
        return{
            url:urlConfig.testUrl,
            tableContent:[],
            totalPages : 1,
            curPage : 1,
            teacherId : "",
            noPassReason:"",
            pub_school:"",
            pub_teachingAge :"",
            interviewTimeStart : "",
            interviewTimeEnd : "",
            lectureTimeStart : "",
            lectureTimeEnd : "",
            initImgSrc :"../../images/demo/initialImg.png",
            imgSrc : "",
            defaultScore:{
                "control" : "",
                "language" : "",
                "logic" : "",
                "word" : "",
                "question" : "",
                "func" : ""
            },
            defaultLecture:{
                triallectureTeacher : "",
                triallectureStudent : "",
                triallectureStartTime : "",
                triallectureEndTime : "",
                demoCourse :""
            },
            defaultInterview:{
                "appearance" : "",
                "voice" : "",
                "accurate" : "",
                "interest" : "",
                "present" : ""
            }

        }
    },
    componentDidMount : function(){
        this._refreshTable();
    },
    render : function(){
        let callBackFunc = {
            "showDetail" : this._showDetail,
            "catch" : this._showCatch
        };
        let catchMessage = "确定捕捞该老师?";
        return(
            <div role="tabpanel" className="tab-pane active" id="public">
                <div className="queryOption left-floated">
                    <div className="form row" >
                        <BaseQuery ref="pub_baseQuery"/>
                    </div>
                    <div className="form row">
                        <div className="field">
                            <input type="text" className="form-control" ref="pub_school" placeholder="学校"/>
                        </div>
                        &nbsp;
                        <div className="field" >
                            <DateRangePicker ref="pub_interviewTime" name="面试时间" isMinute={true} />
                        </div>
                        <SelectComponent tip="教龄" contentData={selectConfig.teachingAge} ref="pub_teachingAge" />
                        <div className="field" >
                            <DateRangePicker ref="pub_lectureTime" name="试讲时间" isMinute={true} defaultTime=""/>
                        </div>
                        <SelectComponent tip="不通过类型" contentData={selectConfig.notPass} ref="pub_noPass"/>
                    </div>
                </div>
                <div className="queryBtn left-floated" >
                    <button className="btn btn-primary" style={{marginRight:'10px'}} onClick={(e)=>{this._search(1,true)}}>筛选</button>
                </div>

                <div className="main">
                    <div className="tableContainer left-floated" ref="tableContainer">
                        <div className="table-wrap">
                            <Table  tableConfig={tableConfig.publicTeacherPoolTable} contentData={this.state.tableContent} callBack={callBackFunc}/>
                        </div>
                        <Page onPre={this._prePage} onFisrt={this._firstPage} curPage={this.state.curPage} totalPages={this.state.totalPages} onLast={this._lastPage} onNext={this._nextPage}/>
                    </div>
                    <Detail defaultScore={this.state.defaultScore} defaultLecture={this.state.defaultLecture} defaultInterview={this.state.defaultInterview} imgSrc={this.state.imgSrc} noPassReason={this.state.noPassReason}/>
                    <ConfirmDialog content={{"message":catchMessage,"name":"pub-catchPool"}} callBack={this._doCatch}/>
                </div>
            </div>
        );
    },
    _showDetail : function(id){
        this.setState({teacherId:id});
        Get({
            url:this.state.url+"/web/teacher/teacherAllView/"+id,
            data: {
                token : store.get("accessToken")
            }
        }).then((p)=>{
            if(!p.data){
                alert("该教师信息尚不完善!");
                return ;
            }
            this.setState({
                imgSrc : p.data.teacherCertification
            });
        });
        let curObj =  findElementByTeacherId(id,this.state.tableContent);
        if(curObj){
            let trailMap = curObj.trialScoresMap;
            let interviewMap = curObj.interviewScoresMap;
            let defaultScore = this.state.defaultScore;
            let defaultInterview = this.state.defaultInterview;
            let defaultLecture = this.state.defaultLecture;
            if(trailMap){
                 defaultScore = {
                    "control" : trailMap.control,
                    "language" : trailMap.languageManagement,
                    "logic" : trailMap.logicTree,
                    "word" : trailMap.spokenLevel,
                    "question" : trailMap.openQuestion,
                    "func" : trailMap.function
                };
            }
            if(interviewMap){
                defaultInterview = {
                        "appearance" : interviewMap.appearance,
                        "voice" : interviewMap.pronunciation,
                        "accurate" : interviewMap.accuracy,
                        "interest" : interviewMap.logic,
                        "present" : interviewMap.expression
                    };
            }
            defaultLecture = {
                triallectureTeacher : curObj.triallectureTeacher||"",
                triallectureStudent : curObj.triallectureStudent||"",
                triallectureStartTime : curObj.triallectureStartTime||"",
                triallectureEndTime : curObj.triallectureEndTime||"",
                demoCourse :curObj.demoCourse||""
            };
            this.setState({
                defaultScore : defaultScore,
                defaultInterview : defaultInterview,
                defaultLecture : defaultLecture,
                noPassReason :curObj.noPassReason
            });
        }
        $(".pub").modal();
    },
    _showCatch : function(id){
        this.setState({
            teacherId : id
        });
        $(".pub-catchPool").modal();
    },
    _doCatch : function(){
        Post({
            url : this.state.url+"/web/teacher/fishOutPond"+"?token="+store.get("accessToken"),
            data : {
                "teacherIds":[this.state.teacherId]
            }
        }).then((p)=>{
            this._refreshTable();
        },()=>{

        });
    },
    _filterInterviewTime : function(start,end){
        let startTime = start.substr(0,10)+" "+start.substr(11,5);
        let endTime = end.substr(0,10)+" "+end.substr(11,5);
        this.setState({
            interviewTimeStart : startTime,
            interviewTimeEnd : endTime
        });
    },
    _filterLectureTime : function(start,end){
        let startTime = start.substr(0,10)+" "+start.substr(11,5);
        let endTime = end.substr(0,10)+" "+end.substr(11,5);
        this.setState({
            lectureTimeStart : startTime,
            lectureTimeEnd : endTime
        });
    },
    _search : function(page,showTip){
        let timeObj = this.refs.pub_baseQuery.getTime();
        let iTime = this.refs.pub_interviewTime.getTime();
        let lTime = this.refs.pub_lectureTime.getTime();
        let filterData = {
            "teacherId":this.refs.pub_baseQuery.state.teacherId.trim(),
            "name" : this.refs.pub_baseQuery.state.teacherName.trim(),
            "telephone" : this.refs.pub_baseQuery.state.tel.trim(),
            "province" : this.refs.pub_baseQuery.state.province,
            "city" : this.refs.pub_baseQuery.state.city,
            "county" : this.refs.pub_baseQuery.state.district,
            "createTimeStart" : timeObj.startTime,
            "createTimeEnd" : timeObj.endTime,
            "school" : this.refs.pub_school.value.trim(),
            "teachingAge" : this.refs.pub_teachingAge.state.selectContent,
            "interviewTimeStart":iTime.startTime,
            "interviewTimeEnd":iTime.endTime,
            "triallectureStartTimeStart":lTime.startTime,
            "triallectureStartTimeEnd":lTime.endTime,
            "stateStep" : this.refs.pub_noPass.state.selectContent

        };
        for(var pro in filterData){
            if(typeof (filterData[pro])!="number"&&filterData[pro]==""){
                delete filterData[pro];
            }
        }
        this._getPage(page,filterData,showTip);
    },
    _refreshTable : function(){
        this._search(this.state.curPage);
    },
    _getPage : function (page,passData,showTip) {
        let url = this.state.url+urlConfig.teacherList
        let filterData = {
            "stateStep" : 10,
            "isPublicSchool":1,
            "page" : page-1,
            "token" : store.get("accessToken")
        };
        filterData = passData?Object.assign(filterData,passData):filterData;
        Get({
            url:url,
            data :filterData
        }).then((p)=>{
            if(p.data == null )
                return;
            if(p.data.content&&p.data.content.length==0&&showTip){
                alert("查询结果为空!");
            }
            let arr = p.data.content;
            this.setState({
                curPage : page,
                tableContent : arr,
                totalPages : p.data.totalPages?p.data.totalPages:1
            });
        });
    },
    _prePage : function () {
        if(this.state.curPage == 1)
            return;
        this._search(this.state.curPage - 1);
    },
    _firstPage : function () {
        if(this.state.curPage == 1)
            return;
        this._search(1);
    },
    _lastPage : function () {
        if(this.state.curPage == this.state.totalPages)
            return;
        this._search(this.state.totalPages);
    },
    _nextPage : function () {
        if(this.state.curPage == this.state.totalPages)
            return;
        this._search(this.state.curPage + 1);
    }
});

export default PubTP;