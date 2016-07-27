//引入插件
import React from 'react';
import {Link} from 'react-router';

var SubNav = React.createClass({
    getInitialState : function () {
        return {
            content : this.props.childrenArr
        };
    },
    render : function () {
        let subMenu = this.state.content;
        let curPath = this.props.curPath;
        subMenu = subMenu.map((v,i) => {
            let linkClassName = (curPath==v.path||curPath=='')?'item active':'item';
            return (
                <li key={i}>
                    <Link className={linkClassName} to={'/'+v.path}>
                        <span className="indent2" ></span>
                        <i className={'glyphicon '+v.subMenuIcon}></i>&nbsp;{v.subMenuName}
                    </Link>
                </li>
            );
        });
        return (
            <ul className="submenu">
                {subMenu}
            </ul>
        );
    }
});

export default SubNav;