/**
 * Created by Tinna on 2016/05/08
 * 内容: index页面的路由机制, 即侧边导航栏的导航地址.
 * */

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory,hashHistory,IndexRoute} from 'react-router';

import app from './components/app.js';
import teacherManagement from './components/teacherManageModule/teacherManagement.js';
import teacherCheck from './components/teacherCheckModule/teacherCheck.js';
import teacherInterview from './components/teacherInterviewModule/teacherInterview.js';
import teacherLecture from './components/teacherLectureModule/teacherLecture.js';
import teacherPool from './components/teacherPoolModule/teacherPool.js';
import login from './components/loginPage.js';

import './less/index.less';

ReactDOM.render(
    <Router history = {hashHistory}>
        <Route path="/">
            <IndexRoute component={login} />
            <Route path = "login" component={login} />
            <Route path = "management" component={app} >
                <IndexRoute component={teacherManagement} />
                <Route path = "/teacherManagement" component={teacherManagement} />
                <Route path = "/teacherCheck" component={teacherCheck} />
                <Route path = "/teacherInterview" component={teacherInterview} />
                <Route path = "/teacherLecture" component={teacherLecture} />
                <Route path = "/teacherPool" component={teacherPool} />
            </Route>
        </Route>
    </Router>,
    document.getElementById('app')
);