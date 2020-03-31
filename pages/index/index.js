import {
  request
} from '../../request/index'

var replace = require('../../utils/replaceSChar.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //  轮播图数组
    swiperList: [],
    // 导航数组
    navList: [{
      icon: 'icon-fenlei',
      id: 1001,
      text: '分类'
    },
    {
      icon: 'icon-tixi',
      id: 1002,
      text: '体系'
    },
    {
      icon: 'icon-guangchang',
      id: 1003,
      text: '广场'
    },
    {
      icon: 'icon-gzh',
      id: 1004,
      text: '公众号'
    },
    ],
    // 楼层数据
    // floorList: [{
    //     topFloorList: [],
    //     title: '置顶文章'
    //   },
    //   {
    //     newFloorList: [],
    //     title: '最新文章'
    //   }
    // ]
    topFloorList: [],
    newFloorList: [],
    newTotalPage: 0,
    newCurrentPage: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {

    wx.showLoading({
      title: '加载中',
    })
    await this.getSwiperList()
    await this.getTopFloorList()
    await this.getNewFloorList()
    wx.hideLoading()

  },

  getSwiperList() {

    request({
      url: "https://www.wanandroid.com/banner/json"
    })
      .then((res) => {
        this.setData({
          swiperList: res.data.data
        })
      })

  },

  getTopFloorList() {

    request({
      url: "https://www.wanandroid.com/article/top/json"
    })
      .then((res) => {
        var result = res.data.data
        result.map((res) => {
          res.title = replace.replaceSpecialChar(res.title)
          res.link = replace.replaceSpecialChar(res.link)
          return res
        })
        this.setData({
          topFloorList: result
        })
      })

  },

  getNewFloorList() {

    request({
      url: 'https://www.wanandroid.com/article/list/' + this.data.newCurrentPage + '/json'
    })
      .then((res) => {
        //console.log(res.data.data.datas);

        var result = res.data.data.datas
        var total = res.data.data.pageCount
        var current = res.data.data.curPage
        result.map((res) => {
          res.title = replace.replaceSpecialChar(res.title)
          res.link = replace.replaceSpecialChar(res.link)
          return res
        })
        this.setData({
          newFloorList: this.data.newFloorList.concat(result),
          newTotalPage: total,
          newCurrentPage: current
        })
      })

  },

  navSelected(e) {
    //console.log(e.currentTarget.dataset.index)
    switch (e.currentTarget.dataset.index) {
      case 0:
        wx.navigateTo({
          url: '../../pages/category/category',
        })
        break
      case 1:
        wx.navigateTo({
          url: '../../pages/system/system',
        })
        break
      case 2:
        wx.navigateTo({
          url: '../../pages/share/share',
        })
        break
      case 3:
        wx.navigateTo({
          url: '../../pages/gzh/gzh',
        })
        break
      default:
        break
    }
  },

  webTap(e) {

    //console.log(e.currentTarget.dataset.src)
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

    wx.showLoading({
      title: '下拉刷新中...',
    })
    this.setData({
      swiperList: [],
      topFloorList: [],
      newFloorList: [],
      newTotalPage: 0,
      newCurrentPage: 0
    })
    this.getSwiperList()
    this.getTopFloorList()
    this.getNewFloorList()
    wx.hideLoading()
    wx.stopPullDownRefresh()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    if (this.data.newCurrentPage >= this.data.newTotalPage) {
      wx.showToast({
        title: '到底啦~',
      })
      return false
    } else {

      this.getNewFloorList()

    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})