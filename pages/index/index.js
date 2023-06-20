//index.js
//获取应用实例
const app = getApp()

const UNPROMPTED=0    //未提示的
const UNAUTHORIZED=1  //未授权的
const AUTHORIZED=2    //已授权的

const db=wx.cloud.database()
const admin=db.collection("admin")

Page({
  data: {
    buyer:'我是消费者',
    admin:'我是管理员',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    authType: UNPROMPTED
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //“我是消费者”按钮被点击
  onTapCheckBuyer: ()=> {
    wx.navigateTo({
      url: '../buyer/buyer',
    })
  },
  //“我是管理员”按钮被点击
  onTapCheckAdmin: ()=> {
    wx.cloud.callFunction({
      name:'getId',
      success:(res=>{
        if (res.result.data.length != 0) {
          wx.navigateTo({
            url: '../admin/admin',
          })
        } else {
          wx.navigateTo({
            url: '../verify/verrify',
          })
        }
      })
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
      this.setData({
        authType:hasUserInfo?AUTHORIZED:(hasUserInfo===false)?UNAUTHORIZED:UNPROMPTED
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
