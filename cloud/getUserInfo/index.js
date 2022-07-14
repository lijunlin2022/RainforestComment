const cloud = require('wx-server-sdk')
cloud.init()

/**
 * 获取 openid
 * 利用 openid 查询用户表
 * 有数据说明此用户是老用户
 * 无数据说明此用户是新用户
 */
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  const res = await cloud.database().collection('users')
                .where({ openid })
                .get()
  return {
    data: res.data,
    openid
  }
}