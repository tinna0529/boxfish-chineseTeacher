/**
 * Created by duanfeng on 16/5/30.
 */

import React from 'react';

var ConfirmDialog = React.createClass({
    render : function(){
        let content = this.props.content.message;
        let name = this.props.content.name;
        return(
            <div className={"confirm-dialog modal fade "+name}>
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-body">
                            {content}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this._submitModify}>确认</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    _submitModify : function(){
        this.props.callBack();
    }
});

export default ConfirmDialog;