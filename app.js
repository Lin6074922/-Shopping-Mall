//app.js
var utils = require('utils/util.js')

App({
  // 登录
  login: function(encryptedData, iv) {
    wx.login({
      success: res => {
        if (res.code) {
          wx.request({
            url: utils.url + '/api/Wechat/Signin',
            data: {
              "encryptedData": encryptedData,
              "iv": iv,
              "code": res.code
            },
            method: "post",
            success: res => {
              if (res.data.success) {
                this.globalData.only = res.data.data;
                wx.setStorageSync("token", res.data.data);
              } else {
                this.getUserInfor();
              }
            },
            fail: res => {
              //错误回调
            }
          });
        }
      }
    });
  },
  getUserInfor: function() {
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo
        this.globalData.eit = false
        // this.globalData.hasUserInfo=true
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          // res['only']=this.globalData.only
          this.userInfoReadyCallback(res);
        }
        this.globalData.iv = res.iv;
        this.globalData.encryptedData = res.encryptedData;
        // 登录获取code码
        this.login(res.encryptedData, res.iv);
      }
    });
  },
  // 确认是否授权
  getSet: function(e) {
    var that = this
    if (this.globalData.eit) {
      // console.log(e)
      wx.getSetting({
        success: res => {
          // console.log(res.authSetting)

          if (res.authSetting['scope.userInfo']) { // 点击确认授权执行的函数
            that.globalData.userInfo = e.detail.userInfo

            that.login(e.detail.encryptedData, e.detail.iv)
            that.globalData.eit = false
            // that.globalData.hasUserInfo=true
            // console.log(this.globalData.userInfo)
            // console.log("登录失败")
            wx.showToast({
              title: '请先登录',
            })
          }
        }
      })
    }
    // console.log(this.globalData.userInfo)
  },

  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.getUserInfor();
        }
      }
    });
    // 获取数量选择数据
    var ar = [];
    for (var i = 0; i <= 99; i++) {
      ar.push(i)
    }
    this.globalData.array = ar
  },
  globalData: {
    userInfo: null,
    only: null,
    eit: true,
    encryptedData: null,
    iv: null,
    hasUserInfo: false,
    array: null,
  },
})