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
    this._score = this._score.bind(this)
  }

  init() {
    this.containerElement.querySelector('.correct').innerHTML = ''
    this.containerElement.querySelector('.incorrect').innerHTML = ''
    this.wrongIndex = new Array()
    this.front = new Array()
    this.back = new Array()
    this.itemNumber = -1
    this.right = 0
    this.wrong = 0
  }

  _score(event) {
    const dx = event.clientX - this.card.originX

    if (dx < -150) {
      ++this.wrong
      this.wrongIndex.push(this.card.cnt)
    }
    else if (dx > 150)++this.right
    else return

    this.containerElement.querySelector('.correct').innerHTML = this.right
    this.containerElement.querySelector('.incorrect').innerHTML = this.wrong
    this.card.next()

    if (this.right + this.wrong >= this.front.length) {
      document.dispatchEvent(new CustomEvent('eventShowResult', {
        detail: { 'right': this.right, 'wrong': this.wrong, 'itemNumber': this.itemNumber, 'wrongIndex': this.wrongIndex }
      }))
    }
  }

  show(itemNumber, wrongIndex) {
    this.init()

    this.itemNumber = itemNumber
    var idx = 0
    console.log(itemNumber)
    for (var key in FLASHCARD_DECKS[itemNumber]['words']) {
      if(wrongIndex.includes(idx++) || wrongIndex.length == 0){
        this.front.push(key)
        this.back.push(FLASHCARD_DECKS[itemNumber]['words'][key])
      }
    }

    const flashcardContainer = document.querySelector('#flashcard-container')
    this.card = new Flashcard(flashcardContainer, this.front, this.back, this._score)
    this.containerElement.classList.remove('inactive')
  }

  hide() {
    this.containerElement.classList.add('inactive')
  }
}
