/**
 * Created by duanfeng on 16/5/31.
 */
import React from 'react';

var InPoolModal = React.createClass({
    getInitialState : function(){
        return {
            reason : ""
        }
    },

    render : function(){
        return(
            <div className={"modal fade "+this.props.modalName}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                        <div className="form-group">
                            <textarea className="form-control" placeholder="填写入池理由" onChange={(e)=>{this._change(e)}} value={this.state.reason}/>
                        </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={this._submitConfirm}>确定</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    _change : function(e){
        this.setState({
            reason : e.target.value
        });
    },
    _submitConfirm : function(){
        if(!this.state.reason||this.state.reason.trim()==""){
            alert("入池理由不能为空");
            return;
        }
        $('.modal').modal('hide');
        this.props.callBack(this.state.reason);
    }
});

export default InPoolModal;
