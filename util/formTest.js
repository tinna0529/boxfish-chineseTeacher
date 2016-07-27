/**
 * Created by duanfeng on 16/6/12.
 */


export function DataTypeTest(arr,typeStr){
    let len = arr.length;
    arr.filter(function(v,i){
        return typeof v == typeStr;
    });
    if(arr.length==len){
        return true;
    }
    return false;
}


export function ValueTest(arr,startValue,endValue){
    let len = arr.length;
    arr=arr.filter(function(v,i){
        return (Number(v)) && (v >=startValue) &&( v <= endValue);
    });
    if(arr.length==len){
        console.log("========================");
        console.log(arr.length);
        return true;
    }
    return false;
}


export function NonNullTest(arr){
    let len = arr.length;
    arr=arr.filter(function(v,i){
        return v&&v!="";
    });
    if(arr.length==len){
        return true;
    }
    return false;
}

export function findElementByTeacherId(tId,arr){
    for(let i=0,len=arr.length;i<len;i++){
        let id = arr[i].teacherId;
        if(!id){continue;}
        if(id==tId){
            return arr[i];
        }
    }
    return false;
}

export function TempUtil(startTime,arr){
    let tempArr=arr.filter(function(v,i){
        return v&&v.startTime==startTime;
    });
    return tempArr[0].slotId;
}
