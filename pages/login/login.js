
// pages/login/login.js

const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 取消授权
  // openSetting:function(){
  //   wx.openSetting({
  //     success:res=>{
  //       this.setData({
  //         hasUserInfo:false
  //       })
  //       // app.globalData.hasUserInfo=false
  //     }
  //   })
  // },
  // 跳转函数
  bindViewTap: function () {
    if(this.data.hasUserInfo){
      wx.navigateTo({
        url: '../sign/sign'
      })
    }else{
      wx.showToast({
        title: '请先授权登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  
  // 手动获取授权并保存用户数据
  getUserInfo: function (e) {
    // console.log(e)
    var that=this
    wx.getSetting({
      success:res=>{
        console.log(res.authSetting)
        if(res.authSetting['scope.userInfo']){
          app.globalData.userInfo = e.detail.userInfo
          app.globalData.hasUserInfo=true
          that.setData({
            
            userInfo: e.detail.userInfo,
            hasUserInfo: true
          })
          console.log(that.data.userInfo)
        }
      },
      fail:res=>{
        wx.showToast({
          title: '授权失败，请检测网络连接',
          icon:'none',
          duration:2000
        })
      }
    })
    // console.log(this.data.userInfo)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断app的globalData是否有数据
    if(app.globalData.userInfo){
      this.setData({
        userInfo:app.globalData.userInfo,
        hasUserInfo: true
      })
      app.globalData.eit = false
      // console.log(this.data.userInfo)
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      // 页面先加载完成没有获得样式，重新添加样式
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        app.globalData.eit = false
        // console.log(res)
        // console.log(this.data.userInfo)
      }
    }else{
      // 页面自主获得样式
      wx.getUserInfo({
        success:res=>{
          this.setData({
            userInfo:res.userInfo,
            hasUserInfo: true
          })
          app.globalData.eit = false
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
    hasUserInfo : app.globalData.hasUserInfo
    })
    // console.log(app.globalData.hasUserInfo)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})

