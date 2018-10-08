const shortId = require('short-id')

module.exports.storyCards = [
  {
    id: shortId.generate(),
    text: 'Type a task card for sorting',
    readonly: false
  }
]
