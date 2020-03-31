import {
  request
} from '../../request/index'

var replace = require('../../utils/replaceSChar.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gzhList: [],
    gzhDataList: [],
    gzhCurrentIndex: 0,
    gzhRequestUrl: [],
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //缓存数据
    const gzhs = wx.getStorageSync("gzhs")
    if (!gzhs) {
      this.getGzhList()
    }
    else {
      //过期时间
      if (Date.now() - gzhs.time > 1000 * 60 * 60 * 12) {
        this.getGzhList()
      }
      else {
        console.log("gzhs取缓存")
        this.setData({
          gzhList: gzhs.data
        })
        this.getGzhRequestUrl()
      }
    }

    this.getGzhDataList()

  },

  getGzhList() {

    request({
      url: 'https://wanandroid.com/wxarticle/chapters/json'
    })
      .then((res) => {

        //console.log(res.data.data)
        var result = res.data.data
        result.map((res) => {
          res.name = replace.replaceSpecialChar(res.name)
          return res
        })
        wx.setStorageSync("gzhs", { time: Date.now(), data: result })
        this.setData({
          gzhList: result
        })
        this.getGzhRequestUrl()
      })

  },

  getGzhRequestUrl() {

    //请求分类url
    //console.log(this.data.gzhList)
    var url = []
    for (var i = 0; i < this.data.gzhList.length; i++) {
      url.push(this.data.gzhList[i].id)
      //console.log(this.data.gzhList[i].id)
    }
    this.setData({
      gzhRequestUrl: url
    })

  },

  getGzhDataList() {

    request({
      url: 'https://wanandroid.com/wxarticle/list/408/1/json'
    })
      .then((res) => {
        //console.log(res.data.data.datas)
        var result = res.data.data.datas
        result.map((res) => {
          res.title = replace.replaceSpecialChar(res.title)
          res.link = replace.replaceSpecialChar(res.link)
          return res
        })
        this.setData({
          gzhDataList: result
        })
      })

  },

  gzhSelected(e) {
    //console.log(e.currentTarget.dataset.index)
    //console.log(e.currentTarget)
    this.setData({
      gzhCurrentIndex: e.currentTarget.dataset.index
    })

    this.gzhRequestUtil(this.data.gzhRequestUrl[this.data.gzhCurrentIndex])

    var query = wx.createSelectorQuery();
    query.select('.right_view').boundingClientRect((res) => {
      //console.log('res: ', res)
      this.setData({
        scrollTop: 0
      })
      // res.top // 这个组件内xx节点的上边界坐标
    }).exec()


  },

  gzhRequestUtil(id) {

    request({
      url: 'https://wanandroid.com/wxarticle/list/' + id + '/1/json'
    })
      .then((res) => {
        //console.log(res.data.data.datas)
        var result = res.data.data.datas
        result.map((res) => {
          res.title = replace.replaceSpecialChar(res.title)
          res.link = replace.replaceSpecialChar(res.link)
          return res
        })
        this.setData({
          gzhDataList: result
        })
      })

  },

  // prevImage(e) {

  //   var src = e.currentTarget.dataset.src
  //   var srcs = []
  //   srcs.push(src)
  //   //console.log(e.currentTarget.dataset.src)
  //   wx.previewImage({
  //     current: src, // 当前显示图片的http链接
  //     urls: srcs // 需要预览的图片http链接列表 必须是数组 否则无效
  //   })

  // },

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