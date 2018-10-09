// Story Templates
const cardForm = () => {
  return `
  <form id="card" class="create">
    <input type="text" id="storycard" class="storycard" name="storycard" placeholder="Type a task card for sorting" maxlength="80" autocomplete="off" required>
    <input type="submit" id="cardsubmit" name="cardSubmit" class="submit button is-primary is-outlined" value="Add a Story Card">
  </form>
  `
}

const storyCard = (value, id) => {
  return `
    <div id="card-${id}" class="story card" data-id="${id}">
      <a class="fas fa-times"></a>
      <div class="storyline">${value}</div>
    </div>
  `
}

const storyValue = (cardVal) => {
  return cardVal.map(card => storyCard(card.text, card.id)).join('\n')
}

// Category Templates
const catForm = () => {
  return `
  <form id="category" class="create category">
    <input type="text" id="catpanel" class="storycard" name="catcard" placeholder="Type a Category Name" maxlength="20" autocomplete="off" required>
    <input type="submit" id="catsubmit" name="catSubmit" class="submit button is-primary is-outlined" value="Add a Category">
  </form>
  `
}

const cardCategory = (category, catId) => {
  return `
    <div class="box category is-paddingless" data-id="cat-${catId}">
      <h3 class="subtitle is-4 has-text-centered has-text-white has-background-primary">
        ${category}
      </h3>
      <div class="drag-category">
        <p class="has-text-centered">Drop Story Cards Here!</p>
      </div>
    </div>
  `
}

const catValue = (catVal) => {
  return catVal.map(cat => cardCategory(cat.category, cat.catId)).join('\n')
}

// Sorted Cards in Categories
const sortedCards = (category, catId, value, id) => {
  return
  `<div class="box category is-paddingless" data-id="cat-${catId}">
      <h3 class="subtitle is-4 has-text-centered has-text-white has-background-primary">
        ${category}
      </h3>
      <div class="drag-category">
        <div id="card-${id}" class="story card" data-id="${id}">
          <a class="fas fa-times"></a>
          <div class="storyline">${value}</div>
        </div>
      </div>
    </div>
  `
}

const sortValue = (sortVal) => {
  return sortVal.map(sort => sortedCards(sort.category, sort.value, sort.id, sort.catId))
}

const dragCards = (value, id) => {
  return `
    <div id="card-${id}" class="story card" data-id="${id}">
      <div class="storyline">${value}</div>
    </div>
  `
}

module.exports = {
  cardForm, storyCard, storyValue, cardCategory, catForm, catValue, sortedCards, sortValue, dragCards
}
