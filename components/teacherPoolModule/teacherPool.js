
import React from 'react';

import ConfirmDialog from '../commons/confirmDialog';
import Detail from './pubTeacherPoolDetail';
import PriTP from './priTeacherPool';
import PubTP from './pubTeacherPool';

import '../../less/teacherPool.less';

var ConfigData = require('../../conf/config.json');


var TeacherPool = React.createClass({

    componentDidMount : function () {
        //初始化表格排序控件
        $(this.refs.table).tablesort();

        //初始化表格的日期选择控件
        $('#datePicker').daterangepicker();
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
        return (
            <div className="teacherPool">
                <ul className="nav-tabs" role="tablist">
                    <li role="presentation" className="active">
                        <a href="#public" aria-controls="public" role="tab" data-toggle="tab">公立/民办</a>
                    </li>
                    <li role="presentation">
                        <a href="#private" aria-controls="private" role="tab" data-toggle="tab">非公立/民办</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <PubTP />
                    <PriTP />
                </div>
            </div>
        );
    }
});

export default TeacherPool;