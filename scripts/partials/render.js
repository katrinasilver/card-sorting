const templates = require('./templates')
const data = require('./data')
const shortId = require('short-id')
const stories = document.querySelector('#stories')


const headerJS = () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target)
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active')
        $target.classList.toggle('is-active')
      })
    })
  }
}

const addStoryCard = (container) => {
  // data.storyFormat.push({ id: shortId.generate(), text: '', readonly: '' })
  // container.innerHTML = templates.storyValue(data.storyFormat)

  // const del = document.querySelectorAll('a.fa-times')
  // handleRemove(del)
}


// const handleRemove = (deleter) => {
//   for (d of deleter) {
//     d.addEventListener('click', (e) => {
//       const target = e.target.parentNode
//       const cardId = target.getAttribute('data-id')
//       const story = data.storyFormat.find(story => story.id === cardId)
//       const index = data.storyFormat.indexOf(story)

//       if (index >= 0) {
//         data.storyFormat.splice(index, 1)
//         stories.innerHTML = templates.storyValue(data.storyFormat)
//         const del = document.querySelectorAll('a.fa-times')
//         handleRemove(del)
//       }
//     })
//   }
// }

// const saveCard = (saver) => {

// }

const addCategory = (container) => {
  let category = templates.cardCategory()
  container.innerHTML += category;
}

module.exports = {
  headerJS, addStoryCard, addCategory
}
