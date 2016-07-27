/**
 * Created by duanfeng on 16/6/13.
 */
import React from 'react';



var PubTeacherInfo = React.createClass({

    getInitialState : function(){
        return{
            imgSrc :"images/demo/demo.jpg"
        }
    },

    componentWillReceiveProps : function(nextProps) {
        this.setState({imgSrc:nextProps.imgSrc});
    },

    render : function(){
        return(
            <div>
                <img src={this.state.imgSrc}/>
            </div>
        );
    }

});
export default PubTeacherInfo;