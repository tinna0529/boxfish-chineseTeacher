/**
 * Created by duanfeng on 16/6/3.
 */
import React from 'react';
import {Post} from '../../util/ajax';
import store from 'store';


var Detail = React.createClass({
    getInitialState : function(){
        return{
            imgSrc:"http://avatar.csdn.net/D/E/A/1_wangjinwei6912.jpg",
            reason:""
        }
    },
    componentWillReceiveProps : function(nextProps){
        this.setState({
            imgSrc : nextProps.imgSrc
        });
    },

    render : function(){
        return(
            <div className=" pub-tc-detail modal fade" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div>
                                <div>
                                    <img src={this.state.imgSrc}/>
                                </div>
                                <div className="form-group">
                                    <textarea style={{width:"100%"}} className="form-control" placeholder="入池理由"  ref="pub_reason" value={this.state.reason} onChange={this._onReasonChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary"  onClick={this._submitPass}>通过</button>
                            <button type="button" className="btn btn-primary"  onClick={this._submitPool}>投入池子</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    _submitPass : function(){
        Post({
            url :this.props.url+"/web/teacher/updateStatePass"+"?token="+store.get("accessToken"),
            data : {
                "teacherId" : this.props.teacherId,
                "stateStep" : 1
            }
        }).then((p)=>{
            $(".pub-tc-detail").modal("hide");
            this.props.callFresh();
        });
    },
    _submitPool : function(){
        if(!this.state.reason||this.state.reason.trim()==""){
            alert("入池理由不能为空")
            return false;
        }
        Post({
            url :this.props.url+"/web/teacher/putPond"+"?token="+store.get("accessToken"),
            data : {
                "teacherIds" : [this.props.teacherId],
                "isInThePond" : 1,
                "noPassReason":this.state.reason
            }
        }).then((p)=>{
            $(".pub-tc-detail").modal("hide");
            this.props.callFresh();
        });
    },
    _onReasonChange : function(){
        this.setState({
            reason : this.refs.pub_reason.value
        });
    }

});

export default Detail;