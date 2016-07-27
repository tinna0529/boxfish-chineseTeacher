/**
 * Created by tinna on 16/5/19.
 */

//引入插件
import React from 'react';

import SelectComponent from './addressSelect.js';
import {Get} from '../../util/ajax.js';

var configData = require ('../../conf/selectConfig.json');
var api = require ('../../conf/urlConfig.json');


var TeacherAddress = React.createClass({
    getInitialState : function(){
      return{
          provinces : configData.provinces,
          cities : configData.cities,
          districts : configData.districts,
          province : "",
          city : "",
          district : ""
      };
    },
    componentWillMount : function(){
        Get({
            url : api.testUrl+"/web/common/addressList"
        }).then((p)=>{
            this.setState({
                "provinces" : {
                    "name":"省",
                    "otherName":"province",
                    "arr" : p.data
                }
            });
        },(data)=>{
            alert("获取省份信息失败!");
        });
    },
    render : function(){
        return(
            <div>
                <SelectComponent tip="省" contentData={this.state.provinces} ref="province" callParent={this._changeProvince}/>
                <SelectComponent tip="市" contentData={this.state.cities} ref="city" callParent={this._changeCity}/>
                <SelectComponent tip="区" contentData={this.state.districts} ref="district" callParent={this._changeDistrict}/>
            </div>
        );
    },
    handelProvinceToCity : function(prv){
        Get({
            url : api.testUrl+"/web/common/addressList",
            data : {
                province:prv
            }
        }).then((p)=>{
            this.setState({
                "cities" : {
                    "name":"市",
                    "otherName":"city",
                    "arr" : p.data
                }
            });
        },(p)=>{
            alert("获取城市信息失败!");
        });
    },
    handelCityToDistrict : function(c){
        console.log(this.state.city);
        Get({
            url : api.testUrl+api.listAPI,
            data : {
                province:this.state.province,
                city:c
            }
        }).then((p)=>{
            this.setState({
                "districts" : {
                    "name":"区",
                    "otherName":"district",
                    "arr" : p.data
                }
            });
        },(p)=>{
            alert("获取地区信息失败!");
        });
    },
    _changeProvince : function(newProvince){
        this.setState({
            "districts" : configData.provinces,
            "cities" : configData.cities
        });
        this.props.callParent("province",newProvince);
        this.setState({province:newProvince});
        this.handelProvinceToCity(newProvince);
    },
    _changeCity : function(newCity){
        this.props.callParent("city",newCity);
        this.setState({city:newCity});
        this.handelCityToDistrict(newCity);
    },
    _changeDistrict : function(newDistrict){
        this.props.callParent("district",newDistrict);
        this.setState({district:newDistrict});
    }
});

export  default TeacherAddress;


