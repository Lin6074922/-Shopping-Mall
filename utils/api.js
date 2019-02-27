const host = "https://mc.150cm.xyz/";

///http请求   方法,路由,参数体,成功回调,失败回调
const http = function(method, url, data, success, fail) {
  var config = {
    url: host + url,
    data: data,
    method: method,
    success: function(res) {
      if (success) {
        success(res.data);
      }
    },
    fail: function(res) {
      if (fail) {
        fail(res.data);
      }
    }
  };

  wx.getStorage({
    key: 'token',
    success: function(res) {
      if (res.errMsg === "getStorage:ok") {

        config["header"] = {
          "secret": res.data
        };
      }
      wx.request(config);
    },
  });
};



module.exports = {
  http: http
}