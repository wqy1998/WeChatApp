// admin/admin.js
const db=wx.cloud.database()
const address=db.collection('address')
const customer=db.collection('customer')
const admin=db.collection('admin')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressArray:[],
    addressIndex:'',
    addressIndex1:'',
    customerArray:[],
    customerIndex:''
  },

  /**
   * 点击“设置为负责人”按钮
   */
  submitPrimary: function (e) {
    let value=(e.detail.value)
    let id=e.detail.target.id
    
    if (id=="set") {
      this.set(value)
    }
    if (id=="search"){
      this.search()
    }
  },

  set:function (value) {
    let address=this.data.addressArray[value.add]
    let primary=this.data.customerArray[value.pri]
    if (address!=undefined && primary!=undefined){
      customer.where({
        address:address,
        name:primary
      }).update({
        data:{
          name:primary+'(负责人)'
        },
        success:()=>{
          wx.showToast({
            title: '设置成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: () => {
          wx.showToast({
            title: '设置失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else {
      wx.showToast({
        title: '请选择地址或负责人！',
        icon: 'none',
        duration: 2000
      })
    }
  },

  search:function () {
    wx.navigateTo({
      url: '../logs/logs?isAdmin=true&addressArray='+this.data.addressArray,
    })
  },

  setAddress:function (e) {
    this.setData({
      addressIndex:e.detail.value
    })
    let address_name=this.data.addressArray[e.detail.value]
    customer.where({
      address:address_name
    }).get({
      success:res=>{
        var result = []
        var l = res.data.length
        for (let index = 0; index < l; index++) {
          result.push(res.data[index].name)
        }
        this.setData({
          customerArray:result
        })
      }
    })
  },

  setAddress1:function (e) {
    this.setData({
      addressIndex1:e.detail.value
    })
  },

  setPrimary:function (e) {
    this.setData({
      customerIndex:e.detail.value
    })
  },

  getAddress:function () {
    address.get({
      success:res=>{
        var result = []
        var l = res.data.length
        for (let index = 0; index < l; index++) {
          result.push(res.data[index].address_name)
        }
        this.setData({
          addressArray:result
        })
      }
    })
  },

  getPrimary: function (address_name) {
    customer.where({
      address:address_name
    }).field({
      name:true
    }).get({
      success:res=>{
        var result=[]
        var l=res.data.length
        for (let index = 0; index < l; index++) {
          result.push(res.data[index].name)
        }
        this.setData({
          customerArray:result
        })
      }
    })
  },
  
  addAddress: function (e) {
    if (e.detail.value.newAddress=="") {
      wx.showToast({
        title: '请输入地址！',
        icon: 'none',
        duration: 2000
      })
    } else {
      address.add({
        data:{
          address_name:e.detail.value.newAddress
        },
        success:()=>{
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail:()=>{
          wx.showToast({
            title: '添加失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },

  send:function (e) {
    let add=this.data.addressArray[e.detail.value.add]
    address.where({
      address_name:add
    }).remove({
      success:()=>{
        customer.where({
          address:add
        }).update({
          data:{
            isSend:'已送达'
          },
          success:()=>{
            wx.showToast({
              title: '发货成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail:()=>{
            wx.showToast({
              title: '发货失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
      },
      fail:()=>{
        wx.showToast({
          title: '发货失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getAddress()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.navigateBack({
      url:'../index/index'
    })
  }
})