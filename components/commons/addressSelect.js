/**
 * Created by duanfeng on 16/6/14.
 */


//引入插件
import React from 'react';

var SelectComponent = React.createClass({

    getInitialState : function(){
        return{
            selectContent : ""
        }
    },
    render : function(){

        /*let name = this.props.contentData.name;*/
        let arr = this.props.contentData.arr;
        let otherName = this.props.contentData.otherName;
        let tip = this.props.tip;
        arr = arr.map( (v,i) => {
            return (
                <option value={v.name}>{v.name}</option>
            );
        });
        return(
            <div className="field">
                <select className="form-control" ref={otherName} onChange={this._changeContent} defaultValue={""} style={{maxWidth:"170px",minWidth:"80px"}}>
                    <option value="" disabled>{tip}</option>
                    {arr}
                </select>
            </div>
        );

    },
    _changeContent : function(){
        this.setState({
            selectContent : this.refs[this.props.contentData.otherName].value
        });
        if(this.props.callParent){
            this.props.callParent(this.refs[this.props.contentData.otherName].value);
        }
    }
});

export default SelectComponent;