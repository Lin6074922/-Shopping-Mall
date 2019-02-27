// pages/commodity/commodity.js
const utils=require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1,
    srot:[
      {id: "1", name: "综合"},
      {id: "2", name: "销量"},
      {id: "3", name: "价格"}
    ],
    commodity:[]
  },
  // 搜索
  getSearch:function(){
    // console.log(12)
    // wx.navigateTo({
    //   url: '../sign/sign',
    // })
  },
  // 排序
  getSort:function(e){
    this.setData({
      num:e.target.dataset.num
    });
    // console.log(this.data.num)
  },
  // 跳转到商品详情
  jumpDetails:function(e){
    var i=e.currentTarget.dataset.index
    // console.log(data)
    var data=JSON.stringify(this.data.commodity[i])
    wx.navigateTo({
      url: '../details/details?data='+data,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.request({
      url: utils.url +'api/Product/ProductPage',
      data:{
        categoryID:options.id,
        number:1,
        size:20
      },
      method:'POST',
      success:res=>{
        // console.log(res)
        this.setData({
          commodity:res.data.data.data
        })
      }
    })
    // console.log(options.id)
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