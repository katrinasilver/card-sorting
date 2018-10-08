const storyCard = (value, id, readonly) => {
  return `
    <div class="story card" data-id="${id}">
      <a class="fas fa-grip-vertical" data-controls="drag"></a>
      <a class="fas fa-times"></a>
      <a class="fas fa-check" data-controls="save"></a>
      <textarea class="storyline" name="storycard" maxlength="100" required>${value}</textarea>
    </div>
  `
}

const storyCards = (storyCards) => {
  return storyCards.map(card => storyCard(card.text, card.id, card.readonly)).join('\n')
}

const cardCategory = () => {
  return `
    <div class="box category is-paddingless">
      <h3 class="subtitle is-4 has-text-centered has-background-primary">
        <a class="has-text-white" href="#">Rename Category
        <i class="fa fa-pen"></i></a>
      </h3>
        <p class="has-text-centered">Drop Story Cards Here!</p>
    </div>
  `
}

module.exports = {
  storyCard, storyCards, cardCategory
}
