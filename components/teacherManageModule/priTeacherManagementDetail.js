/**
 * Created by duanfeng on 16/5/30.
 */
import React from 'react';
import {Post} from '../../util/ajax';
import PriTeacherInfo from '../commons/priTeacherInfoForm';




var PriTeacherDetail = React.createClass({

    getInitialState : function(){
        return{
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
            <div className=" pri-tm-detail modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <PriTeacherInfo ref="priTI" defaultContent={this.state.defaultContent} isReadOnly={true} />
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    _submitModify : function(){
        /*let tempData = {
            "teacherId" : this.props.id,
            "degree" : +this.refs.priTI.getSelectValue("degree"),
            "englishCertification" : +this.refs.priTI.getSelectValue("engLevel"),
            "englishScore" : this.refs.priTI.state.score||"",
            "schoolAndProfessionList":[{"graduateSchool" : this.refs.priTI.state.school,"profession" : this.refs.priTI.state.profession}],
            "englishExperience" :this.refs.priTI.state.otherExp||"",
            "teachingExperience" : this.refs.priTI.state.teachExp||"",
            "abroadExperience" : this.refs.priTI.state.abroadExp||"",
            "abroadEndTime" : this.refs.priTI.state.abroadEndTime||"",
            "abroadStartTime" : this.refs.priTI.state.abroadStartTime||"",
            "abroadCountry" : this.refs.priTI.state.abroadCountry||""
        };
        Post({
            url : this.state.url+"/web/teacher/update",
            data : tempData
        }).then((p)=>{
            this.props.callcallFresh();
            $(".pri-tm-detail").modal("hide");
        },()=>{});*/
    }
});

export default PriTeacherDetail;
