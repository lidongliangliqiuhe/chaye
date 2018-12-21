// pages/profile/profile.js
var app = getApp()
Page({
  handleplay: function () {
    var isp = this.data.isPlaying;
    if (isp) {
      wx.pauseBackgroundAudio();
      this.setData({ isPlaying: false })
    } else {
      this.setData({ isPlaying: true });
      wx.playBackgroundAudio({
        dataUrl: 'http://192.168.43.93:3000/audio/gaoshanliushui.mp3',
      })
    }
  },
  toOrder:function(){
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    isPlaying: 0,
    userInfo: {},
    orderItems:[
      {
        typeId: 0,
        name: '待付款',
        url: 'bill',
        imageurl: 'http://192.168.43.93:3000/img/daifukuan.png',
      },
      {
        typeId: 1,
        name: '待发货',
        url: 'bill',
        imageurl: 'http://192.168.43.93:3000/img/daifahuo.png',
      },
      {
        typeId: 2,
        name: '待收货',
        url: 'bill',
        imageurl: 'http://192.168.43.93:3000/img/daishouhuo.png'
      },
      {
        typeId: 3,
        name: '待评价',
        url: 'bill',
        imageurl: 'http://192.168.43.93:3000/img/daipingjia.png'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*if (app.globalData.userInfo){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }*/
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