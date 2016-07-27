
//引入插件
import React from 'react';
import {Link} from 'react-router';

//引入样式
import '../../less/nav.less';

//引入组件
import SubNav from './subNav.js';

//引入折叠菜单插件
import Accordion from '../../util/accordition.js';

//引入配置数据
var configData = require('../../conf/nav.json');


var Nav = React.createClass({
    getInitialState : function () {
        return {
            content : configData
        };
    },
    componentDidMount : function () {
        var accordion = new Accordion($('#accordion'), false);

    },
    render : function () {
        let menu = this.state.content;
        let curPath = this.props.curPath;
        menu = menu.map((v,i) => {
            let liClassName = (curPath == v.path)? "active":"";
            let linkClassName = (curPath==v.path||curPath=='')?'nav-link item active':'nav-link item';
            if(v.subMenus&&v.subMenus.length!=0){
                //let subMenuList = <subMenus curPath={v.path} childrenArr={v.subMenus}/>;
                return (
                    <li key={i} className={liClassName}>
                        <div className="link">
                            <i className={'glyphicon '+v.menuIcon}></i>
                            &nbsp;{v.menuName}
                            <i className="glyphicon glyphicon-triangle-right"></i>
                        </div>

                        <SubNav curPath={v.path} childrenArr={v.subMenus}/>
                    </li>
                );
            }else{
                return (

                        <li key={i} className={liClassName}>
                            <div className="link">
                                <Link className={linkClassName} to={'/'+v.path} >
                                    <i className={'glyphicon '+v.menuIcon}></i>
                                    &nbsp;{v.menuName}
                                </Link>
                            </div>
                        </li>


                );
            }
            
        });
        return (
            <ul id="accordion" className="accordion">
                {menu}
            </ul>
        );
    }
});

export default Nav;