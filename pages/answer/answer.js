import {
  request
} from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.showLoading({
      title: '加载中',
    })
    await this.getAnswer()
    wx.hideLoading()
  },

  getAnswer() {

    request({
      url: "http://localhost:8080/answer" //113.240.252.244 localhost
    })
      .then((res) => {
        this.setData({
          answerList: res.data
        })
      })
      .catch((err) => {
        wx.showToast({
          title: '请求出错',
          icon: 'none'
        })
      })

  },

  answerTap(e) {

    var gid = e.currentTarget.dataset.gid
    var type = e.currentTarget.dataset.type
    //console.log(gid)

    wx.navigateTo({
      url: '../../pages/answer_detail_' + type + '/answer_detail_' + type + '?gid=' + gid,
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