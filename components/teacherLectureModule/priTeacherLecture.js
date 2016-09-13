/**
 * Created by duanfeng on 16/6/1.
 */
import React from 'react';

import BaseQuery from './../commons/baseQuery';
import SelectComponent from './../commons/selectComponent.js';
import Table from './../commons/table.js';
import ConfirmDialog from '../commons/confirmDialog';
import InPoolDialog from '../commons/inPoolModal'
import  Detail from './teacherLectureDetail';
import ArrDialog from './arrangeLectureTimeModal';
import ScoreDialog from './scoreLectureModal';
import {Get,Post} from '../../util/ajax';
import store from 'store';
import Page from '../commons/page';
import ModifyArrDialog from './modifyArrDialog';
import {findElementByTeacherId} from '../../util/formTest';

//获取一些数据
var tableConfig = require('../../conf/config.json');
var selectConfig = require('../../conf/selectConfig.json');
var urlConfig = require('../../conf/urlConfig.json');


var PriTL = React.createClass({
    getInitialState : function(){
        return{
            url:urlConfig.testUrl,
            tableContent : [],
            teacherAccounts:[],
            stuAccounts: [],
            lectureLessons : [],
            timesLots :[],
            defaultContent : {
                "teacherAccount":"",
                "stuAccount" : "",
                "lectureLesson" : "",
                "defaultRange" :"",
                "timeLot" : ""
            },
            modifyContent :{
                "teacherAccount":"",
                "stuAccount" : "",
                "lectureLesson" : "",
                "defaultRange" :"",
                "timeLot" : ""
            },
            defaultScore : {
                "control" : "",
                "language" : "",
                "logic" : "",
                "word" : "",
                "question" : "",
                "func" : ""
            },
            teacherId : "",
            curPage: 1,
            totalPages : 1
        }

    },
    componentWillMount : function(){
        this._getTrialTeacherList();
        this._getTrailStudentList();
        this._getDemoLessonList();
        this._getTimesLots();
    },
    componentDidMount : function(){
        this._refreshTable();
    },
    render : function(){
        let callBackFunc = {
            "showDetail" : this._showDetail,
            "showPass" :this._showPass,
            "inPool" : this._showInPool,
            "arrangeLecture" : this._arrangeLecture,
            "onBatchChanged" : this._batchChanged,
            "showScore" : this._showScore
        };
        let passMessage = "确认该老师通过面试?";
        let batchPassMessage = "确认选中老师通过面试?";
        return(
            <div role="tabpanel" className="tab-pane" id="private">
                <ArrDialog submitUrl={this.state.url} name="pri-tl-arr" callBack={this._refreshTable} tId={this.state.teacherId} tList={this.state.teacherAccounts} sList={this.state.stuAccounts} lLessons={this.state.lectureLessons} timeLots={this.state.timesLots} defaultContent={this.state.defaultContent}/>
                <ConfirmDialog content={{"message":passMessage,"name":"pri-Pass"}} callBack={this._doPass}/>
                <InPoolDialog modalName="pri-inPool" callBack={this._doInPool}/>
                <InPoolDialog modalName="pri-batchInPool" callBack={this._doBatchInPool}/>
                <ConfirmDialog content={{"message":batchPassMessage,"name":"pri-batchPass"}} />
                <Detail name="pri-tld" defaultContent={this.state.lectureDetail} />
                <ScoreDialog defaultContent={this.state.defaultScore} name="pri-tl-score" id={this.state.teacherId} url={this.state.url} refreshTable={this._refreshTable}/>
                <ModifyArrDialog submitUrl={this.state.url} name="pri-tl-mdf" callBack={this._refreshTable} tId={this.state.teacherId} tList={this.state.teacherAccounts} sList={this.state.stuAccounts} lLessons={this.state.lectureLessons} timeLots={this.state.timesLots} defaultContent={this.state.modifyContent}/>
                <div className="queryOption left-floated">
                    <div className="form row" >
                        <BaseQuery ref="pri_baseQuery"/>
                    </div>
                    <div className="form row" >
                        <div className="field" >
                            <div className="inline" >
                                <label>报名日期&nbsp;</label>
                                <input type="text" className="form-control" />
                                &nbsp;-&nbsp;
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="field" >
                            <div className="inline" >
                                <label>综合评分&nbsp;</label>
                                <input type="text" className="form-control" ref="pri_lowMarkGrade"/>
                                &nbsp;-&nbsp;
                                <input type="text" className="form-control" ref="pri_highMarkGrade"/>
                            </div>
                        </div>
                        <SelectComponent tip="预约状态" contentData={selectConfig.appointmentLectureState} ref="pri_appointState" />
                    </div>
                </div>
                <div className="queryBtn left-floated" >
                    <button className="btn btn-primary" style={{marginRight:'10px'}} onClick={(e)=>{this._search(1,true)}}>筛选</button>
                </div>

                <div className="main">
                    <div className="tableContainer" ref="tableContainer">
                        <div className="table-wrap">
                            <Table ref="table"  tableConfig={tableConfig.privateTeacherLectureTable} contentData={this.state.tableContent} callBack={callBackFunc}/>
                        </div>
                        <Page onPre={this._prePage} onFisrt={this._firstPage} curPage={this.state.curPage} totalPages={this.state.totalPages} onLast={this._lastPage} onNext={this._nextPage}/>
                        <div className="table-foot right-floated">
                            <button style={{display:"none"}} className="btn btn-default btn-sm" onClick={(e) =>{this._batchPass(e,this.props.callBack.batchPass)}}>批量通过</button>
                            <button className="btn btn-default btn-sm" onClick={(e) =>{this._batchPass(e,this.props.callBack.batchInPool)}}>批量入池</button>
                        </div>
                    </div>

                </div>
            </div>
        );
    },

    _showDetail : function(i){
        this.setState({
            teacherId : i
        });
        Get({
            url : this.state.url+"/web/common/triallecture/"+i,
            data : {
                token : store.get("accessToken")
            }
        }).then((p)=>{
            if(!p.data){
                this.setState({
                    modifyContent : {
                        "teacherAccount":"",
                        "stuAccount" : "",
                        "lectureLesson" : "",
                        "defaultRange" :"",
                        "timeLot" :""
                    }
                });
            }else{
                let info = p.data;
                let dateRange =info.startTime?info.startTime.substr(0,10):"";
                let startT = info.startTime?info.startTime.substr(11,8):"";
                let  endT = info.startTime?info.endTime.substr(11,8):"";
                let lc =info.courseId? info.courseId+"||"+info.courseName:"";
                let tl = info.timeSlotId?info.timeSlotId+"||"+startT+"||"+endT:"";
                let tempContent = {
                    "teacherAccount":info.teacherId||"",
                    "stuAccount" : info.studentId||"",
                    "lectureLesson" : lc,
                    "defaultRange" :dateRange,
                    "timeLot" :tl
                };
                this.setState({
                    modifyContent : tempContent
                });
            }
            $(".pri-tl-mdf").modal();
        },(p)=>{

        });
    },
    _showScore : function(id){
        this.setState({teacherId:id});
        let curObj =  findElementByTeacherId(id,this.state.tableContent);
        if(curObj){
            let map = curObj.trialScoresMap;
            if(map){
                this.setState({
                    defaultScore : {
                        "control" : map.control,
                        "language" : map.languageManagement,
                        "logic" : map.logicTree,
                        "word" : map.spokenLevel,
                        "question" : map.openQuestion,
                        "func" : map.function
                    }
                });
            }else{
                this.setState({
                    defaultScore : {
                        "control" : "",
                        "language" : "",
                        "logic" : "",
                        "word" : "",
                        "question" : "",
                        "func" : ""
                    }
                });
            }
        }
        $(".pri-tl-score").modal();
    },
    _showPass : function(i){
        this.setState({
            teacherId : i
        });
        $(".pri-Pass").modal();
    },
    _doPass : function(){
        let filterData = {
            "teacherId": this.state.teacherId,
            "stateStep":3
        };
        Post({
            url : this.state.url+"/web/teacher/updateStatePass"+"?token="+store.get("accessToken"),
            data : filterData
        }).then((p)=>{
            if(!p.data){
                alert(p.returnMsg);
            }
            this._refreshTable();
        },(p) =>{
            alert("该老师评分为空不能通过");
        });
    },
    _showInPool : function(i){
        this.setState({
            teacherId : i
        });
        $(".pri-inPool").modal();
    },
    _doInPool : function(reason){
        let filterData = {
            "teacherIds": [this.state.teacherId],
            "isInThePond":3,
            "noPassReason" : reason
        };
        Post({
            url : this.state.url+"/web/teacher/putPond"+"?token="+store.get("accessToken"),
            data : filterData
        }).then((p)=>{
            this._refreshTable();
        },(p) =>{
            alert("入池失败");
        });
    },
    _batchChanged : function(batchArr){
        this.setState({
            choiceArr : batchArr
        });
        console.log(this.state.choiceArr);
        console.log("over");
    },
    _batchPass : function(e,fn){
        let arr = this.state.choiceArr;
        console.log(arr);
        fn(arr);
    },
    _showBatchInPool : function(){
        $(".pri-batchPass").modal();
    },
    _doBatchInPool : function(reason){
        let arr = this.state.choiceArr;
        let filterData = {
            "teacherIds": arr,
            "isInThePond":3,
            "noPassReason" : reason
        };
        Post({
            url : this.state.url+"/web/teacher/putPond"+"?token="+store.get("accessToken"),
            data : filterData
        }).then((p)=>{
            this._refreshTable();
        },(p) =>{
            alert("入池失败");
        });
    },
    _arrangeLecture : function(e,id){
        this.setState({
            teacherId : id,
            defaultContent : {
                "teacherAccount":"",
                "stuAccount" : "",
                "lectureLesson" : "",
                "defaultRange" :"",
                "timeLot" :""
            }
        });
        $(".pri-tl-arr").modal();
    },
    _getTrialTeacherList : function(){
        Get({
            url:this.state.url+"/web/common/trialTeacherList/1",
            data : {
                token : store.get("accessToken")
            }
        }).then((p) =>{
            this.setState({
                teacherAccounts : p.data
            });
        });
    },
    _getTrailStudentList : function(){
        Get({
            url:this.state.url+"/web/common/trialStudentList/1",
            data : {
                token : store.get("accessToken")
            }
        }).then((p) =>{
            this.setState({
                stuAccounts : p.data
            });
        });
    },
    _getDemoLessonList : function(){
        Get({
            url:this.state.url+"/web/common/demoCourses/1",
            data : {
                token : store.get("accessToken")
            }
        }).then((p) =>{
            this.setState({
                lectureLessons : p.data
            });
        },(p)=>{
            alert("获取Demo课失败");
        });
    },
    _getTimesLots : function(){
        Get({
            url:this.state.url+"/timeslot/list/0",
            data: {
                token : store.get("accessToken")
            }
        }).then((p) =>{
            this.setState({
                timesLots : p.data
            });
        },(p)=>{
            alert("获取时间片失败");
        });
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
            "markScoreStart":this.refs.pri_lowMarkGrade.value.trim(),
            "markScoreEnd":this.refs.pri_highMarkGrade.value.trim(),
            "isTrial" : this.refs.pri_appointState.state.selectContent
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
            "stateStep" : 2,
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
            console.log("p.data.content");
            console.log(p.data.content);
            let arr = p.data.content.map( (v,i)=>{
                console.log(v.triallectureStartTime);
                if(v.triallectureStartTime&&v.triallectureEndTime){
                    v["triallectureStartTime"] = v.triallectureStartTime+"-"+v.triallectureEndTime;
                }else{
                    v["triallectureStartTime"] = "";
                }
                return v;
            });
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

export default PriTL;