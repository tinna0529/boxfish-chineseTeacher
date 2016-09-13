/**
 * Created by duanfeng on 16/6/12.
 */
import React from 'react';
import InterviewForm from '../commons/interviewForm';
import {Post}  from '../../util/ajax';
import store from 'store';
import {NonNullTest,ValueTest} from '../../util/formTest';

var PubInterviewScore = React.createClass({
    getInitialState : function(){
      return{
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
            defaultContent : nextProps.defaultContent
        });
    },
    render : function(){
        return(
            <div className={"modal fade "+this.props.name}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div>
                                <InterviewForm ref="interview" defaultContent={this.state.defaultContent}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary"  onClick={this._submitModify}>保存</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    _submitModify : function(){
        let arrTest = [this.refs.interview.state.appearance,this.refs.interview.state.voice,this.refs.interview.state.accurate,this.refs.interview.state.interest,this.refs.interview.state.present];
        if(!NonNullTest(arrTest)){
            alert("所有评分项都不能为空!");
            return;
        }
        if(!ValueTest(arrTest,60,100)){
            alert("所有评分项只能为60~100之间的数字!");
            return;
        }
        let postData = {
            "teacherId" : this.props.id,
            "interviewScoresMap": {
                "appearance": Number(this.refs.interview.state.appearance),
                "pronunciation": Number(this.refs.interview.state.voice),
                "accuracy":Number(this.refs.interview.state.accurate),
                "logic":Number(this.refs.interview.state.interest),
                "expression":Number(this.refs.interview.state.present)
            }
        };
        Post({
            url : this.props.url+"/web/teacher/updateInterviewAndMarkScores"+"?token="+store.get("accessToken"),
            data : postData
        }).then((p)=>{
            console.log("success");
            $(".modal").modal("hide");
            this.props.refreshTable();
        },()=>{});
    }
});

export default PubInterviewScore;