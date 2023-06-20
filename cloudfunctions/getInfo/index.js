// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'wqy-first-2vpi8'
})

const db=cloud.database()
const _=db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid=wxContext.OPENID
  const result=await db.collection('customer').where({
    _openid:openid,
    isSend:'配送中'
  }).get({
    success:(res)=>{
      console.log(res)
    } 
  })
  return result
}