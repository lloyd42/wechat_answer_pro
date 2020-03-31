// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    rowList: [{
      name: '学习',
      num: 0
    },
    {
      name: '考试',
      num: 0
    },
    {
      name: '收藏',
      num: 0
    }
    ],
    columnList: [{
      icon: 'icon-lishi1',
      name: '浏览历史'
    }, {
      icon: 'icon-tuichu',
      name: '退出'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleGetUserInfo(e) {

    //console.log(e)
    const {
      userInfo
    } = e.detail
    if (userInfo) {
      wx.setStorageSync("userInfo", userInfo)
      const info = wx.getStorageSync("userInfo")
      this.setData({
        userInfo: info
      })
    } else {
      wx.showToast({
        title: '获取用户信息失败',
        icon: 'none'
      })
    }

  },

  columnTap(e) {

    var index = e.currentTarget.dataset.index

    switch (index) {
      case 0:

        break
      case 1:
        wx.showModal({
          title: '退出',
          content: '确定要退出吗？',
          success: (res) => {
            if (res.confirm) {
              wx.clearStorageSync()
              this.setData({
                userInfo: null
              })
            } else {

            }
          }
        })
        break
    }

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
    const userInfo = wx.getStorageSync("userInfo")
    this.setData({
      userInfo: userInfo
    })
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