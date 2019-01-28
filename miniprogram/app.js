//app.js
App({
  row: 12,//扫雷游戏的行数
  column: 8,//扫雷游戏的列数
  bomb: 8,//包含雷的总数

  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}
  }
  
})
