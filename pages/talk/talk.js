// pages/talk/talk.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: "",
    talker: '',
    avatar: '',
    uAvatar: '',
    myMess: "",
    Mess: [],
    Mess1: [],
    Mess2: [],
    isOpen: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.socketConnect(options.name)
    var name = options.name
    var avatar = options.avatar
    this.setData({
      talker: name
    })
    if (name == "Panda") {
      this.setData({
        Mess: this.data.Mess1
      })
    } else if (name == "Ice Bear") {
      this.setData({
        Mess: this.data.Mess2
      })
    }
    wx.setNavigationBarTitle({
      title: name,
    })
    const userInfo = wx.getStorageSync("userInfo")
    this.setData({
      avatar: avatar,
      uAvatar: userInfo.avatarUrl
    })
  },

  socketConnect(receiver) {
    const userInfo = wx.getStorageSync("userInfo")
    wx.connectSocket({
      url: 'ws://localhost:8080/websocket/' + userInfo.nickName + '/to/' + receiver,
      success: () => {
        console.log("连接成功~")
      },
      fail: () => {
        console.log("连接失败~")
      }
    })

    wx.onSocketOpen((res) => {
      this.setData({
        isOpen: true
      })
      wx.showToast({
        title: 'socket 打开',
        icon: 'none'
      })
      wx.onSocketMessage((res) => {
        console.log("socket 消息：" + res.data)
        var datas = res.data.split(':')
        console.log(datas[0], datas[1])
        if (datas[0] == "Panda") {
          if (datas[0] = this.data.talker) {
            this.data.Mess1.push({ who: "Panda", content: datas[1] })
            this.setData({
              Mess: this.data.Mess1
            })
          }
        } else if (datas[0] == "Ice Bear") {
          if (datas[0] = this.data.talker) {
            this.data.Mess2.push({ who: "Ice Bear", content: datas[1] })
            this.setData({
              Mess: this.data.Mess2
            })
          }
        }
        this.setData({
          num: "no" + this.data.Mess.length
        })
      })
    })

    wx.onSocketClose((res) => {
      this.setData({
        isOpen: false
      })
      wx.showToast({
        title: 'socket 关闭',
        icon: 'none'
      })
    })

    wx.onSocketError((res) => {
      this.setData({
        isOpen: false
      })
      wx.showToast({
        title: 'socket 错误',
        icon: 'none'
      })
    })

  },

  handleInput(e) {
    this.setData({
      myMess: e.detail.value
    })
  },

  sendMess(e) {
    //var mess = e.currentTarget.dataset.mess
    if (this.data.isOpen) {
      wx.sendSocketMessage({
        data: this.data.myMess
      })
    } else {
      wx.showToast({
        title: 'socket 没有连接',
        icon: 'none'
      })
      return false
    }
    var my = this.data.myMess
    console.log(my)
    this.data.Mess1.push({ who: "user", content: my })
    this.setData({
      Mess: this.data.Mess1
    })
    this.data.Mess2.push({ who: "user", content: my })
    this.setData({
      Mess: this.data.Mess2
    })
    this.setData({
      num: "no" + this.data.Mess.length
    })
    this.setData({
      myMess: ""
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
    if (this.data.isOpen) {
      wx.closeSocket({
        success: () => {
          console.log("socket 关闭成功")
        }
      })
    }
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