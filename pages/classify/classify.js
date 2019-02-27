// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _num:0,
    classify: [
      { img: "../img/icon_f/mWear.png", name: '男装', id: 0 },
      { img: "../img/icon_f/wWear.png", name: '女装', id: 1 },
      { img: "../img/icon_f/shoes.png", name: '鞋子', id: 2 },
      { img: "../img/icon_f/package.png", name: '包', id: 3 },
      { img: "../img/icon_f/watch.png", name: '手表', id: 4 },
      { img: "../img/icon_f/jewelry.png", name: '首饰', id: 5 },
      { img: "../img/icon_f/Sports bra.png", name: '内衣', id: 6 },
      // { img: "../img/icon_f/cWear.png", name: '童装',id:7 },
      { img: "../img/icon_f/hat.png", name: '帽子', id: 7 },
    ]
  },
  getClassify:function(e){
    var id=e.target.dataset.id
    this.setData({
      _num:id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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