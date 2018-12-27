// pages/home/home.js
var app = getApp()
Page({
  handleplay: function () {
    var isp=this.data.isPlaying;
    if(isp){
      wx.pauseBackgroundAudio();
      this.setData({isPlaying:false})
    }else{
      this.setData({isPlaying:true});
      wx.playBackgroundAudio({
        dataUrl: 'http://192.168.43.93:3000/audio/gaoshanliushui.mp3',
      })
    }
  },
  handler1:function(e){
    var pid=e.target.dataset.pid
    wx.navigateTo({
      url: "/pages/shoplist/shoplist?pid=" + pid,
    })
  },
  handler2:function(){
    var myurl="http://127.0.0.1:3000/imagelist";
    wx.request({
      url:myurl,
      success:(res)=>{
        console.log(res.data)
        //console.log(this) this 指的是当前的page对象
      }
    })
  },
  details:function(e){
    console.log(app.globalData.userInfo)
    //console.log(e.target.dataset.id)
    //console.log(this.data.tjlist)
    wx.navigateTo({
      url: '/pages/details/details?cid='+e.target.dataset.id,
    })
  },
  formName: function (e) {
    this.setData({
      sousuo: e.detail.value
    })
  },
  addCart:function(e){
    console.log(app.globalData.userInfo)
    var cid = e.target.dataset.cid;
    var uid = app.globalData.userInfo[0].uid;
    wx.request({
      url: 'http://192.168.43.93:3000/addCartItem',
      method:"post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 改变默认值
      },
      data:{
        cid:cid,
        uid:uid 
      },
      success:(res)=>{
        wx.showToast({
          title: '购物车添加成功',
          icon:"success",
          duration:2000,
          mask:true,
        })
      }
    })
  },
  /**
   * 页面的初始数据
   */

  data: {
    isPlaying:0,
    list:[],
    jiugong:[],
    tjlist:[],
    sousuo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://192.168.43.93:3000/imagelist',
      success:(res)=>{
        this.setData({
          list:res.data
        })
      }
    });
    wx.request({
      url: 'http://192.168.43.93:3000/jiugonggelist',
      success: (res) => {
        this.setData({
          jiugong: res.data
        })
      }
    });
    wx.request({
      url: 'http://192.168.43.93:3000/rementuijianlist',
      success: (res) => {
        this.setData({
          tjlist: res.data
        })
      }
    });
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