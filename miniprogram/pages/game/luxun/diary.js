// miniprogram/pages/game/luxun/diary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    warningInfo:  "以下内容可能包含轻微暴力血腥精神污染等",
    nextPage: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  changeButtonYes: function ()  {
    this.setData({
      warningInfo : "在凝视深渊的时候，请闭上眼",
      nextPage : true,
    })
  },

  changeButtonCancel: function  ()  {
    this.setData({
      warningInfo: "当背后指向前方，已无路可逃",
      nextPage: true,
    })
  }
})