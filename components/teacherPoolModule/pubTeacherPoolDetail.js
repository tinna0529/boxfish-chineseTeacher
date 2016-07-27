/**
 * Created by duanfeng on 16/5/31.
 */
import React from 'react';
import LectureDetailForm from '../commons/lectureDetailShow';
import LectureScoreForm from '../commons/lectureScoreForm';
import InterviewForm from '../commons/interviewForm';
import PubTeacherInfo from '../commons/pubTeacherInfoForm';

var Detail = React.createClass({
    getInitialState : function(){
        return{
            imgSrc : "",
            noPassReason:"",
            defaultScore:{
                "control" : "",
                "language" : "",
                "logic" : "",
                "word" : "",
                "question" : "",
                "func" : ""
            },
            defaultLecture:{
                "teacherAccount":"",
                "stuAccount" : "",
                "lectureLesson" : "",
                "defaultRange" :"",
                "timeLot" : ""
            },
            defaultInterview:{
                "appearance" : "",
                "voice" : "",
                "accurate" : "",
                "interest" : "",
                "present" : ""
            }
        };
    },
    componentWillReceiveProps : function(nextProps) {
        this.setState({
            imgSrc : nextProps.imgSrc,
            noPassReason : nextProps.noPassReason,
            defaultScore : nextProps.defaultScore,
            defaultLecture : nextProps.defaultLecture,
            defaultInterview : nextProps.defaultInterview
        });
    },

    render : function(){
        return(
            <div className=" pub tp-detail modal fade" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div>
                                <PubTeacherInfo imgSrc={this.state.imgSrc} isReadOnly={true}/>
                                <div className="border-wrap">
                                    <h5>试讲信息</h5>
                                    <LectureDetailForm  defaultContent={this.state.defaultLecture} />
                                </div>
                                <div className="border-wrap">
                                    <h5>试讲打分</h5>
                                    <LectureScoreForm defaultContent={this.state.defaultScore} isReadOnly={true}/>
                                </div>
                                <div className="border-wrap">
                                    <h5>面试打分</h5>
                                    <InterviewForm defaultContent={this.state.defaultInterview} isReadOnly={true}/>
                                </div>
                                <hr/>
                                <div className="form-group">
                                    <textarea  className="form-control" style={{width:"100%"}} ref="inPoolReason"  value={this.state.noPassReason} readOnly={true}/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this._submitModify}>关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
export default Detail;