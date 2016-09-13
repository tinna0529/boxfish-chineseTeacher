/**
 * Created by duanfeng on 16/6/1.
 */
import React from 'react';

import BaseQuery from '../commons/baseQuery';
import SelectComponent from '../commons/selectComponent.js';
import Table from '../commons/table.js';
import DateRangePicker from '../commons/dateRangePicker';
import Page from '../commons/page';
import {Get,Post} from '../../util/ajax';
import store from 'store';
import ConfirmDialog from '../commons/confirmDialog';
import ScoreModal from './scoreModal';
import InPoolDialog from '../commons/inPoolModal'
import {findElementByTeacherId} from '../../util/formTest';

//获取一些数据
var tableConfig = require('../../conf/config.json');
var selectConfig = require('../../conf/selectConfig.json');
var urlConfig = require('../../conf/urlConfig.json');


var PriTI = React.createClass({

    getInitialState : function(){
        return{
            url:urlConfig.testUrl,
            tableContent:[],
            totalPages : 1,
            curPage : 1,
            interviewTimeStart : "",
            interviewTimeEnd : "",
            curInterviewTime : "",
            defaultScore : {
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
    render : function() {

        let callBackFunc = {
            "showScore":this._showScore,
            "onBatchChanged" : this._batchChanged,
            "showPass" : this._showPass,
            "inPool" : this._showInPool,
            "setInterviewTime" : this._setInterviewTime
        };
        let passMessage = "确认该老师通过面试?";
        return (
            <div role="tabpanel" className="tab-pane" id="private">
                <div className="queryOption left-floated">
                    <div className="form row">
                        <BaseQuery ref="pri_baseQuery"/>
                    </div>
                    <div className="form row">
                        <div className="field" >
                            <label>综合评分&nbsp;:&nbsp;</label>
                            <div className="inline" >
                                <input type="text" className="form-control" ref="pri_lowMarkScore"/>
                                &nbsp;-&nbsp;
                                <input type="text" className="form-control" ref="pri_highMarkScore"/>
                            </div>
                        </div>
                        <div className="field" >
                            <DateRangePicker ref="pri_interviewTime" name="面试时间" isMinute={true}/>
                        </div>
                        <SelectComponent tip="预约状态" contentData={selectConfig.appointmentInterviewState} ref="pri_appointState"/>
                    </div>
                </div>
                <div className="queryBtn left-floated">
                    <button className="btn btn-primary" style={{marginRight:'10px'}} onClick={(e)=>{this._search(1,true)}}>筛选</button>
                </div>

                <div className="main">
                    <div className="tableContainer" ref="tableContainer">
                        <div className="table-wrap pri-wrap">
                            <Table ref="table" tableConfig={tableConfig.privateTeacherInterviewTable} contentData={this.state.tableContent} callBack={callBackFunc}/>
                        </div>
                        <Page onPre={this._prePage} onFisrt={this._firstPage} curPage={this.state.curPage} totalPages={this.state.totalPages} onLast={this._lastPage} onNext={this._nextPage}/>
                        <div className="table-foot right-floated">
                            <button className="btn btn-default btn-sm" style={{display:"none"}}>批量通过</button>
                            <button className="btn btn-default btn-sm" onClick={this._showBatchInPool}>批量入池</button>
                        </div>
                    </div>
                </div>
                <ConfirmDialog content={{"message":passMessage,"name":"pri-pass"}} callBack={this._doPass}/>
                <ScoreModal defaultContent={this.state.defaultScore} name="pri-score" url={this.state.url} id={this.state.teacherId} refreshTable={this._refreshTable}/>
                <InPoolDialog modalName="pri-inPool" callBack={this._doInPool}/>
                <InPoolDialog modalName="pri-batchInPool" callBack={this._doBatchInPool}/>
            </div>
        );
    },
    _showScore : function(id){
        this.setState({
            teacherId : id
        });
        let curObj =  findElementByTeacherId(id,this.state.tableContent);
        if(curObj){
            let map = curObj.interviewScoresMap;
            if(map){
                this.setState({
                    defaultScore : {
                        "appearance" : map.appearance,
                        "voice" : map.pronunciation,
                        "accurate" : map.accuracy,
                        "interest" : map.logic,
                        "present" : map.expression
                    }
                });
            }else{
                this.setState({
                    defaultScore : {
                        "appearance" : "",
                        "voice" : "",
                        "accurate" : "",
                        "interest" : "",
                        "present" : ""
                    }
                });
            }
        }
        $(".pri-score").modal();
    },
    _showPass : function(id){
        this.setState({teacherId:id});
        $(".pri-pass").modal();
    },
    _doPass : function(){
        Post({
            url : this.state.url+"/web/teacher/updateStatePass"+"?token="+store.get("accessToken"),
            data : {
                "teacherId": this.state.teacherId,
                "stateStep":2
            }
        }).then((p)=>{
            if(!p.data){
                alert(p.returnMsg);
            }
            this._refreshTable();
        },(err)=>{
            console.log(err);
            alert(p.responseJSON.message);
        });
    },
    _showInPool : function(id){
        this.setState({teacherId:id});
        $(".pri-inPool").modal();
    },
    _doInPool : function(reason){
        Post({
            url : this.state.url+"/web/teacher/putPond"+"?token="+store.get("accessToken"),
            data : {
                "teacherIds" : [this.state.teacherId],
                "isInThePond" : 1,
                "noPassReason":reason
            }
        }).then((p)=>{
            this._refreshTable();
        },()=>{});
        console.log(this.state.teacherId);
    },
    _showBatchInPool : function(){
        let arr = this.refs.table.state.choiceArr;
        if(arr.length==0){
            alert("未选择要入池的老师")
            return;
        }
        $('.pri-batchInPool').modal();
    },
    _doBatchInPool : function(reason){
        let arr = this.refs.table.state.choiceArr;
        Post({
            url : this.state.url+"/web/teacher/putPond"+"?token="+store.get("accessToken"),
            data : {
                "teacherIds" : arr,
                "isInThePond" : 1,
                "noPassReason":reason
            }
        }).then((p)=>{
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
        console.log(arr);
        fn(arr);
    },
    _filterInterviewTime : function(start,end){
        let startTime = start.substr(0,10)+" "+start.substr(11,5);
        let endTime = end.substr(0,10)+" "+end.substr(11,5);
        this.setState({
            interviewTimeStart : startTime,
            interviewTimeEnd : endTime
        });
    },
    _setInterviewTime : function(id){
        let interviewTime = this.refs.table.getInterviewTime("dp"+id);
        Post({
            url : this.state.url+"/web/teacher/updateDate"+"?token="+store.get("accessToken"),
            data : {
                "teacherId": id,
                "dateValue":interviewTime,
                "dateColumn":"1"
            }
        }).then((p)=>{
            console.log("success");
        },()=>{});
    },
    _search : function(page,showTip){
        let timeObj = this.refs.pri_baseQuery.getTime();
        let iTime = this.refs.pri_interviewTime.getTime();
        let filterData = {
            "teacherId":this.refs.pri_baseQuery.state.teacherId.trim(),
            "name" : this.refs.pri_baseQuery.state.teacherName.trim(),
            "telephone" : this.refs.pri_baseQuery.state.tel.trim(),
            "province" : this.refs.pri_baseQuery.state.province,
            "city" : this.refs.pri_baseQuery.state.city,
            "county" : this.refs.pri_baseQuery.state.district,
            "createTimeStart" : timeObj.startTime,
            "createTimeEnd" : timeObj.endTime,
            "markScoreStart":this.refs.pri_lowMarkScore.value.trim(),
            "markScoreEnd":this.refs.pri_highMarkScore.value.trim(),
            "interviewTimeStart":iTime.startTime,
            "interviewTimeEnd":iTime.endTime,
            "isHasInterviewTime":this.refs.pri_appointState.state.selectContent
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
            "stateStep" : 1,
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

export default PriTI;