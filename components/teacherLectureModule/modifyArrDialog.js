/**
 * Created by duanfeng on 16/6/17.
 */
import React from 'react';
import LectureDetail from '../commons/lectureDetailForm';
import {Post} from '../../util/ajax';

var ModifyArrangeDialog = React.createClass({

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
    componentWillReceiveProps : function(nextProps){
        this.setState({
            defaultContent : nextProps.defaultContent
        });
    },
    render : function(){
        return(
            <div className={"modal fade lectureDialog  "+this.props.name} >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <LectureDetail ref="lec" tList={this.props.tList} sList={this.props.sList} lLessons={this.props.lLessons} timeLots={this.props.timeLots} defaultContent={this.state.defaultContent} studentReadOnly={true} />
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
            url : this.props.submitUrl+"/web/common/updateTriallecture",
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
export default ModifyArrangeDialog;