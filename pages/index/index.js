//index.js
//获取应用实例
var utils = require("../../utils/util.js")
var api = require('../../utils/api.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    productPage: {}
  },
  getCommodity: function(e) {
    // console.log(e.currentTarget.dataset.id)
    var commdityId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../commodity/commodity?id=' + commdityId,
    })
  },
  getUserInfo: function(e) {
    app.getSet(e)
  },
  api: {
    getCategories: (data, that) => {
      data = data || {};
      api.http("get", "api/Product/GetCategories", data, res => {
        if (res.success) {
          var result = res.data.splice(0, 26);
          // console.log(result)
          // debugger
          for (var k in result) {
            var x = result[k];
            x.otherJson ? JSON.parse(x.otherJson) : null;
          }

          that.setData({
            "categories": result
          });
        }
      });
    },
    productPage: (data, that) => {
      data = data || {
        categoryID: 0,
        number: 1,
        size: 10
      };
      api.http("post", "api/Product/ProductPage?categoryID=" + data.categoryID + "&number=" + data.number + "&size=" + data.size, data, res => {
        if (res.success) {
          
          that.setData({
            "productPage": res.data
          });
        }
      });
    },

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.api.getCategories({}, this);
    this.api.productPage({
      categoryID: 12,
      number: 1,
      size: 10
    }, this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})