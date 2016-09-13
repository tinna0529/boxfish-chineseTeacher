/**
 * Created by duanfeng on 16/6/1.
 */
import React from 'react';

import BaseQuery from './../commons/baseQuery';
import SelectComponent from './../commons/selectComponent.js';
import Table from './../commons/table.js';
import Page from '../commons/page';
import Detail from './priTeacherCheckDetail';
import {Get} from '../../util/ajax';
import store from 'store';

//获取一些数据
var tableConfig = require('../../conf/config.json');
var urlConfig = require('../../conf/urlConfig.json');

var PriTC = React.createClass({
    getInitialState : function(){
        return{
            url:urlConfig.testUrl,
            tableContent : [],
            teacherId : "",
            teacherObj : {
                education : "",
                engLevel : "",
                score:"",
                schoolAndProfessionList:[],
                abroadExp : "",
                teachExp : "",
                otherExp : "",
                abroadCountry:"",
                abroadStartTime : "",
                abroadEndTime : ""
            },
            curPage: 1,
            totalPages : 1
        }
    },
    componentDidMount : function(){
        this._refreshTable();
    },
    render : function(){
        let callBackFunc = {
            "showDetail" : this._showDetail,
            "onBatchChanged" : this._batchChanged
        };
        return(
            <div role="tabpanel" className="tab-pane" id="private">
                <div className="queryOption left-floated">
                    <div className="form row" >
                        <BaseQuery ref="pri_baseQuery" />
                    </div>
                    <div className="form row" >
                    </div>
                </div>
                <div className="queryBtn left-floated" >
                    <button className="btn btn-primary" style={{marginRight:'10px'}} onClick={(e)=>{this._search(1,true)}}>筛选</button>
                </div>

                <div className="main">
                    <div className="tableContainer left-floated" ref="tableContainer">
                        <div className="table-wrap">
                            <Table  tableConfig={tableConfig.privateTeacherCheckTable} contentData={this.state.tableContent} callBack={callBackFunc}/>
                        </div>
                        <Page onPre={this._prePage} onFisrt={this._firstPage} curPage={this.state.curPage} totalPages={this.state.totalPages} onLast={this._lastPage} onNext={this._nextPage}/>
                        <div className="table-foot">
                            <button style={{display:"none"}} className="btn btn-default btn-sm" onClick={(e) =>{this._batchOption(e,this.props.callBack.showPass)}}>批量通过</button>
                        </div>
                    </div>
                </div>
                <Detail defaultContent={this.state.teacherObj}  callFresh={this._refreshTable} url={this.state.url} id={this.state.teacherId}/>
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
                this.setState({
                    teacherObj : {
                        education : "",
                        engLevel : "",
                        score:"",
                        schoolAndProfessionList:[],
                        abroadExp : "",
                        teachExp : "",
                        otherExp : "",
                        abroadCountry:"",
                        abroadStartTime : "",
                        abroadEndTime : ""
                    }
                });
            }else{
                let teacherObj = p.data;
                this.setState({
                    teacherObj : {
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
            }
            $(".pri-tc-detail").modal();
        },(p)=>{
            if(p.status==500){
                alert(p.responseJSON.message);
            }
        });

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
    /**
     *
     * @param page
     * @param showTip
     * @private
     */
    _search : function(page,showTip){
        let timeObj =  this.refs.pri_baseQuery.getTime();
        let filterData = {
            "name" : this.refs.pri_baseQuery.state.teacherName.trim(),
            "telephone" : this.refs.pri_baseQuery.state.tel.trim(),
            "province" : this.refs.pri_baseQuery.state.province,
            "city" : this.refs.pri_baseQuery.state.city,
            "county" : this.refs.pri_baseQuery.state.district,
            "teacherId" : this.refs.pri_baseQuery.state.teacherId.trim(),
            "createTimeStart" : timeObj.startTime,
            "createTimeEnd" : timeObj.endTime
        };
        for(var pro in filterData){
            if(typeof (filterData[pro])!="number"&&filterData[pro]==""){
                delete filterData[pro];
            }
        }
        this._getPage(page,filterData,showTip);
    },
    _refreshTable : function(){
        this._getPage(this.state.curPage,{});
    },

    /**
     *
     * @param page
     * @param passData
     * @param showTip
     * @private
     */
    _getPage : function (page,passData,showTip) {
        let url = this.state.url+urlConfig.teacherList;
        let filterData = {
            "stateStep" : 0,
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
        console.log(this.state.curPage);
        if(this.state.curPage == this.state.totalPages)
            return;
        this._search(this.state.curPage + 1);
    }
});

export default PriTC;