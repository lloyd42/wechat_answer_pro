import {
  request
} from '../../request/index'

var replace = require('../../utils/replaceSChar.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getShareList()

  },

  getShareList() {

    request({
      url: "https://wanandroid.com/user_article/list/0/json"
    })
      .then((res) => {
        var result = res.data.data.datas
        result.map((res) => {
          res.title = replace.replaceSpecialChar(res.title)
          return res
        })
        this.setData({
          shareList: result
        })
      })

  },

  webTap(e) {

    console.log(e.currentTarget.dataset.src)
    var src = e.currentTarget.dataset.src
    var title = e.currentTarget.dataset.title
    //encodeURIComponent(src) 字符串长度过长或者包含特殊字符
    wx.navigateTo({
      url: '../../pages/web_view/web_view?src=' + encodeURIComponent(src) + '&title=' + title,
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