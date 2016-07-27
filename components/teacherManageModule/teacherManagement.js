
import React from 'react';


import ConfirmDialog from '../commons/confirmDialog';
import PubTM from './pubTeacherManagement';
import PriTM from './priTeacherManagement';


import '../../less/teacherManagement.less';


var TeacherManagement = React.createClass({
    getInitialState : function () {
        return {
            teachetList : []
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
        let freezeMessage = "确认冻结选中老师的账号?";
        let activeMessage = "确认激活选中老师的账号?";
        let callBack = {
            "callFreeze" : this._callFreezeDialog,
            "callActive" : this._callActiveDialog,
            "freezeAccount" : this._freezeAccount,
            "activeAccount" : this._activeAccount
        };
        return (
            <div className="teacherManagement">
                <ul className="nav-tabs" role="tablist">
                    <li role="presentation" className="active">
                        <a href="#public" aria-controls="public" role="tab" data-toggle="tab">公立/民办</a>
                    </li>
                    <li role="presentation">
                        <a href="#private" aria-controls="private" role="tab" data-toggle="tab">非公立/民办</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <PubTM callBack={callBack} />
                    <PriTM callBack={callBack} />
                </div>
            </div>
        );
    }
});



export default TeacherManagement;