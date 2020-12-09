// pages/auth/pass-login/pass-login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: "",
    password: "",
    password2:"",
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
  onChangeUserName: function (e) {
    this.setData({
      mobile: e.detail
    })
  },
  onChangePass: function (e) {
    this.setData({
      password: e.detail
    })
  },
  onChangePass2: function (e) {
    this.setData({
      password2: e.detail
    })
  },
  register: function () {
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
    if (!this.data.password2) {
      this.setData({
        errorMsg: "请再次输入密码"
      })
      return;
    }
    if (this.data.password!=this.data.password2) {
      this.setData({
        errorMsg: "两次输入密码不一致"
      })
      return;
    }
    this.setData({
      errorMsg: ""
    })

    

    // 模拟登录成功
    // this.setData({
    //   loading: true
    // })

    console.log(getApp().globalData.server+'/member/register_mobile')
    wx.request({
      url: getApp().globalData.server+'/member/register_mobile', 
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
        if (res.data.success == false) {
          wx.showModal({
            title: '提示！',
            content: '账号名已被注册！',
            showCancel: false,
            success(res) { }
          })
        }else if (res.data.success == true) {
          wx.showModal({
            title: '恭喜！',
            content: '注册成功！',
            showCancel: false,
            success(res) { },
            complete:function(res){
            
              wx.redirectTo({
                url: '/pages/auth/pass-login/pass-login',
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
  passLogin: function () {
    wx.redirectTo({
      url: '/pages/auth/pass-login/pass-login',
    })
  }
})