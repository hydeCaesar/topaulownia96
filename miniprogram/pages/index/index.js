//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

  onReady: function () {
    this.total = 10
    this.position = {
      x: 150,
      y: 150,
      vx: 1,
      vy: 1
    }

    this.drawBall()
    this.interval = setInterval(this.drawBall, 27)
  },

  //画图，每次画的都是new的东西，所以不能用随机数
  drawBall: function () {
    var p = this.position
    p.x +=p.vx*Math.random()*7
    p.y += p.vy*Math.random()*7
    if (p.x >=320 ) {
      p.vx = -Math.random()
    }
    if (p.x <= 7) {
      p.vx = Math.random()
    }
    if (p.y >= 568) {
      p.vy = -Math.random()
    }
    if (p.y <= 7) {
      p.vy = Math.random()
    }

    var context = wx.createCanvasContext("firstcanvas")

    function ball(x, y) {
      //开始
      context.beginPath(0)
      //画圆
      context.arc(x, y, 5, 0, Math.PI * 2)
      context.setFillStyle('#1aad19')
      context.setStrokeStyle('rgba(1,1,1,0)')
      context.fill()
      context.stroke()
    }

    // for (var i = 0; i < this.total; i++) {
    //   ball(Math.random() * 320, Math.random() * 568)
    // }
    ball(p.x, 120)
    ball(200, p.y)
    ball(356 - p.x, 440)
    ball(200, 568- p.y)
    ball(p.x, p.y)
    ball(300 - p.x, 300 - p.y)
    ball(p.x, 300 - p.y)
    ball(300 - p.x, p.y)

    wx.drawCanvas({
      canvasId: 'firstcanvas',
      actions: context.getActions()
    })
  },
  onUnload: function () {
    clearInterval(this.interval)
  }



})
