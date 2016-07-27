/**
 * Created by Tinna on 2016/05/08
 * app组件: 表示整个页面
 * */

//引入插件
import React from 'react';
import store from 'store';
import 'babel-polyfill';

//引入组件
import Nav from './commons/nav.js';
import Confirm from './commons/confirmDialog';

//引入样式
import '../less/app.less';
import '../less/main.less';

var App = React.createClass({

   contextTypes : {
       router : React.PropTypes.object
   },
    componentWillMount : function(){
        let t = store.get("accessToken");
        if(!t){
            alert("登陆信息过期,请重新登陆!");
            this.context.router.replace("/login");
        }
    },
    render : function () {
        let Children = this.props.children;
        let curPath = this.props.location.pathname.slice(1);
        let logoutMessage = "确认退出中教管理系统";
        return (
	        	<div>
                    <div id="left">
                        <div className="logo">
                            <img src="images/logo.jpg" style={{display:'inline-block'}}></img>
                            &nbsp;&nbsp;<span>中教管理</span>
                        </div>
                        <Nav curPath={curPath}/>
                    </div>
                    <div id="right">
                        <div className="right-top" style={{marginBottom : 0}}>
                            <div className="item">
                                <button className="btn" onClick={this._changeMenu}>
                                    <i className="glyphicon glyphicon-align-justify" ></i>
                                </button>
                                <button className="btn" onClick={this._showLogout} style={{float:"right",marginRight:"10px",marginTop:"14px"}}>
                                    <i className="glyphicon glyphicon-log-out" ></i>
                                </button>
                            </div>

                        </div>
                        <div className="ui divider"></div>
                        <div className="content">
                            {Children}
                        </div>
                        <Confirm content={{"message":logoutMessage,"name":"logout-confirm"}} callBack={this._doLogout}/>
                    </div>
                </div>
        );
    },

    _changeMenu : function (event) {
        let sub = $(".submenu");
        for(let i=0,len=sub.length;i<len;i++){
            if($(sub[i]).css("display")!="none"){
                $(sub[i]).prev().trigger("click");
            }
        }
        $("#left").toggleClass("slideNav_left");
        $("#right").toggleClass("slideNav_right");

    },
    _showLogout : function(){
        console.log("log out");
        $('.logout-confirm').modal();
    },
    _doLogout : function(){
        store.remove("accessToken");
        $('.logout-confirm').modal('hide');
        this.context.router.push('/login');
    }
    
});

export default App;
