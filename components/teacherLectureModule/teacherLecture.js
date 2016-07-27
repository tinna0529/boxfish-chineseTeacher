
import React from 'react';

import ConfirmDialog from '../commons/confirmDialog';
import InPoolDialog from '../commons/inPoolModal'
import  Detail from './teacherLectureDetail';
import PubTL from './pubTeacherLecture';
import PriTL from './priTeacherLecture';

import '../../less/teacherPermission.less';



var TeacherPermission = React.createClass({
    getInitialState : function () {
        return {
            teacherList : []
        };
    },
    componentDidMount : function () {
        //初始化表格排序控件
        $(this.refs.table).tablesort();
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
            "doPass" : this._doPass,
            "doPool" : this._doBatchInPool
        };

        return (
            <div className="teacherPermission">
                <ul className="nav-tabs" role="tablist">
                    <li role="presentation" className="active">
                        <a href="#public" aria-controls="public" role="tab" data-toggle="tab">公立/民办</a>
                    </li>
                    <li role="presentation">
                        <a href="#private" aria-controls="private" role="tab" data-toggle="tab">非公立/民办</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <PubTL ref="pub_tl"/>
                    <PriTL ref="pri_tl"/>
                    <ConfirmDialog content={{"message":passMessage,"name":"pass"}} callBack={this._doPass}/>
                    <ConfirmDialog content={{"message":batchPassMessage,"name":"batchPass"}} />
                    <InPoolDialog modalName="inPool"/>
                    <InPoolDialog modalName="batchInPool"/>
                    <Detail />
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

export default TeacherPermission;