/**
 * Created by tinna on 16/5/20.
 */

//引入插件
import React from 'react';
import DateRangePicker from '../commons/dateRangePicker';

var Table = React.createClass({
    getInitialState : function(){
        return{
            allCheck:false,
            hasTryTime:false,
            hasInterviewTime:false,
            choiceArr:[],
            flag:0
        }
    },
    componentWillMount : function(){
        if($.inArray("安排试讲",this.props.tableConfig.thList)!=-1){
            this.setState({hasTryTime:true});
        }
        if($.inArray("面试时间",this.props.tableConfig.thList)==(this.props.tableConfig.thList.length-1)){
            this.setState({hasInterviewTime:true});
        }
    },
    componentWillReceiveProps : function(nextProps){
            this.setState({
                choiceArr:[],
                allCheck:false
            });
    },
    render : function(){
        let size = 10;
        let contentLen = this.props.contentData?size-this.props.contentData.length:10;
        let tContainer =[];
        for(let i=0,len = contentLen;i<len;i++){
            tContainer.push({"fake":true});
        }
        let thList = this.props.tableConfig.thList.map((v,i) => {
            if(i == 0){
                return ( <th><input type="checkbox" ref="all" onChange={this._allCheck} checked={this.state.allCheck}/></th> );
            }
            return ( <th>{v}</th> );
        });

        let operations = !this.props.tableConfig.operations?"":this.props.tableConfig.operations.map( (v,i)=> {
            switch (v){
                case "detail":
                    return (
                        <span style={{cursor:"pointer",color:"#aaa",fontSize:"12px"}} onClick={(e) =>{this._singleOption(e,this.props.callBack.showDetail)}}>详情</span>
                    );
                case "pass":
                    return (
                        <button className="btn btn-default btn-xs" onClick={(e) =>{this._singleOption(e,this.props.callBack.showPass)}}>通过</button>
                    );
                case "inPool":
                    return (
                        <button className="btn btn-default btn-xs" onClick={(e) =>{this._singleOption(e,this.props.callBack.inPool)}}>入池</button>
                    );
                case "score":
                    return (
                        <button className="btn btn-default btn-xs" onClick={(e) =>{this._singleOption(e,this.props.callBack.showScore)}}>评分</button>
                    );
                case "catch":
                    return (
                        <button className="btn btn-default btn-xs" onClick={(e) =>{this._singleOption(e,this.props.callBack.catch)}}>捕捞</button>
                    );
                case "interviewScore":
                    return (
                        <button className="btn btn-default btn-xs" onClick={(e) =>{this._singleOption(e,this.props.callBack.interviewScore)}}>面试评分</button>
                    );
                case "lectureScore":
                    return (
                        <button className="btn btn-default btn-xs" onClick={(e) =>{this._singleOption(e,this.props.callBack.lectureScore)}}>试讲评分</button>
                    );
                case "check":
                    return (
                        <span style={{cursor:"pointer",color:"#aaa",fontSize:"12px"}} onClick={(e) =>{this._singleOption(e,this.props.callBack.showDetail)}}>审核</span>
                    );
            }
        });

        let displayAttr = this.props.tableConfig.displayAttr;
        let len = displayAttr? displayAttr.length:0;
        tContainer = this.props.contentData?this.props.contentData.concat(tContainer):tContainer;
        let tbodyList = tContainer.map((v,i) => {
            let displayAttrs =  displayAttr.map( (val,index) =>{
                if(this.state.hasTryTime&&index==(len-1)&&v[val]==""){
                    return(
                        <td><input type="button" className="btn btn-default btn-xs" value="安排试讲" onClick={(e)=>{this.props.callBack.arrangeLecture(e,v.teacherId)}}/></td>
                    );
                }
                if(this.state.hasInterviewTime&&index==(len-1)&&(val in v)){
                    let pl = ".pri-wrap";
                    if (v.isPublicSchool==1){
                        pl = ".pub-wrap";
                    }
                    return(
                        <td><DateRangePicker ref={"dp"+v.teacherId} defaultTime={v[val]} isSingle={true} isMinute={true} callBlur={this.props.callBack.setInterviewTime} teacherId={v.teacherId} place={pl} isInterview={true}/></td>
                    );
                }
                return(
                    <td>{v[val]}</td>
                );

            });
            if(v.fake){
                return (
                    <tr>
                        <td></td>
                        {displayAttrs}
                        <td className="table-operation">
                            <div style={{visibility:"hidden"}}>empty</div>
                        </td>
                    </tr>
                );
            }
            if($.inArray(v.teacherId,this.state.choiceArr)!=-1){
                return (
                    <tr>
                        <td><input  type="checkbox" ref={"checkbox"+i} onChange={(e) => {this._singleCheck(e,i)}} checked={true}/></td>
                        {displayAttrs}
                        <td className="table-operation" id={"option"+i}>
                            {operations}
                        </td>
                    </tr>
                );
            }
            return (
                <tr>
                    <td><input  type="checkbox" ref={"checkbox"+i} onChange={(e) => {this._singleCheck(e,i)}} checked={false}/></td>
                    {displayAttrs}
                    <td className="table-operation" id={"option"+i}>
                        {operations}
                    </td>
                </tr>
            );


        });
        return (
            <table className="table table-striped" ref="table">
                <thead>
                    <tr>
                        {thList}
                    </tr>
                </thead>
                <tbody>
                        {tbodyList}
                </tbody>
            </table>
        );
    },

    _singleCheck : function(e,i) {

        let arr = this.state.choiceArr||[];

        if(this.refs["checkbox"+i].checked){
            arr.push(this.props.contentData[i].teacherId);
        }else{
            arr.splice(this.props.contentData[i].teacherId.indexOf(arr),1);
        }
        this.setState({choiceArr:arr});
    },
    _singleOption : function(e,fn){
        let index = $(e.target).parent().attr("id").substr(-1,1);
        let id = this.props.contentData[index].teacherId;
        fn(id);
    },
    _allCheck : function(){
        let arr = this.props.contentData;
        if(!(arr&&arr.length!=0))
            return;
        let newArr = [];
        for(let i =0,len =arr.length;i<len;i++){
            newArr.push(arr[i].teacherId);
        }
        let flag = false;
        let stateFlag = 0;
        if(this.state.flag==0){
            flag = true;
            stateFlag = 1;
        }else{
            newArr =[];
        }
        this.setState({
            choiceArr:newArr,
            allCheck:flag,
            flag:stateFlag
        });

    },
    getInterviewTime : function(refName){
        return this.refs[refName].state.time;
    }

});

export default Table;