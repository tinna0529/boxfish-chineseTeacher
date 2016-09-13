/**
 * Created by duanfeng on 16/6/3.
 */
import React from 'react';
import {Post} from '../../util/ajax';
import store from 'store';
import PriTeacherDetail from '../commons/priTeacherInfoForm'

var Detail = React.createClass({

    getInitialState : function(){
        return{
            reason : "",
            defaultContent:{
                education : "",
                engLevel : "",
                score:"",
                schoolAndProfessionList:[],
                abroadExp : "",
                teachExp : "",
                otherExp : "",
                abroadCountry:"",
                abroadStartTime : "",
                abroadEndTime : ""
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
        <div className=" pri-tc-detail modal fade" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <PriTeacherDetail defaultContent={this.state.defaultContent} isReadOnly={true}/>
                        <div className="form-group">
                            <textarea className="form-control" placeholder="入池理由" ref="pri_reason" value={this.state.reason} onChange={this._onReasonChange}/>
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
                "teacherId" : this.props.id,
                "stateStep" : 1
            }
        }).then((p)=>{
            $(".pri-tc-detail").modal("hide");
            this.props.callFresh();
        });
    },
    _submitPool : function(){
        if(!this.state.reason||this.state.reason.trim()==""){
            alert("入池理由不能为空");
            return false;
        }
        Post({
            url : this.props.url+"/web/teacher/putPond"+"?token="+store.get("accessToken"),
            data : {
                "teacherIds" : [this.props.id],
                "isInThePond" : 1,
                "noPassReason":this.state.reason
            }
        }).then((p)=>{
            $(".pri-tc-detail").modal("hide");
            this.props.callFresh();
        });
    },
    _onReasonChange : function(){
        this.setState({
            reason : this.refs.pri_reason.value
        });
    }
});

export default Detail;