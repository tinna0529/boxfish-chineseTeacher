/**
 * Created by duanfeng on 16/6/1.
 */
import React from 'react';

import PubTeacherDetail from './pubTeacherManagementDetail';
import BaseQuery from './../commons/baseQuery';
import SelectComponent from '../commons/selectComponent.js';
import Table from './../commons/table.js';
import ConfirmDialog from '../commons/confirmDialog';
import Page from '../commons/page';
import {Get,Post} from '../../util/ajax';
import PubInterviewScore from './interviewScore';
import PubLectureScore from './lectureScore';
import {findElementByTeacherId} from '../../util/formTest';

//获取一些数据
var tableConfig = require('../../conf/config.json');
var selectConfig = require('../../conf/selectConfig.json');
var urlConfig = require('../../conf/urlConfig.json');

//师资管理 公立页面
var PubTM = React.createClass({

    getInitialState : function(){
        return{
            url:urlConfig.testUrl,
            tableContent : [],
            curPage : 1,
            totalPages : 1,
            imgSrc : "",
            initImgSrc :"../../images/demo/initialImg.png",
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
            }
        }
    },
    /**
     * 进入页面的时候向后台请求获取数据(无条件)
     */
    componentDidMount : function(){
        this._refreshTable();
    },
    /**
     * 主要的渲染方法
     * @returns {XML}
     */
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
                        <SelectComponent tip="账号状态" contentData={selectConfig.accountType} ref="pub_accountState"/>
                        <div className="field" >
                            <label>综合评分:&nbsp;</label>
                            <div className="inline" >
                                <input type="text" className="form-control" ref="pub_lowMarkGrade"/>
                                &nbsp;-&nbsp;
                                <input type="text" className="form-control" ref="pub_highMarkGrade"/>
                            </div>
                        </div>
                        <div className="field" >
                            <label>试讲评分:&nbsp;</label>
                            <div className="inline" >
                                <input type="text" className="form-control" ref="pub_lowLectureGrade"/>
                                &nbsp;-&nbsp;
                                <input type="text" className="form-control" ref="pub_highLectureGrade"/>
                            </div>
                        </div>
                    </div>
                    <div className="form row" >
                        <div className="field" >
                            <label>面试评分:&nbsp;</label>
                            <div className="inline" >
                                <input type="text" className="form-control" ref="pub_lowInterviewGrade"/>
                                &nbsp;-&nbsp;
                                <input type="text" className="form-control" ref="pub_highInterviewGrade"/>
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
                            <Table ref="table" tableConfig={tableConfig.publicTeacherManagementTable} contentData={this.state.tableContent} callBack={callBackFunc}/>
                        </div>
                        <Page onPre={this._prePage} onFisrt={this._firstPage} curPage={this.state.curPage} totalPages={this.state.totalPages} onLast={this._lastPage} onNext={this._nextPage}/>
                    </div>
                    <PubTeacherDetail imgSrc={this.state.imgSrc} />
                    <PubInterviewScore defaultContent={this.state.defaultInterviewScore} name="pub-tm-interview" url={this.state.url} id={this.state.teacherId} refreshTable={this._refreshTable}/>
                    <PubLectureScore defaultContent={this.state.defaultLectureScore} name="pub-tm-lecture"  url={this.state.url} id={this.state.teacherId} refreshTable={this._refreshTable}/>
                    <ConfirmDialog content={{"message":freezeMessage,"name":"pub-freeze"}} ref="pub-freeze" callBack={this._doFreeze}/>
                    <ConfirmDialog content={{"message":activeMessage,"name":"pub-active"}} ref="pub-active" callBack={this._doActivity}/>
                </div>
            </div>
        );
    },
    /**
     * 点击详情的时候获取该行teacherId,并且向后台发送请求获取详细信息(教师资格证src)
     * @param id teacherId
     * @private
     */
    _showDetail : function(id){
        this.setState({teacherId:id});
        Get({
            url:this.state.url+"/web/teacher/teacherAllView/"+id
        }).then((p)=> {
            if (!p.data) {
                alert("该教师信息尚不完善!");
                return;
            }
            console.log(p.data);
            let teacherObj = p.data;
            this.setState({
                imgSrc : teacherObj.teacherCertification||""
            });
        });
        $(".pub-tm-detail").modal();
    },
    /**
     * 面试评分,不发送ajax请求,通过findElementByTeacherId方法回显,如果已经有评分,获取相应评分,并显示;没有评分(一般不会),直接弹出modal框
     * @param id  对应的teacherId
     * @private
     */
    _interviewScore : function(id){
        this.setState({teacherId:id});
        let curObj = findElementByTeacherId(id,this.state.tableContent);
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
        $('.pub-tm-interview').modal();
    },
    /**
     * 试讲评分,不发送ajax请求,通过findElementByTeacherId方法回显,如果已经有评分,获取相应评分,并显示;没有评分(一般不会),直接弹出modal框
     * @param id  对应的teacherId
     * @private
     */
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
        $('.pub-tm-lecture').modal();
    },
    /**
     * 点击 冻结 按钮的时候触发该方法,判断那些checkbox被选中,如果没有的话,会提示未选择要冻结的老师;选择的话,会弹出确认框
     * @private
     */
    _callFreeze : function(){
        let arr = this.refs.table.state.choiceArr;
        if(arr.length==0){
            alert("未选择要冻结的老师")
            return;
        }
        $(".pub-freeze").modal();
    },
    /**
     * 执行冻结操作,点击确认冻结以后,执行该方法,并刷新列表
     * @private
     */
    _doFreeze : function(){
        let arr = this.refs.table.state.choiceArr;
        Post({
            url : this.state.url+"/web/teacher/batchIsActive",
            data : {
                teacherIds : arr,
                stateValue:0
            }
        }).then((p)=>{
            console.log("success");
            this._refreshTable();
        },()=>{});
    },
    /**
     * 点击 激活 按钮的时候触发该方法,判断那些checkbox被选中,如果没有的话,会提示未选择要解冻的老师;选择的话,会弹出确认框
     * @private
     */
    _callActivity : function(){
        let arr = this.refs.table.state.choiceArr;
        if(arr.length==0){
            alert("未选择要解冻的老师")
            return;
        }
        $(".pub-active").modal();
    },
    /**
     * 执行解冻操作,点击确认解冻以后,执行该方法,并刷新列表
     * @private
     */
    _doActivity : function(){
        let arr = this.refs.table.state.choiceArr;
        Post({
            url : this.state.url+"/web/teacher/batchIsActive",
            data : {
                teacherIds : arr,
                stateValue:1
            }
        }).then((p)=>{
            console.log("success");
            this._refreshTable();
        },()=>{});
    },
    /**
     * 当有checkbox状态发生变化的时候会触发这个方法,更新被选中数据数组
     * @param batchArr
     * @private
     */
    _batchChanged : function(batchArr){
        this.setState({
            choiceArr : batchArr
        });
        console.log(this.state.choiceArr);
        console.log("over");
    },
    _batchOption : function(e,fn){
        let arr = this.state.choiceArr;
        console.log(arr);
        fn(arr);
    },
    /**
     * 条件筛选,主要是收集条件,没有填写的条件默认为全部,带有去空机制,最终调用的是getPage方法去获取数据.
     * @param page 页码 例如 1 代表第一页显示
     * @param showTip boolean值,当筛选获得的数据为空时是否给出弹框提示
     * @private
     */
    _search : function(page,showTip){
        let timeObj = this.refs.pub_baseQuery.getTime();
        console.log(this.refs.pub_accountState);
        let filterData = {
            "name" : this.refs.pub_baseQuery.state.teacherName,
            "telephone" : this.refs.pub_baseQuery.state.tel,
            "province" : this.refs.pub_baseQuery.state.province,
            "city" : this.refs.pub_baseQuery.state.city,
            "county" : this.refs.pub_baseQuery.state.district,
            "createTimeStart" : timeObj.startTime,
            "createTimeEnd" : timeObj.endTime,
            "school" : this.refs.pub_school.value,
            "teacherId":this.refs.pub_baseQuery.state.teacherId,
            "teachingAge" : this.refs.pub_teachingAge.state.selectContent,
            "isActive" : this.refs.pub_accountState.state.selectContent,
            "markScoreStart":this.refs.pub_lowMarkGrade.value,
            "markScoreEnd":this.refs.pub_highMarkGrade.value,
            "interviewScoreStart":this.refs.pub_lowInterviewGrade.value,
            "interviewScoreEnd":this.refs.pub_highInterviewGrade.value,
            "trialScoreStart" : this.refs.pub_lowLectureGrade.value,
            "trialScoreEnd" : this.refs.pub_highLectureGrade.value
        };
        for(var pro in filterData){
            if(typeof (filterData[pro])!="number"&&filterData[pro]==""){
                delete filterData[pro];
            }
            if(typeof (filterData[pro])=="number"&&filterData[pro]==""){

            }
        }
        this._getPage(page,filterData,showTip);
    },
    /**
     * 刷新列表,在很多操作后边会调用这个方法,他会调用search方法,他传递的page参数是当前页面的值
     * @private
     */
    _refreshTable : function(){
        this._search(this.state.curPage);
    },
    /**
     * 向后台发送ajax请求获取表格里的数据,接受三个参数
     * @param page 页码数,也就是第几页
     * @param passData 筛选条件,可以为空对象
     * @param showTip 得到的数据为空时是否弹框提示
     * @private
     */
    _getPage : function (page,passData,showTip) {
        let url = this.state.url+urlConfig.teacherList
        let filterData = {
            "stateStep" : 4,
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
    /**
     * 分页方法之上一页
     * @private
     */
    _prePage : function () {
        if(this.state.curPage == 1)
            return;
        this._search(this.state.curPage - 1);
    },
    /**
     * 分页方法之首页
     * @private
     */
    _firstPage : function () {
        if(this.state.curPage == 1)
            return;
        this._search(1);
    },
    /**
     * 分页方法之尾页
     * @private
     */
    _lastPage : function () {
        if(this.state.curPage == this.state.totalPages)
            return;
        this._search(this.state.totalPages);
    },
    /**
     * 分页方法之下一页
     * @private
     */
    _nextPage : function () {
        if(this.state.curPage == this.state.totalPages)
            return;
        this._search(this.state.curPage + 1);
    }

});
export default PubTM;