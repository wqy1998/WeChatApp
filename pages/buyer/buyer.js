// pages/buyer/buyer.js
const db=wx.cloud.database()
const address=db.collection('address')
const customer=db.collection('customer')
const product={'乳鸽':'份 (100元/份，每份5只)','老鸽':'份 (80元/份，每份2只)','土鸡':'份 (80元/份，每份1只)','绿壳鸡蛋':'份 (60元/份，每份60个)','藕':'份 (20元/份，每份4斤)'}
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    phone:'',
    address:'',
    id:'',
    ruge:'',
    laoge:'',
    tuji:'',
    ou:'',
    egg:'',
    array:[],
    index:'',
    disabled:false,
    pro:product,
    hasBuy:false
  },

  submit:function (e) {
    let value=e.detail.value
    let type=e.detail.target.id
    if (type=="info") {
      this.info(value)
    }
    if (type=="update") {
      this.update(value)
    }
    if (type=="search") {
      this.search()
    }
  },

  info:function (value) {
    let name=value.name
    let phone=value.phone
    let address=value.address
    let id=value.id
    let ruge=value.ruge
    let laoge=value.laoge
    let tuji=value.tuji
    let ou=value.ou
    let egg=value.egg
    if (ruge == "") {
      ruge=0
    }
    if (laoge == "") {
      laoge=0
    }
    if (tuji == "") {
      tuji=0
    }
    if (ou == "") {
      ou=0
    }
    if (egg == "") {
      egg=0
    }
    if (name=="" || phone=="" || address=="" || id=="") {
      wx.showToast({
        title: '请将信息填写完整！',
        icon: 'none',
        duration: 2000
      })
    } else if (phone.length!=11) {
      wx.showToast({
        title: '手机号应为11位！',
        icon: 'none',
        duration: 2000
      })
    } else {
      var time = util.formatTime(new Date());
      customer.add({
        data:{
          name:name,
          phone:phone,
          address:this.data.array[address],
          id:id,
          ruge:ruge,
          laoge:laoge,
          tuji:tuji,
          ou:ou,
          egg:egg,
          isSend:'配送中',
          time:time
        },
        success:()=>{
          wx.showToast({
            title: '提交成功！',
            icon: 'success',
            duration: 2000
          })
        },
        fail:()=>{
          wx.showToast({
            title: '提交失败！',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },

  update:function (value) {
    let ruge=value.ruge
    let laoge=value.laoge
    let tuji=value.tuji
    let ou=value.ou
    let egg=value.egg
    if (ruge == "") {
      ruge=0
    }
    if (laoge == "") {
      laoge=0
    }
    if (tuji == "") {
      tuji=0
    }
    if (ou == "") {
      ou=0
    }
    if (egg == "") {
      egg=0
    }
    if (this.data.ruge==ruge && this.data.laoge==laoge && this.data.tuji==tuji && this.data.ou==ou && this.data.egg==egg) {
      wx.showToast({
        title: '请修改后提交',
        icon: 'none',
        duration:2000
      })
    } else {
      var time = util.formatTime(new Date());
      customer.where({
        name:value.name,
        phone:value.phone,
        isSend:'配送中'
      }).update({
        data:{
          ruge:ruge,
          laoge:laoge,
          tuji:tuji,
          ou:ou,
          egg:egg,
          time:time
        },
        success:()=>{
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail:()=>{
          wx.showToast({
            title: '修改失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },

  search:function () {
    wx.navigateTo({
      url: '../logs/logs?isAdmin=false&addressArray=[1,2]',
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
          array:result
        })
      }
    })
  },

  setAddress:function (e) {
    this.setData({
      index:e.detail.value
    })
  },

  setInfo:function () {
    wx.cloud.callFunction({
      name:'getInfo',
      success:(res)=>{
        let data=res.result.data
        if (data.length==1) {
          this.setData({
            name:data[0].name,
            phone:data[0].phone,
            address:data[0].address,
            id:data[0].id,
            ruge:data[0].ruge,
            laoge:data[0].laoge,
            tuji:data[0].tuji,
            ou:data[0].ou,
            egg:data[0].egg,
            disabled:true,
            font_color:'gray',
            hasBuy:true
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setInfo()
    this.getAddress()
  }
})