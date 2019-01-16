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