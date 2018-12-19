// pages/home/home.js
Page({
  handler1:function(e){
    var pid=e.target.dataset.pid
    
    wx.navigateTo({
      url: "/pages/shoplist/shoplist?pid" + pid,
    })
  },
  /**
   * 页面的初始数据
   */

  data: {
    list:[
      { id: 1, img_url:"http://192.168.43.93:3000/img/lunbo_1.jpg"},
      { id: 2, img_url:"http://192.168.43.93:3000/img/lunbo_2.jpg"},
      { id: 3, img_url:"http://192.168.43.93:3000/img/lunbo_3.jpg"},
      { id: 4, img_url:"http://192.168.43.93:3000/img/lunbo_4.jpg"},
      ],
    jiugong:[
      { pid: 1, img_url:"http://192.168.43.93:3000/img/jiugongge1.jpg",msg:"全部商品"},
      { pid: 2, img_url:"http://192.168.43.93:3000/img/jiugongge2.jpg",msg:"福鼎白茶"},
      { pid: 3, img_url:"http://192.168.43.93:3000/img/jiugongge3.jpg",msg:"龙井"},
      { pid: 4, img_url:"http://192.168.43.93:3000/img/jiugongge4.jpg",msg:"花茶"},
      { pid: 5, img_url:"http://192.168.43.93:3000/img/jiugongge5.jpg",msg:"礼茶"},
      { pid: 6, img_url:"http://192.168.43.93:3000/img/jiugongge6.jpg",msg:"茶具"}
    ],
    tjlist:[
      { id: 1, img_url: "http://192.168.43.93:3000/img/tjlist/tjlist1.jpg", msg:"醉品叶界 中国茶礼 热销爆款 正山小种 特级 200g 红茶",price:"488.00"},
      { id: 2, img_url: "http://192.168.43.93:3000/img/tjlist/tjlist2.jpg", msg:"太姥瑞祥龙 福鼎白茶 2014年特级寿眉巧克力紧压茶 荼省心1441  240g",price:"288.00"},
      { id: 3, img_url: "http://192.168.43.93:3000/img/tjlist/tjlist3.jpg", msg:"凤山2006年安溪铁观音 拾叁老茶礼盒 陈香型252g",price:"390.00"},
      { id: 4, img_url: "http://192.168.43.93:3000/img/tjlist/tjlist4.jpg", msg:"1392 广东单丛 来自火山口的茶海洋传奇系列精选礼盒 160g",price:"518.00"},
      { id: 5, img_url: "http://192.168.43.93:3000/img/tjlist/tjlist5.jpg", msg:"一匠一品 三大名茶组合 2018年新茶 匠心之作 3盒装组合茶 150g 礼盒",price:"299.00"},
      { id: 6, img_url: "http://192.168.43.93:3000/img/tjlist/tjlist6.jpg", msg:"醉品朴茶 武夷岩茶 水仙 本朴DHP1680-250 125g*2盒 中火 特级",price:"342.00"}
    ]
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