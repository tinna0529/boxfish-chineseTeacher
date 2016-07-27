/**
 * Created by duanfeng on 16/6/13.
 */
import React from 'react';
import SelectComponent from './selectComponent';
import SchoolAndProfession from './schoolAndProfessionComponent';

var selectConfig = require('../../conf/selectConfig.json');


var PriTeacherInfo = React.createClass({

    getInitialState : function(){
        return{
            isReadOnly : false,
            education : "",
            engLevel : "",
            score:"",
            schoolAndProfessionList:[],
            abroadCountry:"",
            abroadStartTime : "",
            abroadEndTime : "",
            abroadExp : "",
            teachExp : "",
            otherExp : "",
            defaultContent:{
                education : "",
                engLevel : "",
                score:"",
                schoolAndProfessionList:[],
                abroadExp : "",
                teachExp : "",
                otherExp : "",
                abroadCountry:"",
                abroadStartTime : "",
                abroadEndTime : ""
            }
        }
    },
    componentWillReceiveProps : function(nextProps){
        this.setState({
            isReadOnly : nextProps.isReadOnly,
            education : nextProps.defaultContent.education,
            engLevel : nextProps.defaultContent.engLevel,
            score: nextProps.defaultContent.score,
            schoolAndProfessionList : nextProps.defaultContent.schoolAndProfessionList,
            profession : nextProps.defaultContent.profession,
            abroadExp : nextProps.defaultContent.abroadExp,
            teachExp : nextProps.defaultContent.teachExp,
            otherExp : nextProps.defaultContent.otherExp,
            abroadCountry:nextProps.defaultContent.abroadCountry,
            abroadStartTime :nextProps.defaultContent.abroadStartTime,
            abroadEndTime : nextProps.defaultContent.abroadEndTime
        });
    },

    render : function(){
        let sList = this.props.defaultContent.schoolAndProfessionList;
        console.log(sList);
        sList = sList&&sList.length!=0?sList.map((v,i)=>{
            return(
                <SchoolAndProfession key={i} defaultContent={v}/>
            );
        }):"";
        return(
            <div>
                <h3>简历信息</h3>
                <div>
                    <div className="form-group">
                        <label>学历</label>
                        <SelectComponent tip="学历" contentData={selectConfig.degree} ref="degree" defaultSelect={this.state.education} isReadOnly={true}/>
                    </div>
                    <div className="form-group lang-level">
                        <label>英语等级</label>
                        <SelectComponent tip="英语等级" contentData={selectConfig.englishLevel} ref="engLevel" defaultSelect={this.state.engLevel} isReadOnly={true}/>
                        <label>分数</label>
                        <input type="text" className="form-control" ref="score" value={this.state.score} onBlur={(e)=>{this._change(e,"score")}} readOnly={this.state.isReadOnly}/>
                    </div>
                    {sList}
                </div>
                <div>
                    <div className="form-group">
                        <label>留学国家</label>
                        <input type="text"  className="form-control" ref="abroadCountry" value={this.state.abroadCountry} onBlur={(e)=>{this._change(e,"abroadCountry")}} readOnly={this.state.isReadOnly}/>
                    </div>
                    <div className="form-group">
                        <label>留学时间</label>
                        <input type="text"  className="form-control" ref="abroadStartTime" value={this.state.abroadStartTime} onBlur={(e)=>{this._change(e,"abroadStartTime")}} readOnly={this.state.isReadOnly}/>
                    </div>
                    <div className="form-group">
                        <label></label>
                        <input type="text"  className="form-control" ref="abroadEndTime" value={this.state.abroadEndTime} onBlur={(e)=>{this._change(e,"abroadEndTime")}} readOnly={this.state.isReadOnly}/>
                    </div>
                    <div className="form-group resume-text">
                        <h4>留学经验</h4>
                        <textarea  className="form-control" ref="abroadExp" value={this.state.abroadExp} onBlur={(e)=>{this._change(e,"abroadExp")}} readOnly={this.state.isReadOnly}/>
                    </div>
                    <div className="form-group resume-text">
                        <h4>教学经验</h4>
                        <textarea  className="form-control" ref="teachExp" value={this.state.teachExp} onBlur={(e)=>{this._change(e,"teachExp")}} readOnly={this.state.isReadOnly}/>
                    </div>
                    <div className="form-group resume-text">
                        <h4>其他英语经历</h4>
                        <textarea  className="form-control" ref="otherExp" value={this.state.otherExp} onBlur={(e)=>{this._change(e,"otherExp")}} readOnly={this.state.isReadOnly}/>
                    </div>
                </div>

            </div>
        );
    },
    _change : function(e,name){
        switch(name){
            case "education":
                this.setState({education:this.refs[name].value});
                break;
            case "engLevel":
                this.setState({engLevel:this.refs[name].value});
                break;
            case "score":
                this.setState({score:this.refs[name].value});
                break;
            case "school":
                this.setState({school:this.refs[name].value});
                break;
            case "profession":
                this.setState({profession:this.refs[name].value});
                break;
            case "abroadExp":
                this.setState({abroadExp:this.refs[name].value});
                break;
            case "teachExp":
                this.setState({teachExp:this.refs[name].value});
                break;
            case "otherExp":
                this.setState({otherExp:this.refs[name].value});
                break;
            case "abroadCountry":
                this.setState({abroadCountry:this.refs[name].value});
                break;
            case "abroadStartTime":
                this.setState({abroadStartTime:this.refs[name].value});
                break;
            case "abroadEndTime":
                this.setState({abroadEndTime:this.refs[name].value});
                break;

        }
    },
    getSelectValue:function(name){
        return this.refs[name].state.selectContent;
    }
});
export default PriTeacherInfo;