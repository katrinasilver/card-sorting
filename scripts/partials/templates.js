const cardForm = () => {
  return `
    <form>
      <textarea class="storyline" name="storycard" placeholder="Type a task card for sorting" maxlength="100" required></textarea>
      <input type="submit" class="fas fa-check" value="Add">
    </form>
  `
}

const storyCard = (value, id) => {
  return `
    <div class="story card" data-id="${id}">
      <a class="fas fa-grip-vertical"></a>
      <a class="fas fa-times"></a>
      <div class="storyline"required r>${value}</div>
    </div>
  `
}

const storyValue = (cardVal) => {
  return cardVal.map(card => cardForm(card.text, card.id, card.readonly)).join('\n')
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
  cardForm, storyCard, storyValue, cardCategory
}
