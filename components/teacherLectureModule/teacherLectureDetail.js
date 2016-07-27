/**
 * Created by duanfeng on 16/5/31.
 */
import React from 'react';
import LectureShow from "../commons/lectureDetailShow";

var Detail = React.createClass({
    getInitialState : function(){
        return{
            defaultContent : {
                triallectureTeacher : "",
                triallectureStudent : "",
                triallectureStartTime : "",
                triallectureEndTime : "",
                demoCourse :""
            }
        }
    },
    componentWillReceiveProps : function(nextProps){
        this.setState({
            defaultContent : nextProps.defaultContent
        });
    },
    render: function(){
        return(
            <div className={" tl-detail modal fade "+this.props.name} >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            {/*<LectureShow defaultContent={this.state.defaultContent} />*/}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Detail;