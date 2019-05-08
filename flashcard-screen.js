// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement
    this._eventScore = this._eventScore.bind(this)
  }

  // run when .show()
  init() {
    // reset score in html
    this.containerElement.querySelector('.correct').innerHTML = ''
    this.containerElement.querySelector('.incorrect').innerHTML = ''

    this.wrongIndex = new Array() // the wrong's card index
    this.itemNumber = -1 // deck No.itemNumber
    this.right = 0 // counter for right
    this.wrong = 0 // counter for wrong
    this._cardSize = 0 // the number of cards
  }

  _eventScore(event) {
    const dx = event.clientX - this.card.originX
    
    // direction X move > 150
    if (dx < -150) { // wrong
      ++this.wrong
      this.wrongIndex.push(this.card.cnt - 1)
    }
    else if (dx > 150) // right
      ++this.right
    else return // nothing to do
    
    // set the counter in html
    this.containerElement.querySelector('.correct').innerHTML = this.right
    this.containerElement.querySelector('.incorrect').innerHTML = this.wrong
    
    // change to the next card
    this.card.next()

    // all cards has been finished
    if (this.right + this.wrong >= this._cardSize) {
      document.dispatchEvent(new CustomEvent('eventShowResult', {
        detail: { 'right': this.right, 'wrong': this.wrong, 'itemNumber': this.itemNumber, 'wrongIndex': this.wrongIndex }
      }))
    }
  }

  show(itemNumber, wrongIndex) {
    this.init()
    this.itemNumber = itemNumber
    var idx = 0

    // get the card content
    var front = new Array() // front of the card's content
    var back = new Array() // back of the card's content

    for (var key in FLASHCARD_DECKS[itemNumber]['words']) {
      if(wrongIndex.includes(idx++) || wrongIndex.length == 0){
        front.push(key)
        back.push(FLASHCARD_DECKS[itemNumber]['words'][key])
        ++ this._cardSize
      }
    }

    // create cards and push data into them
    const flashcardContainer = document.querySelector('#flashcard-container')
    this.card = new Flashcard(flashcardContainer, front, back, this._eventScore)

    // disable hide
    this.containerElement.classList.remove('inactive')
  }

  hide() {
    this.containerElement.classList.add('inactive')
  }
}
