/**
 * Created by Tinna on 2015/05/08
 * cardCenter组件: 表示页面中除了左侧导航栏和上侧导航栏, 剩下的显示内容部分
 * */

import React from 'react'
import {Post,Get,transformArrayToObj} from '../../util/ajax.js';
import '../../less/page.less';

var PageList = React.createClass({
  render : function(){
    return (
          <div className="page center-block">
          <a className="icon item page-page page1" onClick={this.props.onPre}>
              <i className="glyphicon glyphicon-menu-left"></i>
          </a>
          <a className="item page-page page2" onClick={this.props.onFisrt}>首页</a>
          <a className="item page-page page3" >{this.props.curPage}/{this.props.totalPages}</a>
          <a className="item page-page page2" onClick={this.props.onLast}>尾页</a>
          <a className="icon item page-page page-page1 page1" onClick={this.props.onNext}>
              <i className="glyphicon glyphicon-menu-right"></i>
          </a>
          </div>
        );
  }
});

export default PageList;
