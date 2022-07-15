const { timeFormat } = require('../../utils/timeFormat.js')
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    comment: {
      type: Object,
      observer: function (newVal) {
        this.setData({
          timeStr: timeFormat(newVal.createTime)
        })
      }
    }
  },
  data: {
    timeStr: ''
  },
  methods: {
    onReply() {
      this.triggerEvent('onSonReply', this.data.comment)
    }
  },
})
