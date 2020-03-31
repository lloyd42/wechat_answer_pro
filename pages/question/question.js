// pages/question/question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    talkList: [{
      name: 'Panda',
      avatar: '../../icons/avatar1.jpeg'
    }, {
      name: 'Ice Bear',
      avatar: '../../icons/avatar2.jpeg'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  talkTap(e) {

    var avatar = e.currentTarget.dataset.avatar
    var name = e.currentTarget.dataset.name
    const userInfo = wx.getStorageSync("userInfo")
    if (userInfo) {
      wx.navigateTo({
        url: '../../pages/talk/talk?name=' + name + '&avatar=' + avatar,
      })
    } else {
      wx.showToast({
        title: '请先登录哦~',
        icon: 'none'
      })
      return false
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})