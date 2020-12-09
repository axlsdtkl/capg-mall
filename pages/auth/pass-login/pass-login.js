// pages/auth/pass-login/pass-login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: "",
    password: "",
    errorMsg: "",
    loading: false
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

  },
  onChangeMobile: function (e) {
    this.setData({
      mobile: e.detail
    })
  },
  onChangePass: function (e) {
    this.setData({
      password: e.detail
    })
  },
  login: function () {
    if (!this.data.mobile) {
      this.setData({
        errorMsg: "请输入账号名"
      })
      return;
    }
    
    if (!this.data.password) {
      this.setData({
        errorMsg: "请输入密码"
      })
      return;
    }
    this.setData({
      errorMsg: ""
    })
    console.log(getApp().globalData.server+'/member/login_mobile')
    wx.request({
      url: getApp().globalData.server+'/member/login_mobile', 
      data: {
        userName: this.data.mobile,
        userPwd: this.data.password,
        face_url: getApp().globalData.userInfo.avatarUrl,
      },
      method: "POST",
      header: {
        'content-type': "application/x-www-form-urlencoded" // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.result.state== 0) {
          wx.showModal({
            title: '提示！',
            content: '用户名或密码错误！',
            showCancel: false,
            success(res) { }
          })
        }else if (res.data.result.state == true) {
          getApp().globalData.userInfo.nickName=res.data.result.username;
          getApp().globalData.userInfo.username="注册用户"
          wx.showModal({
            title: '恭喜！',
            content: '登录成功！',
            showCancel: false,
            
            success(res) {},
            complete:function(res){
              wx.setStorageSync('isLogin', true);
              wx.navigateBack({
                delta: 2
              })
            }
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '哎呀！',
          content: '网络不在状态呢！',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
    // 模拟登录成功
    // this.setData({
    //   loading: true
    // })
    // let that = this;
    // setTimeout(function () {
    //   that.setData({
    //     loading: false
    //   })
    //   // 记录登录标识
    //   wx.setStorageSync('isLogin', true);
    //   // 返回上一级
    //   wx.navigateBack({
    //     delta: 2
    //   })
    // }, 1000)
  },
  userRegister: function () {
    wx.redirectTo({
      url: '/pages/auth/user-register/user-register',
    })
  }
})