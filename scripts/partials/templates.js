const storyCard = () => {
  return `
    <div class="story card">
      <input type="textarea" class="storyline" name="story-card" value="Type a task card for sorting" required>
      <a class="fas fa-grip-vertical"></a>
      <a class="fas fa-times"></a>
      <a class="fas fa-check"></a>
    </div>
  `
}

const cardCategory = () => {
  return `
    <div class="box category is-paddingless">
      <h3 class="subtitle is-4 has-text-centered has-background-primary">
        <a class="has-text-white" href="#">Rename Category <i class="fa fa-pen"></i></a>
      </h3>
        <p class="has-text-centered">Drop Story Cards Here!</p>
    </div>
  `
}

module.exports = {
  storyCard, cardCategory
}
