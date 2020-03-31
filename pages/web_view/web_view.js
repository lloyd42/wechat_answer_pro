// pages/web_view/web_view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    web_src: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.showLoading({
      title: '加载中',
    })
    //console.log(options)
    var src = decodeURIComponent(options.src);
    var title = decodeURIComponent(options.title);

    this.setData({
      web_src: src
    })
    wx.setNavigationBarTitle({
      title: title,
    })


  },

  loadHandler(e) {

    wx.hideLoading()

  },

  errorHandler(e) {

    wx.hideLoading()
    wx.showToast({
      title: '加载失败，请尝试再次打开',
    })

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