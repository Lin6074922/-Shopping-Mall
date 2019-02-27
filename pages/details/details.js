// pages/details/details.js
const app=getApp()
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _num:0,
    comment:[
      {id:1,name:'帅林',time:'2018-10-31',text:'商品很好'},
      { id: 2, name: '帅林', time: '2018-10-31', text: '商品很好' },
      { id: 3, name: '帅林', time: '2018-10-31', text: '商品很好' },
      { id: 4, name: '帅林', time: '2018-10-31', text: '商品很好' },
      { id: 5, name: '帅林', time: '2018-10-31', text: '商品很好' },
      { id: 6, name: '帅林', time: '2018-10-31', text: '商品很好' },
      { id: 7, name: '帅林', time: '2018-10-31', text: '商品很好' },
      { id: 8, name: '帅林', time: '2018-10-31', text: '商品很好' },
      { id: 9, name: '帅林', time: '2018-10-31', text: '商品很好' },
    ],
    details:{},
    collection:false,
    anima:false,
    animationData:'',
    model:[
      { name: "4G内存, 2080Ti"},
      { name: "4G内存, 2080Ti" },
      { name: "4G内存, 2080Ti,4G内存" },
      { name: "4G内存" },
      { name: "4G内存, 2080Ti" },
    ],
    _nun:0,
    array:[],
    number: 1,
    price:0
  },


  // 选择型号
  selectModel:function(e){
    var id=e.currentTarget.dataset.id
    // console.log(id)
    this.setData({
      _nun:id
    })
  },
  swiTch:function(e){
    // console.log(e)
    var id=e.target.dataset.id
    this.setData({
      _num:id
    })
  },

  // 收藏切换
  targetCollection:function(){
    if(this.data.collection){
      this.setData({
        collection:false
      })
    }else{
      this.setData({
        collection: true
      })
    }
  },

  // 购物车弹出动画
  showModal:function(){
    // 在规格选择的时候,将价格改为商品价格
    this.setData({
      price: this.data.details.unitPrice
    })
    // 显示遮罩层
    var animation=wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0,
    });
    this.animation=animation;
    animation.translateY(400).step()
    this.setData({
      animationData:animation.export(),
      anima:true
    });
    setTimeout(function(){
      animation.translateY(0).step()
      this.setData({
        animationData:animation.export(),
      })
    }.bind(this),50)
  },

  // 购物车弹出动画
  hideModal:function(){
    // 隐藏遮罩层
    var animation=wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0, 
    })
    this.animation=animation;
    animation.translateY(400).step()
    this.setData({
      animationData:animation.export(),
    })
    // console.log(1)
    setTimeout(function(){
      animation.translateY(0).step()
      this.setData({
        animationData:animation.export(),
        anima:false
      })
    }.bind(this),150)
  },

  // 滑动选择改变数量后触发的事件
  bindPickerChange: function (e) {
    // console.log(e)
    var val = parseInt(e.detail.value)
    var pri = this.data.details.price * this.data.array[val]
    this.setData({
      number: val,
      price:pri
    })
  },

  // +和-改变数量
  calCulation: function (e) {
    var cal = parseInt(e.target.dataset.cal)
    var ind = this.data.number + cal
    // console.log(cal)
    if (ind == 0) {
      ind = 1
    } else if (ind >= 99) {
      ind = 99
    }
    var pri=this.data.details.unitPrice*this.data.array[ind]
    
    this.setData({
      number: ind,
      price:pri
    })
  },
  // 将购物车商品信息存入缓存
  setStorage:function(){
    var arr=wx.getStorageSync('details') || []
    // console.log(arr)
    var deta = {
      details: this.data.details.description,
      price: this.data.details.unitPrice,
      number: this.data.number,
      modex: this.data.model[this.data._nun].name,
      state:false
    }
    
    arr.push(deta)
    wx.setStorage({
      key: 'details',
      data: arr,
      success:res=>{
        wx.showToast({
          title: '商品添加成功',
        })
        this.hideModal()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取数量选择数据
    this.setData({
      array:app.globalData.array
    })
    
    var data=JSON.parse(options.data)
    this.setData({
      details:data
    })
    // console.log(this.data.details)
    // console.log(a)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showShareMenu({
      withShareTicket:true
    })
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
  onShareAppMessage: function (res) {
    // console.log(res)
    var data = JSON.stringify(this.data.details)
    return {
      title: this.data.details.description,
      path: 'pages/details/details?data='+data
    }
  }
})