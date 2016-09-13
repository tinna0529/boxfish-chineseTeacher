
import React from 'react';

import PubTC from './pubTeacherCheck';
import PriTC from './priTeacherCheck';
import ConfirmDialog from '../commons/confirmDialog';

import '../../less/teacherCheck.less';


var TeacherCheck = React.createClass({

    componentDidMount : function () {
        //初始化表格排序控件
        $(this.refs.table).tablesort();
    },
    componentDidUpdate : function () {
        //初始化表格的滚动条
        $(this.refs.tableContainer).mCustomScrollbar({
            axis: "x",
            theme: "inset-3",
            scrollInertia : 1,
            mouseWheel : { enable : false }
        });
    },

    render : function () {
        let callBackFunc = {
            "showPass" : this._showPass
        };
        let batchPassMessage = "确认通过选中教师?";
        return (
            <div className="teacherCheck">
                <ul className="nav-tabs" role="tablist">
                    <li role="presentation" className="active">
                        <a href="#public" aria-controls="public" role="tab" data-toggle="tab">公立/民办</a>
                    </li>
                    <li role="presentation">
                        <a href="#private" aria-controls="private" role="tab" data-toggle="tab">非公立/民办</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <PubTC callBack={callBackFunc}/>
                    <PriTC callBack={callBackFunc}/>
                    <ConfirmDialog content={{"message":batchPassMessage,"name":"batchPass"}} />
                </div>
            </div>
        );
    },
    _showPass : function(){
        $(".batchPass").modal();
    }
});

export default TeacherCheck;