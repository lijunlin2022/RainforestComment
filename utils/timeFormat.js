const timeFormat = (timeStamp) => {
  const diff = Math.round((Date.now() - timeStamp) / 1000)
  const timeUnits = ['年', '月', '周', '天', '小时', '分钟', '秒']
  const timeLevels = [
    365 * 24 * 3600,
    30 * 24 * 3600,
    7 * 24 * 3600,
    24 * 3600,
    3600,
    60,
    1
  ]
  for (const index in timeLevels) {
    const cnt = Math.floor(diff / timeLevels[index])
    if (cnt !== 0) {
      return `${cnt} ${timeUnits[index]}前`
    }
  }
}

module.exports = {
  timeFormat
}
