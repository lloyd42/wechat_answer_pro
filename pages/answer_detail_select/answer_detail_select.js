import {
  request
} from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerList: [],
    isShow: false,
    questionBoolean: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.getAnswerList(options.gid)

  },

  getAnswerList(gid) {

    request({
        url: "http://localhost:8080/answer/select/" + gid
      })
      .then((res) => {
        this.setData({
          answerList: res.data
        })
      })

  },

  radioChange(e) {

    //console.log(e)
    var index = e.currentTarget.dataset.index
    var answer = e.currentTarget.dataset.answer
    var value = e.detail.value
    //console.log(answer + "*****" + value)
    if (answer == value) {

      this.data.questionBoolean[index] = "正确"
      this.setData({
        questionBoolean: this.data.questionBoolean
      })
      //console.log(this.data.questionBoolean)

    } else {
      this.data.questionBoolean[index] = "错误"
      this.setData({
        questionBoolean: this.data.questionBoolean
      })

    }

  },

  tapSubmit() {

    if (this.data.questionBoolean.length < 5) {
      wx.showToast({
        icon: 'none',
        title: '提示：有题目没有作答',
      })
      return
    } else {

      wx.showModal({
        title: '提交',
        content: '确定要提交吗？',
        success: (res) => {
          if (res.confirm) {
            this.setData({
              isShow: true
            })
          } else {

          }
        }
      })

      //console.log("show~~~~~~~~")

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