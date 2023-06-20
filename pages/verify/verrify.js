const app=getApp()
const db=wx.cloud.database()
const admin=db.collection("admin")
// pages/verify/verrify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    verifyNumber:"sf6666"
  },

  /**
   * 获取表单数据
   */
  formSubmit: function (e) {
    let input = e.detail.value.input
    let verifyNumber=this.data.verifyNumber
    if (input == verifyNumber) {
      admin.add({
        data:{
          description:"增加新的管理员",
          isAdmin:true,
          date:new Date()
        }
      })
      wx.navigateTo({
        url: '../admin/admin',
      })
    }
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

  }
})