//logs.js
const db=wx.cloud.database()
const customer=db.collection('customer')

Page({
  data: {
    array:{},
    name:'',
    phone:'',
    address:'',
    id:'',
    addressArray:[],
    index:'',
    sum:0,
    isAdmin:false
  },
  onLoad: function (options) {
    let admin=options.isAdmin
    if (admin=="true") {
      this.setData({
        addressArray:options.addressArray.split(","),
        isAdmin:true
      })
    }else{
      this.buyer()
    }
  },

  setAddress:function (e) {
    this.setData({
      index:e.detail.value
    })
  },

  buyer:function () {
    wx.cloud.callFunction({
      name:'login',
      success:(res)=>{
        customer.where({
          _openid:res.result.openid
        }).orderBy('time', 'desc').get({
          success:(res)=>{
            this.setData({
              name:res.data[0].name,
              phone:res.data[0].phone,
              address:res.data[0].address,
              id:res.data[0].id
            })
            this.setInfo(res)
          }
        })
      }
    })
  },

  admins:function (add) {
    let addr=this.data.addressArray[add]
    customer.where({
      isSend:'配送中',
      address:addr
    }).field({
      name:true,
      phone:true,
      address:true,
      id:true,
      laoge:true,
      ruge:true,
      tuji:true,
      egg:true,
      ou:true,
      time:true,
      _id:false
    }).orderBy('time', 'asc').get({
      success:(res)=>{
        let b=[]
        let s=0
        for (let index = 0; index < res.data.length; index++) {
          let a={}
          a['姓名']=res.data[index].name,
          a['电话']=res.data[index].phone,
          a['门牌号']=res.data[index].id;
          let sum=res.data[index].ruge*100+res.data[index].laoge*80+res.data[index].tuji*80+res.data[index].egg*60+res.data[index].ou*20
          s=s+sum
          a['总计']=sum+'元'
          a['乳鸽']=res.data[index].ruge,
          a['老鸽']=res.data[index].laoge,
          a['土鸡']=res.data[index].tuji,
          a['绿壳鸡蛋']=res.data[index].egg,
          a['藕']=res.data[index].ou,
          b.push(a)
        }
        this.setData({
          array:b,
          sum:s
        })
      }
    })
  },

  setInfo:function (res) {
    let b=[]
    for (let index = 0; index < res.data.length; index++) {
      let a={}
      a['时间']=res.data[index].time+'('+res.data[index].isSend+')',
      a['乳鸽']=res.data[index].ruge,
      a['老鸽']=res.data[index].laoge,
      a['土鸡']=res.data[index].tuji,
      a['绿壳鸡蛋']=res.data[index].egg,
      a['藕']=res.data[index].ou,
      a['总计']=a['乳鸽']*100+a['老鸽']*80+a['土鸡']*80+a['绿壳鸡蛋']*60+a['藕']*20
      b.push(a)
    }
    this.setData({
      array:b
    })
  },

  search:function (e) {
    let add=e.detail.value.address
    if (add!="") {
      this.admins(add)
    } else {
      wx.showToast({
        title: '请选择地址！',
        icon: 'none',
        duration: 2000
      }) 
    }
  }
})
