/**
 * Created by duanfeng on 16/6/6.
 */
import React from 'react';
import LectureDetailForm from '../commons/lectureDetailShow';
import LectureScoreForm from '../commons/lectureScoreForm';
import InterviewForm from '../commons/interviewForm';
import PriTeacherInfo from '../commons/priTeacherInfoForm';

var Detail = React.createClass({
    getInitialState : function(){
        return{
            noPassReason : "",
            defaultTeacherInfo:{
                education : "",
                engLevel : "",
                score:"",
                school : "",
                profession : "",
                abroadExp : "",
                teachExp : "",
                otherExp : "",
                abroadCountry:"",
                abroadStartTime : "",
                abroadEndTime : ""
            },
            defaultScore:{
                "control" : "",
                "language" : "",
                "logic" : "",
                "word" : "",
                "question" : "",
                "func" : ""
            },
            defaultLecture:{
                triallectureTeacher : "",
                triallectureStudent : "",
                triallectureStartTime : "",
                triallectureEndTime : "",
                demoCourse :""
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
            defaultTeacherInfo : nextProps.defaultTeacherInfo,
            noPassReason : nextProps.noPassReason,
            defaultScore : nextProps.defaultScore,
            defaultLecture : nextProps.defaultLecture,
            defaultInterview : nextProps.defaultInterview
        });
    },
    render : function(){
        return(
            <div className=" pri pri-tm-detail modal fade" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div>
                                <PriTeacherInfo  isReadOnly={true} defaultContent={this.state.defaultTeacherInfo}/>
                                <div className="border-wrap">
                                    <h5>试讲信息</h5>
                                    <LectureDetailForm isReadOnly={true} defaultContent={this.state.defaultLecture} />
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
                                    <textarea  className="form-control" style={{width:"93%"}} ref="inPoolReason" placeholder="入池理由" value={this.state.noPassReason} readOnly={true}/>
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