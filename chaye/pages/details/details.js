// pages/details/details.js
var app = getApp()
Page({
  Minus: function (e) {
    var num = this.data.item.gcount;
    var num1 = "item.gcount";
    if (num > 1) {
      num--;
    }
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      [num1]: num,
      minusStatus: minusStatus
    })
  },
  /*点击加号*/
  Plus: function (e) {
    var num = this.data.item.gcount;
    var num1 = "item.gcount";
    num++;
    var minusStatus = 'normal';
    this.setData({
      [num1]: num,
      minusStatus: minusStatus
    })
  },
  buy:function(){
    wx.showToast({
      title: '购买成功',
      icon: "success",
      duration: 2000,
      mask: true,
    })
  },
  cart:function(){
    console.log(app.globalData.userInfo[0].uid)
    console.log(this.data.index)
    var cid = this.data.index
    var uid = app.globalData.userInfo[0].uid;
    wx.request({
      url: 'http://192.168.43.93:3000/addCartItem',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 改变默认值
      },
      data: {
        cid: cid,
        uid: uid
      },
      success: (res) => {
        wx.showToast({
          title: '购物车添加成功',
          icon: "success",
          duration: 2000,
          mask: true,
        })
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    num:1,
    info:[],
    minusStatus:"normal",
    index:0,
    item:{
      gcount:1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.request({
      url: 'http://192.168.43.93:3000/getdetail',
      method:"get",
      data:{
        cid:options.cid
      },
      success:(res)=>{
        //console.log(res.data[0])
        this.setData({
          info:res.data[0],
          index:res.data[0].cid
        })
        //console.log(this.data.index)
      }
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