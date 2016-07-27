/**
 * Created by duanfeng on 16/6/6.
 */
import React from 'react';


var LectureScoreForm = React.createClass({

    getInitialState : function(){
        return{
            isReadOnly:false,
            control : "",
            language : "",
            logic : "",
            word : "",
            question : "",
            func : "",
            defaultScore : {
                "control" : "",
                "language" : "",
                "logic" : "",
                "word" : "",
                "question" : "",
                "func" : ""
            }
        }

    },

    componentWillReceiveProps : function(nextProps){
        this.setState({
            control : nextProps.defaultContent.control||"",
            language : nextProps.defaultContent.language||"",
            logic : nextProps.defaultContent.logic||"",
            word : nextProps.defaultContent.word||"",
            question : nextProps.defaultContent.question||"",
            func : nextProps.defaultContent.func||"",
            isReadOnly :nextProps.isReadOnly||false
        });
    },
    render : function(){
        return(
            <div className="modal-form">
                <div className="form-group">
                    <label>控场能力&nbsp;:</label>
                    <input type="text" className="form-control" ref="control" value={this.state.control} onChange={(e)=>{this._change(e,"control")}} readOnly={this.state.isReadOnly}/>
                </div>
                <div className="form-group">
                    <label>对语言知识的掌握能力&nbsp;:</label>
                    <input type="text" className="form-control" ref="language" value={this.state.language} onChange={(e)=>{this._change(e,"language")}} readOnly={this.state.isReadOnly}/>
                </div>
                <div className="form-group">
                    <label>逻辑树&nbsp;:</label>
                    <input type="text" className="form-control" ref="logic" value={this.state.logic} onChange={(e)=>{this._change(e,"logic")}} readOnly={this.state.isReadOnly}/>
                </div>
                <div className="form-group">
                    <label>单词&nbsp;:</label>
                    <input type="text" className="form-control" ref="word" value={this.state.word} onChange={(e)=>{this._change(e,"word")}} readOnly={this.state.isReadOnly}/>
                </div>
                <div className="form-group">
                    <label>open&nbsp;question:</label>
                    <input type="text" className="form-control" ref="question" value={this.state.question} onChange={(e)=>{this._change(e,"question")}} readOnly={this.state.isReadOnly}/>
                </div>
                <div className="form-group">
                    <label>function&nbsp;:</label>
                    <input type="text" className="form-control" ref="func" value={this.state.func} onChange={(e)=>{this._change(e,"func")}} readOnly={this.state.isReadOnly}/>
                </div>
            </div>
        );
    },
    _change : function(e,name){
        switch(name){
            case "control" :
                this.setState({control:this.refs[name].value});
                break;
            case "language" :
                this.setState({language:this.refs[name].value});
                break;
            case "logic" :
                this.setState({logic:this.refs[name].value});
                break;
            case "word" :
                this.setState({word:this.refs[name].value});
                break;
            case "question" :
                this.setState({question:this.refs[name].value});
                break;
            case "func" :
                this.setState({func:this.refs[name].value});
                break;
        }
    }
});

export default LectureScoreForm;