Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    comment: {
      type: Object
    }
  },
  methods: {
    onReply() {
      this.triggerEvent('onSonReply', this.data.comment)
    }
  },
})
 