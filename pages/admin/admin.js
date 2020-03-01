// admin/admin.js
const db=wx.cloud.database()
const address=db.collection('address')
const person=db.collection('customer')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressArray:[],
    addressIndex:0,
    personArray:{}
  },

  /**
   * 点击“设置为负责人”按钮
   */
  setPrimary: function (e) {
    let input=e.detail.value.input
    
  },

  setAddress:function () {
    let add=address.field({
      name:true,
      _id:false
    }).get({
      success:res=>{
        var result=[res.data.length]
        for (let index = 0; index < res.data.length; index++) {
          //const result[index]=res.data[index].name
        }
        res.data[0].name,
        console.log(result),
        this.setData({
          addressArray:result
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setAddress()
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

    wx.navigateBack({
      url:'../index/index'
    })
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