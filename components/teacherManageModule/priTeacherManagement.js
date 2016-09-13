/**
 * Created by duanfeng on 16/6/1.
 */
import React from 'react';

import PriTeacherDetail from './priTeacherManagementDetail';
import BaseQuery from '../commons/baseQuery';
import SelectComponent from '../commons/selectComponent.js';
import Table from '../commons/table.js';
import ConfirmDialog from '../commons/confirmDialog';
import Page from '../commons/page';
import PriInterviewScore from './interviewScore';
import PriLectureScore from './lectureScore';
import {Get,Post} from '../../util/ajax';
import store from 'store';
import {findElementByTeacherId} from '../../util/formTest';

//获取一些下拉框数据
var tableConfig = require('../../conf/config.json');
var selectConfig = require('../../conf/selectConfig.json');
var urlConfig = require('../../conf/urlConfig.json');

var PriTM = React.createClass({

    getInitialState : function(){
        return{
            url:urlConfig.testUrl,
            tableContent : [],
            totalPages :1,
            curPage : 1,
            defaultInterviewScore : {
                "appearance" : "",
                "voice" : "",
                "accurate" : "",
                "logic" : "",
                "present" : ""
            },
            defaultLectureScore :{
                "control" : "",
                "language" : "",
                "logic" : "",
                "word" : "",
                "question" : "",
                "func" : ""
            },
            defaultTeacherInfo:{
                education : "",
                engLevel : "",
                score:"",
                school : "",
                profession : "",
                abroadExp : "",
                teachExp : "",
                otherExp : "",
                abroadCountry:"",
                abroadStartTime : "",
                abroadEndTime : ""
            }
        }
    },
    componentDidMount : function(){
        this._refreshTable();
    },
    render : function(){
        let callBackFunc = {
            "showDetail":this._showDetail,
            "onBatchChanged" : this._batchChanged,
            "interviewScore" : this._interviewScore,
            "lectureScore" : this._lectureScore
        };
        let freezeMessage = "确认冻结选中老师的账号?";
        let activeMessage = "确认激活选中老师的账号?";
        return(
            <div role="tabpanel" className="tab-pane" id="private">
                <div className="queryOption left-floated">
                    <div className="form row" >
                        <BaseQuery ref="pri_baseQuery" />
                    </div>
                    <div className="form row" >
                        <SelectComponent tip="账号状态" contentData={selectConfig.accountType} ref="pri_accountState" />
                        <div className="field" >
                            <label>综合评分:&nbsp;</label>
                            <div className="inline" >
                                <input type="text" className="form-control" ref="pri_lowMarkGrade"/>
                                &nbsp;-&nbsp;
                                <input type="text" className="form-control" ref="pri_highMarkGrade"/>
                            </div>
                        </div>
                        <div className="field" >
                            <label>面试评分:&nbsp;</label>
                            <div className="inline" >
                                <input type="text" className="form-control" ref="pri_lowInterviewGrade"/>
                                &nbsp;-&nbsp;
                                <input type="text" className="form-control" ref="pri_highInterviewGrade"/>
                            </div>
                        </div>
                        <div className="field" >
                            <label>试讲评分:&nbsp;</label>
                            <div className="inline" >
                                <input type="text" className="form-control" ref="pri_lowLectureGrade"/>
                                &nbsp;-&nbsp;
                                <input type="text" className="form-control" ref="pri_highLectureGrade"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="queryBtn left-floated" >
                    <button className="btn btn-primary" style={{marginRight:'10px'}} onClick={(e)=>{this._search(1,true)}}>筛选</button>
                </div>

                <div className="main">
                    <div className="tableContainer" ref="tableContainer">
                        <div className="table-header">
                            <button className="btn btn-default btn-sm" onClick={this._callFreeze}>冻结</button>
                            <button className="btn btn-default btn-sm" onClick={this._callActivity}>解冻</button>
                        </div>
                        <div className="table-wrap">
                            <Table ref="table" tableConfig={tableConfig.privateTeacherManagementTable} contentData={this.state.tableContent} callBack={callBackFunc}/>
                        </div>
                        <Page onPre={this._prePage} onFisrt={this._firstPage} curPage={this.state.curPage} totalPages={this.state.totalPages} onLast={this._lastPage} onNext={this._nextPage}/>
                    </div>
                    <PriTeacherDetail defaultContent={this.state.defaultTeacherInfo} callFresh={this._refreshTable} url={this.state.url} id={this.state.teacherId}/>
                    <PriInterviewScore defaultContent={this.state.defaultInterviewScore} name="pri-tm-interview" url={this.state.url} id={this.state.teacherId} refreshTable={this._refreshTable}/>
                    <PriLectureScore defaultContent={this.state.defaultLectureScore} name="pri-tm-lecture" url={this.state.url} id={this.state.teacherId} refreshTable={this._refreshTable}/>
                    <ConfirmDialog content={{"message":freezeMessage,"name":"pri-freeze"}} ref="pri-freeze" callBack={this._doFreeze}/>
                    <ConfirmDialog content={{"message":activeMessage,"name":"pri-active"}} ref="pri-active" callBack={this._doActivity}/>
                </div>
            </div>
        );
    },

    _showDetail : function(id){
        this.setState({teacherId:id});
        Get({
            url:this.state.url+"/web/teacher/"+id,
            data : {
                token : store.get("accessToken")
            }
        }).then((p)=>{
            if(!p.data){
                alert("该教师信息尚不完善!");
                return ;
            }
            console.log(p.data);
            let teacherObj = p.data;
            this.setState({
                defaultTeacherInfo : {
                    education : teacherObj.degree||"",
                    engLevel : teacherObj.englishCertification||"",
                    score:teacherObj.englishScore||"",
                    schoolAndProfessionList:teacherObj.schoolAndProfessionList||[],
                    abroadExp : teacherObj.abroadExperience||"",
                    teachExp : teacherObj.teachingExperience||"",
                    otherExp : teacherObj.englishExperience||"",
                    abroadCountry:teacherObj.abroadCountry||"",
                    abroadStartTime : teacherObj.abroadStartTime||"",
                    abroadEndTime : teacherObj.abroadEndTime||""
                }
            });
            $(".pri-tm-detail").modal();
        });
    },
    _interviewScore : function(id){
        this.setState({teacherId:id});
        let curObj = findElementByTeacherId(id,this.state.tableContent);
        console.log(curObj);
        if(curObj){
            let map = curObj.interviewScoresMap;
            if(map){
                this.setState({
                    defaultInterviewScore : {
                        "appearance" : map.appearance,
                        "voice" : map.pronunciation,
                        "accurate" : map.accuracy,
                        "interest" : map.logic,
                        "present" : map.expression
                    }
                });
            }
        }
        $('.pri-tm-interview').modal();
    },
    _lectureScore : function(id){
        this.setState({teacherId:id});
        let curObj = findElementByTeacherId(id,this.state.tableContent);
        console.log(curObj);
        if(curObj){
            let map = curObj.trialScoresMap;
            console.log(map);
            if(map){
                this.setState({
                    defaultLectureScore : {
                        "control" : map.control,
                        "language" : map.languageManagement,
                        "logic" : map.logicTree,
                        "word" : map.spokenLevel,
                        "question" : map.openQuestion,
                        "func" : map.function
                    }
                });
            }
        }
        $('.pri-tm-lecture').modal();
    },
    _callFreeze : function(){
        let arr = this.refs.table.state.choiceArr;
        if(arr.length==0){
            alert("未选择要冻结的老师")
            return;
        }
        $(".pri-freeze").modal();
    },
    _doFreeze : function(){
        let arr = this.refs.table.state.choiceArr;
        Post({
            url : this.state.url+"/web/teacher/batchIsActive"+"?token="+store.get("accessToken"),
            data : {
                teacherIds : arr,
                stateValue:0
            }
        }).then((p)=>{
            console.log("success");
            this._refreshTable();
        },()=>{});
    },
    _callActivity : function(){
        let arr = this.refs.table.state.choiceArr;
        if(arr.length==0){
            alert("未选择要冻结的老师")
            return;
        }
        $(".pri-active").modal();
    },
    _doActivity : function(){
        let arr = this.refs.table.state.choiceArr;
        Post({
            url : this.state.url+"/web/teacher/batchIsActive"+"?token="+store.get("accessToken"),
            data : {
                teacherIds : arr,
                stateValue:1
            }
        }).then((p)=>{
            console.log("success");
            this._refreshTable();
        },()=>{});
    },
    _batchChanged : function(batchArr){
        this.setState({
            choiceArr : batchArr
        });
    },
    _batchOption : function(e,fn){
        let arr = this.state.choiceArr;
        fn(arr);
    },
    _search : function(page,showTip){
        let timeObj = this.refs.pri_baseQuery.getTime();
        let filterData = {
            "teacherId":this.refs.pri_baseQuery.state.teacherId.trim(),
            "name" : this.refs.pri_baseQuery.state.teacherName.trim(),
            "telephone" : this.refs.pri_baseQuery.state.tel.trim(),
            "province" : this.refs.pri_baseQuery.state.province,
            "city" : this.refs.pri_baseQuery.state.city,
            "county" : this.refs.pri_baseQuery.state.district,
            "createTimeStart" : timeObj.startTime,
            "createTimeEnd" : timeObj.endTime,
            "isActive" : this.refs.pri_accountState.state.selectContent,
            "markScoreStart":this.refs.pri_lowMarkGrade.value.trim(),
            "markScoreEnd":this.refs.pri_highMarkGrade.value.trim(),
            "interviewScoreStart":this.refs.pri_lowInterviewGrade.value.trim(),
            "interviewScoreEnd":this.refs.pri_highInterviewGrade.value.trim(),
            "trialScoreStart" : this.refs.pri_lowLectureGrade.value.trim(),
            "trialScoreEnd" : this.refs.pri_highLectureGrade.value.trim()
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
        console.log(page);
        let url = this.state.url+urlConfig.teacherList
        let filterData = {
            "stateStep" : 4,
            "isPublicSchool":0,
            "page" : page-1,
            "token" : store.get("accessToken")
        };
        filterData = passData?Object.assign(passData,filterData):filterData;
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
export default PriTM;