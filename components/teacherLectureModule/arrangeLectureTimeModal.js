/**
 * Created by duanfeng on 16/5/31.
 */
import React from 'react';
import LectureDetail from '../commons/lectureDetailForm';
import {Post} from '../../util/ajax';
import store from 'store';

var ArrangeLectureTimeModal = React.createClass({
    getInitialState : function(){
        return{
            defaultContent : {
                "teacherAccount":"",
                "stuAccount" : "",
                "lectureLesson" : "",
                "defaultRange" :"",
                "timeLots" : ""
            }
        }
    },
    componentWillReceiveProps : function(){
        this.setState({
            defaultContent : this.props.defaultContent
        });
    },
    render : function(){
        let name = this.props.name;
        return(
            <div className={"modal fade lectureDialog "+name} >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <LectureDetail ref="lec" tList={this.props.tList} sList={this.props.sList} lLessons={this.props.lLessons} timeLots={this.props.timeLots} defaultContent={this.state.defaultContent} />
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
        let time = this.refs.lec.getTime();
        if(!(this.refs.lec.state.lec_lesson&&this.refs.lec.state.timeLot&&time&&this.refs.lec.state.lec_account&&this.refs.lec.state.stu_account)){
            alert("您有未选择的信息,请填写");
            return false;
        }
        let lecValue = (this.refs.lec.state.lec_lesson).split("||"),
             courseName = lecValue[1],
             courseId = lecValue[0],
             timeLot = (this.refs.lec.state.timeLot).split("||"),
             slotId = timeLot[0],
             startTime =time+" "+timeLot[1],
             endTime = time+" "+timeLot[2];
        let  tempData = {
                 "teacherOralEnId":this.props.tId,
                "teacherId":+this.refs.lec.state.lec_account,
                "studentId":+this.refs.lec.state.stu_account,
                "courseId":courseId,
                "courseName":courseName,
                "startTime":startTime,
                "endTime":endTime,
                "timeSlotId":+slotId
            };

        Post({
            url : this.props.submitUrl+"/web/common/chooseTriallecture"+"?token="+store.get("accessToken"),
            data : tempData
        }).then((p) =>{
            $(".modal").modal("hide");
            this.props.callBack();
        },(p)=>{
            console.log("error");
            alert(p.responseJSON.message);
        });
    }
});

export default ArrangeLectureTimeModal;