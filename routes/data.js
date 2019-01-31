var fs=require('fs');

exports.findById = function(id, cb) {
  process.nextTick(function() {
    fs.readFile('data.json','utf-8',function(err,data){
        var idx=id-1;
        var arr=JSON.parse(data);
        if(arr.users[idx]){
            cb(null, arr.users[idx]);
        }
        else{
            cb(new Error('User ' + id + ' does not exist'));
        }
    });
    
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    fs.readFile('data.json','utf-8',function(err,data){
        var arr=JSON.parse(data);
        var i=0;
        for(i=0;i<arr.users.length;i++){
            var record=arr.users[i];
            if(arr.users[i].username==username){
            return cb(null, record);
            }
        }
    return cb(null, null);
    });
    
    
  });
}

exports.findproject=function(cb){
    fs.readFile('project.json','utf-8',function(err,data){
        if(err)
            console.log(err);
        else{
            var arr=JSON.parse(data);
            return cb(null,arr);
        }
    })
}

exports.getprojectid=function(id,cb){
    fs.readFile('project.json','utf-8',function(err,data){
        if(err)
            console.log(err);
        else
        {
            var arr=JSON.parse(data);
            var i=0;
            for(i=0;i<arr.users.length;i++){
                var record=arr.users[i];
                if(arr.users[i].id==id){
                return cb(null, record);
                }     
            }
        }
    })
}

exports.findcustomer=function(cb){
    fs.readFile('contact.json','utf-8',function(err,data){
        if(err)
            console.log(err);
        else{
            var arr=JSON.parse(data);
            return cb(null,arr);
        }
    })
}