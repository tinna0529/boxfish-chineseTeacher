/**
 * Created by duanfeng on 16/6/21.
 */



//引入插件
import React from 'react';
import store from 'store';
import {Post} from '../util/ajax';

//引入组件


//引入样式
import '../less/login.less';
var urlConfig = require('../conf/urlConfig.json');

var Login = React.createClass({
    render : function(){
        return(
            <div className="login center-block">
                <div className="forms center-block">
                    <div className="login-title">
                        <span>中教管理系统</span>
                    </div>
                    <input className="form-control" type="text" placeholder="请输入用户名" ref="username"/>
                    <input className="form-control" type="password" placeholder="请输入密码" ref="password"/>
                    <button className="btn form-control" onClick={(e)=>{this.handleSubmit(e)}}>登录</button>
                </div>
            </div>
        );
    },
    contextTypes: {
        router: React.PropTypes.object
    },

    handleSubmit(event) {
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        let indexPath = "/teacherManagement";
        if((!username&&typeof username !="number" )||(!password&&typeof password !="number")){
            alert("用户名或者密码不能为空");
            return false;
        }
        let tempData = {
            "loginType" : 1,
            "username" : username,
            "password" : password
        };
        Post({
            url : urlConfig.testUrl+"/web/common/adminLogin",
            data : tempData
        }).then((p)=>{
            if(p.returnCode==401){
                this.context.router.push("/login");
                alert(p.data);
                return false;
            }
            store.set("accessToken",p.data);
            this.context.router.push(indexPath);
        },(err)=>{
            console.log(err);
            this.context.router.push("/login");
            alert("用户名或者密码错误!");
        });

    }
});

export default Login;