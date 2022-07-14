const cloud = require('wx-server-sdk')
cloud.init()

exports.main = async (event, context) => {
  const { rootCommentId, start, count, articleId, _id } = event
  const listRes = cloud.database().collection('comments')
                    .where({
                      rootCommentId,
                      articleId,
                      _id
                    })

  const aggregatelistRes = cloud.database().collection('comments').aggregate()
                    .lookup({
                      from: 'users',
                      localField: 'fromUserId',
                      foreignField: '_id',
                      as: 'fromUserInfo'
                    })
                    .lookup({
                      from: 'users',
                      localField: 'toUserId',
                      foreignField: '_id',
                      as: 'toUserInfo'
                    })
                    .match({
                      rootCommentId,
                      articleId,
                      _id
                    })

  const totalRes = await listRes.count()
  const dataRes = await aggregatelistRes
                    .skip(start || 0)
                    .limit(count || 10)
                    .end()
  return {
    total: totalRes.total,
    data: dataRes.list
  }
}
