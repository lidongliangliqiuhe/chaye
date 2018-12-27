//app.js
App({
  onLaunch: function () {
    var that = this;
    wx.login({
      success: res => {
        wx.request({
          url: that.globalData.wx_url_1 + res.code + that.globalData.wx_url_2,
          success: res => {
            that.globalData.openid = res.data.openid;
          }
        })
      }
    });
  },
  globalData: {
    userInfo: null,
    loginName:null,
    urlPath:null,
    openid: 0,
    wx_url_1: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxe19249aa8c4ec1f0&secret=731ffa68f55180544578c86a3d1a9c09&js_code=',
    wx_url_2: '&grant_type=authorization_code'
  }
})