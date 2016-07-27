/**
 * Created by duanfeng on 16/6/29.
 */
import React from 'react';



var SchoolAndProfession = React.createClass({

    getInitialState : function(){
        return{
            school : "",
            profession : ""
        }
    },
    componentWillMount : function(){
        this.setState({
            school:this.props.defaultContent.graduateSchool||"",
            profession:this.props.defaultContent.profession||""
        });
    },
    componentWillReceiveProps : function(nextProps){
        this.setState({
            school:nextProps.defaultContent.graduateSchool||"",
            profession:nextProps.defaultContent.profession||""
        });
    },
    render :function(){
        return(
            <div style={{border:"#eee solid 1px",padding:"4px"}}>
                <div className="form-group">
                    <label>毕业学校</label>
                    <input type="text" className="form-control" ref="school" value={this.state.school} readOnly={true} />
                </div>
                <div className="form-group">
                    <label>专业</label>
                    <input type="text" className="form-control" ref="profession" value={this.state.profession} readOnly={true} />
                </div>
            </div>
        );
    }
});
export default SchoolAndProfession;