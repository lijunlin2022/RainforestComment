Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    modalShow: {
      type: Boolean
    }
  },
  methods: {
    onClose () {
      this.setData({
        modalShow: false
      })
    }
  }
})