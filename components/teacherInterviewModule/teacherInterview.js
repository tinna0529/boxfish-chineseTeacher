
import React from 'react';

import ScoreModal from './scoreModal.js'
import ConfirmDialog from  '../commons/confirmDialog.js'
import InPoolDialog from '../commons/inPoolModal';
import PubTI from './pubTeacherInterview';
import PriTI from './priTeacherInterview';

import '../../less/teacherTraining.less';



var TeacherTraining = React.createClass({
    getInitialState : function () {
        return {
            teacherList : []
        };
    },
    componentDidMount : function () {
        //初始化表格排序控件
        $(this.refs.table).tablesort();

        //初始化表格的日期选择控件
        $('#datePicker').daterangepicker();
    },
    componentDidUpdate : function () {
        //初始化表格的滚动条
        $(this.refs.table).mCustomScrollbar({
            axis: "x",
            theme: "inset-3",
            scrollInertia : 1,
            mouseWheel : { enable : false }
        });
    },
    render : function () {
        let passMessage = "确认该老师通过面试?";
        let batchPassMessage = "确认选中老师通过面试?";
        let callBackFunc = {
            "batchPass" : this._doBatchPass,
            "batchInPool" : this._doBatchInPool
        };
        return (
            <div className="teacherTraining">
                <ul className="nav-tabs" role="tablist">
                    <li role="presentation" className="active">
                        <a href="#public" aria-controls="public" role="tab" data-toggle="tab">公立/民办</a>
                    </li>
                    <li role="presentation">
                        <a href="#private" aria-controls="private" role="tab" data-toggle="tab">非公立/民办</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <PubTI callBack={callBackFunc}/>
                    <PriTI callBack={callBackFunc}/>
                    <ConfirmDialog content={{"message":passMessage,"name":"pass"}} />
                    <ConfirmDialog content={{"message":batchPassMessage,"name":"batchPass"}} />
                    <InPoolDialog modalName="inPool"/>
                    <InPoolDialog modalName="batchInPool"/>
                </div>
            </div>
        );
    },
    _doBatchPass: function(){
        $(".batchPass").modal();
    },
    _doBatchInPool: function(){
        $(".batchInPool").modal();
    }

});


export default TeacherTraining;