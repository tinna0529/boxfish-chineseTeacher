/**
 * Created by duanfeng on 16/6/1.
 */
import React from 'react';

import BaseQuery from './../commons/baseQuery';
import SelectComponent from './../commons/selectComponent.js';
import Table from './../commons/table.js';
import Detail from './pubTeacherCheckDetail';
import Page from '../commons/page';
import {Get} from '../../util/ajax';


//获取一些数据
var tableConfig = require('../../conf/config.json');
var selectConfig = require('../../conf/selectConfig.json');
var urlConfig = require('../../conf/urlConfig.json');

var PubTC = React.createClass({
    getInitialState : function(){
        return{
            choiceArr:[],
            url:urlConfig.testUrl,
            tableContent : [],
            teacherId : "",
            certifSrc : "",
            curPage: 1,
            totalPages : 1,
            initImgSrc :"../../images/demo/initialImg.png"
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
            <div role="tabpanel" className="tab-pane active" id="public">
                <div className="queryOption left-floated">
                    <div className="form row" >
                        <BaseQuery ref="pub_baseQuery"/>
                    </div>
                    <div className="form row" >
                        <div className="field">
                            <input type="text" className="form-control" ref="pub_school" placeholder="请填写学校"/>
                        </div>
                        <SelectComponent tip="教龄" contentData={selectConfig.teachingAge} ref="pub_teachingAge"/>
                    </div>
                </div>
                <div className="queryBtn left-floated" >
                    <button className="btn btn-primary" style={{marginRight:'10px'}} onClick={(e)=>{this._search(1,true)}}>筛选</button>
                </div>

                <div className="main">
                    <div className="tableContainer left-floated" ref="tableContainer">
                        <div className="table-wrap">
                            <Table ref="table" tableConfig={tableConfig.publicTeacherCheckTable} contentData={this.state.tableContent} callBack={callBackFunc} />
                        </div>
                        <Page onPre={this._prePage} onFisrt={this._firstPage} curPage={this.state.curPage} totalPages={this.state.totalPages} onLast={this._lastPage} onNext={this._nextPage}/>
                        <div className="table-foot">
                            <button style={{display:"none"}} className="btn btn-default btn-sm" onClick={(e) =>{this._batchOption(e,this.props.callBack.showPass)}}>批量通过</button>
                        </div>
                    </div>
                </div>
                <Detail imgSrc={this.state.certifSrc} teacherId={this.state.teacherId} callFresh={this._refreshTable} url={this.state.url}/>
            </div>
        );
    },
    _showDetail : function(i){
        this.setState({
            teacherId : i
        });
        Get({
            url:this.state.url+"/web/teacher/teacherAllView/"+i
        }).then((p)=>{
            if(!p.data){
                alert("该教师信息尚不完善!");
                this.setState({
                    certifSrc : this.state.initImgSrc
                });
            }else{
                this.setState({
                    certifSrc : p.data.teacherCertification
                });
            }

        },(p)=>{
                if(p.status==500){
                    alert(p.responseJSON.message);
                }
            });
        $(".pub-tc-detail").modal();
    },
    _batchChanged : function(batchArr){
        console.log(batchArr);
        this.setState({
            choiceArr : batchArr
        });
        console.log(this.state);
        console.log("over");
    },
    _batchOption : function(e,fn){
        let arr = this.state.choiceArr;
        console.log(arr);
        fn(arr);
    },
    _search : function(page,showTip){
        let timeObj =  this.refs.pub_baseQuery.getTime();
        let filterData = {
            "name" : this.refs.pub_baseQuery.state.teacherName.trim(),
            "telephone" : this.refs.pub_baseQuery.state.tel.trim(),
            "province" : this.refs.pub_baseQuery.state.province,
            "city" : this.refs.pub_baseQuery.state.city,
            "county" : this.refs.pub_baseQuery.state.district,
            "school" : this.refs.pub_school.value.trim(),
            "teachingAge" : this.refs.pub_teachingAge.state.selectContent,
            "teacherId" : this.refs.pub_baseQuery.state.teacherId.trim(),
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
        this._search(this.state.curPage);
    },
    _getPage : function (page,passData,showTip) {
        console.log(page);
        let url = this.state.url+urlConfig.teacherList
        let filterData = {
            "stateStep" : 0,
            "isPublicSchool":1,
            "page" : page-1
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

export default PubTC;
