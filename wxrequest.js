const RequestHandle = (options={}) => { 
    wx.showLoading({title:'加载中'});
    const {
        url,
        data,
        header={Authorization:'*******'},  
        dataType,
        responseType,
        success,
        fail,
        complete
    } = options;
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            data: data,
            method: dataType,
            header: header,
            success: function (res) {
                wx.hideLoading();
                if(res.statusCode == 200){
                    resolve(res.data); 
                }else{ 
                    RequestError(res); 
                    reject('网络出错');
                }
            },
            error: function (e) { 
                console.log('未知错误')
                reject('网络出错');
            }
        }) 
    })
}

const RequestError = function(data){
    switch(data.statusCode){
        case 401:
            wx.showToast({title:'登陆过期，即将重新登陆！',icon:'none'});
            setTimeout(()=>{
                wx.redirectTo({
                    url:"/pages/home/start",
                });
            },1500)
            
            break;
        case 405:
            wx.showToast({title:'小程序错误，请重新打开小程序！',icon:'none'});
            // console.log('请求方式错误');
            break;
        default:
            wx.redirectTo({
                url:"/pages/home/start",
            });
            break;
    }
}
exports.RequestHandle = RequestHandle;