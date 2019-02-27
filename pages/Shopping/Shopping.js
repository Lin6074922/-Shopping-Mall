// pages/Shopping/Shopping.js
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    // 获取购物车信息,
    shopping:[],
    allElection:false,
    total:0,
    // 判断是否全部为true
    ifAll:[]
  },

  // 单选将价格加入总价
  increase:function(i){
    this.data.total += this.data.shopping[i].price * this.data.shopping[i].number
    this.setData({
      total:this.data.total
    })
  },

  // +/-改变总价
  indAndDec:function(cal,i){
    // cal是1或-1
    // i是当前元素下标
    var tem=this.data.shopping[i]
    var tot=this.data.total
    // console.log(tem)
    // tot+=tem.price
    if(tem.state){
      if(tem.number>1 && tem.number<99){
        tot+=tem.price*cal
      }
    }else{
      tem.state=true
      if(tem.number+cal==0){
        tem.number=2
      }
      tot+=tem.price*(tem.number+cal)
      // console.log(tem.number + cal)
    }
    // tem.state=true
    // console.log(tot)
    this.setData({
      total:tot
    })
  },

  // 如果全部选中则改变全选icon
  ifAllElection:function(){
    for(var item of this.data.shopping){
      if(item.state){
        this.setData({
          allElection: true
        })
      }else{
        // console.log(item.state)
        this.setData({
          allElection: false
        })
        return
      }
    }
  },

  // 改变是否选中状态
  state:function(e){
    var i=e.target.dataset.index
    var tem = this.data.shopping[i]
    // console.log(tem)
    // console.log(i)
    if (tem.state){
      // 取消
      tem.state=false
      // this.data.total -= this.data.shopping[i].price * this.data.shopping[i].number
      this.data.total-=tem.price*tem.number
      this.setData({
        allElection:false
      })
    }else{
      // 选中
      tem.state=true
      // this.data.total += this.data.shopping[i].price * this.data.shopping[i].number
      this.data.total += tem.price * tem.number
    }

    // 决定全选框的样式
    this.ifAllElection()

    this.setData({
      shopping:this.data.shopping,
      total:this.data.total
    })
  },

  // 购物车全选与反选
  allElection:function(){
    if (this.data.allElection){
      // 反选
      this.data.allElection=false
      for(var item of this.data.shopping){
        if(item.state){
          item.state=false
        }
        // console.log(item)
      }
      this.setData({
        total:0
      })
    }else{
      this.data.allElection=true
      // 全选
      for (var item of this.data.shopping) {
        if (!item.state) {
          item.state = true
          this.data.total+=item.price*item.number
        }
        // console.log(item)
      }
      
    }
    this.setData({
      allElection: this.data.allElection,
      shopping:this.data.shopping,
      total:this.data.total
    })
  },

  // 滑动选择改变数量后触发的事件
  bindPickerChange:function(e){
    // console.log(e)
    var val = parseInt(e.detail.value)
    var i = parseInt(e.target.dataset.index)
    // console.log(i)
    this.data.shopping[i].number=val
    this.setData({
      // number:val
      shopping: this.data.shopping
    })
  },
  // +和-改变数量
  calCulation:function(e){
    var cal = parseInt(e.target.dataset.cal)
    var i=e.currentTarget.dataset.index
    var tmp = this.data.shopping[i].number;
    // var smp = this.data.shopping[i].price
    // var ind=tmp / smp
    var tm=tmp+cal
    if (tm < 1){
      tm=1
    }else if(tm>99){
      tm=99
    }

    // 计算总价
    this.indAndDec(cal,i)
    // 改变滑动选择框的下标以改变数量
    this.data.shopping[i].number=tm
    // 判断是否全部选择，如果全选则改变全选框
    this.ifAllElection()

    // this.data.shopping[i].total = tmp + smp*cal

    this.setData({

       shopping:this.data.shopping
      
    })

  },

  // 删除某条购物车数据
  deLete:function(e){

    var i=e.target.dataset.index
    // 删除数据
    // console.log(this.data.shopping[i])
    wx.showModal({
      title: '确认',
      content: '是否删除商品',
      success:res=>{
        // console.log(res)
        if(res.confirm){
          var pri=this.data.shopping[i].price*this.data.shopping[i].number
          if(!this.data.shopping[i].state){
            pri=0
          }
          this.data.total-=pri
          this.data.shopping.splice(i,1)
          // 将价格从总价中删除

          this.setData({
            shopping:this.data.shopping,
            total: this.data.total
          })
          wx.showToast({
            title: '商品删除成功',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 循环生成滑动选择数量的数据
    this.setData({
      array:app.globalData.array
    })

    
   

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
    // 获取缓存中的购物车信息
    wx.getStorage({
      key: 'details',
      success: res => {
        this.setData({
          shopping: res.data
        })
        // console.log(res.data[0].number)
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 离开购物车组件后将购物车的剩余数据覆盖到缓存中
    wx.setStorage({
      key: 'details',
      data: this.data.shopping,
    })
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