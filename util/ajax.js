/**
 * Created by Utopia on 2016/3/9.
 */

export function Post({url,headers,data}) {
    return new Promise((resolve,reject)=>{
        $.ajax({
            type:"POST",
            dataType:"json",
            url:url,
            headers:headers,
            contentType:"application/json",
            data:JSON.stringify(data),
            success:function(response){
                let {returnCode} = response;
                if(returnCode == 403){
                    alert("您没有此操作的权限!");
                    return;
                }
                if(returnCode == 401){
                    let hash = window.location.hash;
                    if(hash.substr(0,3) == "#/?" || hash.substr(0,8) == "#/login?"){
                        return;
                    }
                    alert("登录信息过期,请重新登录!");
                    hashHistory.push({pathname:"/login"});
                }
                resolve(response);
            },
            error:reject
        });
    });
}

export function Get({url,headers,data}) {
    return new Promise((resolve,reject)=> {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: url,
            headers: headers,
            data: data,
            success: function(response){
                let {returnCode} = response;
                if(returnCode == 403){
                    alert("您没有此操作的权限!");
                    return;
                }
                if(returnCode == 401){
                    let hash = window.location.hash;
                    if(hash.substr(0,3) == "#/?" || hash.substr(0,8) == "#/login?"){
                        return;
                    }
                    alert("登录信息过期,请重新登录!");
                    hashHistory.push({pathname:"/login"});
                }
                resolve(response);
            },
            error: reject
        });
    });
}

export function transformArrayToObj(arr) {
    if(Object.prototype.toString.call(arr) != "[object Array]") {
        return arr;
    }
    var obj = {};
    arr.forEach(function (v, i) {
        obj[v.name] = v.value;
    });
    return obj;
}

