
/**
 * Created by tinna on 16/5/19.
 */

//引入插件
import React from 'react';

var SelectComponent = React.createClass({

    getInitialState : function(){
        return{
            selectContent : "",
            defautSelect :""
        }
    },
    componentWillReceiveProps : function(nextProps){
        if(this.props.defaultSelect!=nextProps.defaultSelect){
            this.setState({
                selectContent : nextProps.defaultSelect
            });
        }
    },
    render : function(){

        /*let name = this.props.contentData.name;*/
        let arr = this.props.contentData.arr;
        let otherName = this.props.contentData.otherName;
        let tip = this.props.tip;
        arr = arr.map( (v,i) => {
            return (
                <option value={v.code}>{v.name}</option>
            );
        });
        return(
            <div className="field">
                <select className="form-control" ref={otherName} onChange={(e)=>{this._changeContent(e)}} value={this.state.selectContent||""} style={{maxWidth:"170px",minWidth:"80px"}} disabled={this.props.isReadOnly||false}>
                    <option value="" disabled>{tip}</option>
                    {arr}
                </select>
            </div>
        );

    },
    _changeContent : function(e){
        this.setState({
            selectContent : $(e.target).val()
        });
        if(this.props.callParent){
            this.props.callParent(this.refs[this.props.contentData.otherName].value);
        }
    }
});

export default SelectComponent;