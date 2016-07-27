/**
 * Created by duanfeng on 16/6/15.
 */
import React from 'react';

var LectureDetailShow = React.createClass({

    getInitialState : function(){
        return{
            triallectureTeacher : "",
            triallectureStudent : "",
            triallectureStartTime : "",
            triallectureEndTime : "",
            demoCourse :""
        }
    },

    componentWillReceiveProps : function(nextProps){
        console.log(nextProps);
        this.setState({
            triallectureTeacher:nextProps.defaultContent.triallectureTeacher||"",
            triallectureStudent:nextProps.defaultContent.triallectureStudent||"",
            triallectureStartTime:nextProps.defaultContent.triallectureStartTime||"",
            triallectureEndTime:nextProps.defaultContent.triallectureEndTime||"",
            demoCourse : nextProps.defaultContent.demoCourse||""
        });
    },

    render : function(){
        return(
            <div className="modal-form">
                <div className="form-group">
                    <label>试讲账号:</label>
                    <input type="text" className="form-control" value={this.state.triallectureTeacher} readOnly={true}/>
                </div>
                <div className="form-group">
                    <label>学生账号:</label>
                    <input type="text" className="form-control" value={this.state.triallectureStudent} readOnly={true}/>
                </div>
                <div className="form-group">
                    <label>试讲时间:</label>
                    <input type="text" className="form-control" value={this.state.triallectureStartTime} readOnly={true}/>
                </div>
                <div className="form-group">
                    <label></label>
                    <input type="text" className="form-control" value={this.state.triallectureEndTime} readOnly={true}/>
                </div>
                <div className="form-group">
                    <label>demo课:</label>
                    <input type="text" className="form-control" value={this.state.demoCourse} readOnly={true}/>
                </div>

            </div>
        );
    }
});
export default LectureDetailShow;