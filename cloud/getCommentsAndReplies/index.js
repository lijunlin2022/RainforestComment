const cloud = require('wx-server-sdk')
cloud.init()

const MAX_REPLY_LIMIT = 3

exports.main = async (event, context) => {
  const { start, count, articleId } = event
  const getListByRootId = async (articleId, rootCommentId, start, count) => {
    return cloud.callFunction({
      name: 'getComments',
      data: {
        articleId,
        rootCommentId,
        start,
        count
      }
    })
  }
  const { result: { data: roots, total } } = await getListByRootId(articleId, null, start, count)
  for (const index in roots) {
    const { result: { data: childs, total: replyTotal } } = await getListByRootId(articleId, roots[index]._id, 0, MAX_REPLY_LIMIT)
    roots[index].children = childs
    roots[index].replyTotal = replyTotal
  }
  return {
    data: roots,
    total
  }
}