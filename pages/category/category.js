import {
  request
} from '../../request/index'

var replace = require('../../utils/replaceSChar.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList: [],
    cateDataList: [],
    cateCurrentIndex: 0,
    cateRequestUrl: [],
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //缓存数据
    const cates = wx.getStorageSync("cates")
    if (!cates) {
      this.getCateList()
    }
    else {
      //过期时间
      if (Date.now() - cates.time > 1000 * 60 * 60 * 12) {
        this.getCateList()
      }
      else {
        console.log("cates取缓存")
        this.setData({
          cateList: cates.data
        })
        this.getCateRequestUrl()
      }
    }

    this.getCateDataList()

  },

  getCateList() {

    request({
      url: 'https://www.wanandroid.com/project/tree/json'
    })
      .then((res) => {

        //console.log(res.data.data)
        var result = res.data.data
        result.map((res) => {
          res.name = replace.replaceSpecialChar(res.name)
          return res
        })
        wx.setStorageSync("cates", { time: Date.now(), data: result })
        this.setData({
          cateList: result
        })
        this.getCateRequestUrl()
      })

  },

  getCateRequestUrl() {

    //请求分类url
    var url = []
    for (var i = 0; i < this.data.cateList.length; i++) {
      url.push(this.data.cateList[i].id)
    }
    this.setData({
      cateRequestUrl: url
    })

  },

  getCateDataList() {

    request({
      url: 'https://www.wanandroid.com/project/list/1/json?cid=294'
    })
      .then((res) => {
        //console.log(res.data.data.datas)
        this.setData({
          cateDataList: res.data.data.datas
        })
      })

  },

  cateSelected(e) {
    console.log(e.currentTarget.dataset.index)
    //console.log(e.currentTarget)
    this.setData({
      cateCurrentIndex: e.currentTarget.dataset.index
    })

    this.cateRequestUtil(this.data.cateRequestUrl[this.data.cateCurrentIndex])

    var query = wx.createSelectorQuery();
    query.select('.right_view').boundingClientRect((res) => {
      //console.log('res: ', res)
      this.setData({
        scrollTop: 0
      })
      // res.top // 这个组件内xx节点的上边界坐标
    }).exec()


  },

  cateRequestUtil(id) {

    request({
      url: 'https://www.wanandroid.com/project/list/1/json?cid=' + id
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
          cateDataList: result
        })
      })

  },

  prevImage(e) {

    var src = e.currentTarget.dataset.src
    var srcs = []
    srcs.push(src)
    //console.log(e.currentTarget.dataset.src)
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: srcs // 需要预览的图片http链接列表 必须是数组 否则无效
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