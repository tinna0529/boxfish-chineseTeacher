/**
 * Created by duanfeng on 16/5/30.
 */
import React from 'react';
import PubTeacherInfo from '../commons/pubTeacherInfoForm';

var PubTeacherDetail = React.createClass({
    getInitialState : function(){
        return{
            imgSrc:""
        }
    },

    componentWillReceiveProps : function(nextProps) {
        this.setState({imgSrc:nextProps.imgSrc});
    },

    render : function(){
        return(
            <div className=" pub-tm-detail modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <PubTeacherInfo imgSrc={this.state.imgSrc}/>
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
        $(".pub-tm-detail").modal("hide");
    }
});

export default PubTeacherDetail;