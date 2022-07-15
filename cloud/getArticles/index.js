const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  const { start, count } = event
  const listRes = cloud.database().collection('articles')
  const totalRes = await listRes.count()
  const dataRes = await listRes
                    .skip(start || 0)
                    .limit(count || 10)
                    .get()
  return {
    total: totalRes.total,
    data: dataRes.data
  }
}
