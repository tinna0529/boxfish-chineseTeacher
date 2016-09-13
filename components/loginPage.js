/**
 * Created by duanfeng on 16/6/21.
 */



//引入插件
import React from 'react';
import store from 'store';
import jsSHA from 'jssha';

//引入组件


//引入样式
import '../less/login.less';

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
        let sig = "TeacherManage" + username + password;
        var shaObj = new jsSHA("SHA-256", "TEXT");
        shaObj.update(sig);
        let signature = shaObj.getHash("HEX");

        let tempData = {
            "systemName" : "TeacherManage",
            "username" : username,
            "password" : password,
            "signature" : signature
        };
        $.ajax({
            type: "POST",
            url : 'http://114.55.140.96:6901/box/fish/login',
            data : tempData,
            success : (p)=>{
                if(p.code==2001){
                    alert(p.message);
                    return false;
                }
                let token = p.data.accessToken.accessToken;
                store.set("accessToken",token);
                this.context.router.push(indexPath);
            },
            error : (err)=>{
                console.log(err);
                this.context.router.push("/login");
                alert("用户名或者密码错误!");
            }
        });

    }
});

export default Login;