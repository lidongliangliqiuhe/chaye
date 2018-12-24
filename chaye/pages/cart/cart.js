// pages/cart/cart.js
const app = getApp()
Page({
  Minus: function (e) {
    var num = this.data.carts[e.target.dataset.id].gcount;
    var num1 = "carts[" + e.target.dataset.id+"].gcount";
    if (num > 1) {
      num--;
    }
    this.data.totalMoney = this.data.totalMoney + this.data.carts[e.target.dataset.id].cprice * -1 * this.data.isSelect[e.target.dataset.id]; 
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      [num1]: num,
      minusStatus: minusStatus,
      totalMoney:this.data.totalMoney
    })
  },
  /*点击加号*/
  Plus: function (e) {
    var num = this.data.carts[e.target.dataset.id].gcount;
    var num1 = "carts[" + e.target.dataset.id + "].gcount";
    num++;
    this.data.totalMoney = this.data.totalMoney + this.data.carts[e.target.dataset.id].cprice * 1 * this.data.isSelect[e.target.dataset.id];
    this.setData({
      [num1]: num,
      totalMoney:this.data.totalMoney
    })
  },
  /*输入框事件*/
  bindManual: function (e) {
    var num = e.detail.value;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    var num1 = "carts[" + e.target.dataset.id + "].gcount";
    num++;
    this.setData({
      [num1]: num,
      minusStatus: minusStatus
    })
  },

  switchSelect:function(e){
    var shifouxuan = this.data.isSelect[e.target.dataset.id];
    shifouxuan++
    var isSelectxuan=shifouxuan%2;
    console.log(isSelectxuan)
    var isSelect ="isSelect["+e.target.dataset.id+"]";
    this.setData({
      [isSelect]:isSelectxuan
    })
    if(isSelectxuan==0){
      isSelectxuan=-1
    }
    this.data.totalMoney = this.data.totalMoney + this.data.carts[e.target.dataset.id].cprice * this.data.carts[e.target.dataset.id].gcount * isSelectxuan;
    console.log(this.data.totalMoney)
    this.setData({
      totalMoney: this.data.totalMoney
    })
    var quanxuan = this.data.isSelect
    for (var i = 0; i < quanxuan.length; i++) {
      if (quanxuan[i] == 0) {
        this.setData({
          isAllSelect: false
        })
        break;
      }
      this.setData({
        isAllSelect: true
      })
    }
  },
  allSelect:function(e){
    var i = 0;
    if (!this.data.isAllSelect) {
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.isSelect[i] = true;
        this.data.totalMoney = this.data.totalMoney + this.data.carts[i].cprice * this.data.carts[i].gcount;
      }
    }
    else {
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.isSelect[i] = false;
      }
      this.data.totalMoney = 0;
    }
    this.setData({
      isAllSelect: !this.data.isAllSelect,
      isSelect:this.data.isSelect,
      totalMoney: this.data.totalMoney,
    })
  },
  toBuy:function(){
    wx.showToast({
      title: '去结算',
      icon: 'success',
      duration: 3000
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    minusStatus: 'normal',
    isAllSelect: false,
    isSelect:[],
    totalMoney: 0,
    carts: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://192.168.43.93:3000/getCarts',
      success: (res) => {
        if(res.data.code==1){
          this.setData({
            carts: res.data.data
          });
          for(var i=0;i<res.data.data.length;i++){
            var shifouxuanzhong = 'isSelect['+i+"]"
            this.setData({
              [shifouxuanzhong]:0
            })
          }
        }
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