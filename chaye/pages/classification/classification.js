// pages/classification/classification.js
Page({
  navbarTap: function (e) {
    var that = this;
    console.log(e);
    this.setData({
      currentTab: e.currentTarget.id,   //按钮CSS变化
      screenId: e.currentTarget.dataset.screenid,
      scrollTop: 0,   //切换导航后，控制右侧滚动视图回到顶部
    })
    //刷新右侧内容的数据
    var screenId = this.data.screenId;
    request.sendRrquest(API_queryClassify, 'POST', { flag: 1, screenId: screenId })
      .then(function (res) {
        console.log("返回数据：");
        that.setData({
          childrenArray: res.data.data.screenArray[0],
        })
        console.log(that.data.childrenArray);
      }, function (error) { console.log("返回失败"); });
  },
  /**
   * 页面的初始数据
   */
  data: {
    styletab: 0,  //对应样式变化及后台查询字段
    scrollTop: 0,  //用作跳转后右侧视图回到顶部
    leftnav: [], //左侧导航栏内容
    peoducts: [], //右侧内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://192.168.43.93:3000/getClassList',
      success:(res)=>{
        console.log(res.data)
        this.setData({
          leftnav:res.data
        })
      }
    });
    wx.request({
      url: 'http://192.168.43.93:3000/getproducts',
      method:"get",
      data:{
        cleibie:1
      },
      success: (res) => {
        console.log(res.data)
        this.setData({
          products:res.data
        })
        
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