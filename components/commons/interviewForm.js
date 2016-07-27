/**
 * Created by duanfeng on 16/6/6.
 */
import React from 'react';



var InterviewForm = React.createClass({

    getInitialState : function(){
        return{
            isReadOnly:false,
            appearance : "",
            voice : "",
            accurate : "",
            interest : "",
            present : "",
            defaultContent : {
                "appearance" : "",
                "voice" : "",
                "accurate" : "",
                "interest" : "",
                "present" : ""
            }
        }
    },
    componentWillReceiveProps : function(nextProps){

        this.setState({
            appearance:nextProps.defaultContent.appearance||"",
            voice:nextProps.defaultContent.voice||"",
            accurate:nextProps.defaultContent.accurate||"",
            interest:nextProps.defaultContent.interest||"",
            present : nextProps.defaultContent.present||"",
            isReadOnly :nextProps.isReadOnly||false
        });
    },
    render : function(){
        return(
            <div className="modal-form">
                <div className="form-group">
                    <label>仪表:</label>
                    <input type="text" className="form-control" ref="appearance" onChange={(e)=>{this._change(e,"appearance")}} value={this.state.appearance} readOnly={this.state.isReadOnly}/>
                </div>
                <div className="form-group">
                    <label>发音:</label>
                    <input type="text" className="form-control"  ref="voice" onChange={(e)=>{this._change(e,"voice")}} value={this.state.voice} readOnly={this.state.isReadOnly}/>
                </div>
                <div className="form-group">
                    <label>准确性:</label>
                    <input type="text" className="form-control"  ref="accurate" onChange={(e)=>{this._change(e,"accurate")}} value={this.state.accurate} readOnly={this.state.isReadOnly}/>
                </div>
                <div className="form-group">
                    <label>逻辑:</label>
                    <input type="text" className="form-control"  ref="interest" onChange={(e)=>{this._change(e,"interest")}} value={this.state.interest} readOnly={this.state.isReadOnly}/>
                </div>
                <div className="form-group">
                    <label>表达:</label>
                    <input type="text" className="form-control"  ref="present" onChange={(e)=>{this._change(e,"present")}} value={this.state.present} readOnly={this.state.isReadOnly}/>
                </div>
            </div>
        );
    },
    _change(e,key){
        switch(key){
            case "appearance":
                this.setState({
                    appearance : this.refs[key].value
                });
                break;
            case "voice":
                this.setState({
                    voice : this.refs[key].value
                });
                break;
            case "accurate":
                this.setState({
                    accurate : this.refs[key].value
                });
                break;
            case "interest":
                this.setState({
                    interest : this.refs[key].value
                });
                break;
            case "present":
                this.setState({
                    present : this.refs[key].value
                });
                break;
        }

    }
});

export default InterviewForm;