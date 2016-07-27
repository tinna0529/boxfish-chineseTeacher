/**
 * Created by duanfeng on 16/6/6.
 */
import React from 'react';
import LectureScoreForm from "../commons/lectureScoreForm";
import {ValueTest,NonNullTest} from '../../util/formTest';
import {Post} from '../../util/ajax';

var ScoreLectureModal = React.createClass({

    getInitialState : function(){
        return{
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
            defaultScore : nextProps.defaultContent
        });
    },

    render : function(){
        return(
            <div className={"modal fade "+this.props.name}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <LectureScoreForm ref="lecScore" defaultContent={this.state.defaultScore}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this._submitModify}>保存</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    _submitModify : function(){
        let testArr = [this.refs.lecScore.state.control,this.refs.lecScore.state.language,this.refs.lecScore.state.logic,
            this.refs.lecScore.state.word,this.refs.lecScore.state.question,this.refs.lecScore.state.func];
        if(!NonNullTest(testArr)){
            alert("评分不能为空");
            return;
        }
        if(!ValueTest(testArr,60,100)){
            alert("评分必须为60~100之间的数字");
            return;
        }
        let postData = {
            "teacherId": this.props.id,
            "trialScoresMap": {
                "control": Number(this.refs.lecScore.state.control),
                "languageManagement": Number(this.refs.lecScore.state.language),
                "logicTree":Number(this.refs.lecScore.state.logic),
                "spokenLevel":Number(this.refs.lecScore.state.word),
                "openQuestion":Number(this.refs.lecScore.state.question),
                "function":Number(this.refs.lecScore.state.func)
            }
        };
        Post({
            url : this.props.url+"/web/teacher/updateTrialScores",
            data : postData
        }).then((p)=>{
            $(".modal").modal("hide");
            this.props.refreshTable();
        },()=>{});
    }
});

export default ScoreLectureModal;