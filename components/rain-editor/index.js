Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    active: {
      type: Boolean,
      value: false
    },
    value: {
      type: String,
      value: ''
    },
    remainderWordsNum: {
      type: Number,
      value: 1000
    },
    placeholder: {
      type: String,
      value: ''
    }
  },
  methods: {
    onChange (e) {
      const len = this.data.value.length
      this.setData({
        active: len > 0 ? true : false,
        remainderWordsNum: 1000 - len
      })
      this.triggerEvent('onSonChange', {
        value: e.detail.value
      })
    },
    onSend () {
      this.triggerEvent('onSonSend', {
        value: this.data.value
      })
    }
  }
})