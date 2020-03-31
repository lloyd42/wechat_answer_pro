import {
  request
} from '../../request/index'

var replace = require('../../utils/replaceSChar.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    subIndex: 0,
    systemMainList: [],
    systemSubList: [],
    systemSubs: [],
    isMain: false,
    isSub: false,
    systemContentList: [],
    subUrlList: [],
    subUrls: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
    //缓存数据
    const system1 = wx.getStorageSync("system1")
    const system2 = wx.getStorageSync("system2")
    if (!system1 && !system2) {
      this.getSystemMainList()
    } else {
      //过期时间
      if (Date.now() - system1.time > 1000 * 60 * 60 * 12) {
        this.getSystemMainList()
      } else {
        console.log("system取缓存")
        this.setData({
          systemMainList: system1.data,
          systemSubList: system2.datalist,
          systemSubs: system2.data,
          subUrlList: system2.urlList,
          subUrls: system2.url
        })
      }
    }
    this.getSystemContentList()
    wx.hideLoading()
  },

  getSystemContentList() {

    request({
        url: 'https://www.wanandroid.com/article/list/0/json?cid=60'
      })
      .then((res) => {
        //console.log(res.data.data)
        var result = res.data.data.datas
        result.map((res) => {
          res.title = replace.replaceSpecialChar(res.title)
          return res
        })
        this.setData({
          systemContentList: result
        })

      })

  },

  getSystemMainList() {

    request({
        url: 'https://www.wanandroid.com/tree/json'
      })
      .then((res) => {
        //console.log(res.data)
        var names = res.data.data
        var subs = names.map((res) => {
          return res.children.map((res2) => {
            return res2.name
          })
        })
        var Urls =
          names.map((res) => {
            return res.children.map((res2) => {
              return res2.id
            })
          })
        names = names.map((res) => {
          return res.name
        })

        this.setData({
          systemMainList: names
        })
        wx.setStorageSync("system1", {
          time: Date.now(),
          data: names
        })
        this.setData({
          systemSubList: subs,
        })
        this.setData({
          systemSubs: this.data.systemSubList[this.data.index],
          subUrlList: Urls
        })
        this.setData({
          subUrls: this.data.subUrlList[this.data.index]
        })
        wx.setStorageSync("system2", {
          time: Date.now(),
          datalist: this.data.systemSubList,
          data: this.data.systemSubList[this.data.subIndex],
          urlList: this.data.subUrlList,
          urls: Urls[this.data.index]
        })
      })

  },

  mainSelected(e) {
    wx.showLoading({
      title: '加载中...',
    })
    //console.log(e.currentTarget.dataset.index)
    console.log("main: " + e.detail.value)
    this.setData({
      isMain: false,
      index: e.detail.value,
    })
    this.setData({
      systemSubs: this.data.systemSubList[this.data.index],
      subUrls: this.data.subUrlList[e.detail.value],
      subIndex: 0
    })
    var ids = this.data.subUrls
    this.systemRequestUtil(ids[0])
    wx.hideLoading()
  },

  mainTap() {
    this.setData({
      isMain: true
    })
  },

  mainCancel() {
    //console.log("maincancel")
    this.setData({
      isMain: false
    })
  },

  subSelected(e) {
    // console.log(e.currentTarget.dataset.subIndex)
    console.log("sub: " + e.detail.value)
    this.setData({
      isSub: false,
      subIndex: e.detail.value
    })

    var ids = this.data.subUrls
    this.systemRequestUtil(ids[this.data.subIndex])

  },

  subTap() {
    this.setData({
      isSub: true
    })
  },

  subCancel() {
    //console.log("subcancel")
    this.setData({
      isSub: false
    })
  },

  systemRequestUtil(id) {

    request({
        url: 'https://www.wanandroid.com/article/list/0/json?cid=' + id
      })
      .then((res) => {
        //console.log(res.data.data.datas)
        this.setData({
          systemContentList: res.data.data.datas
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