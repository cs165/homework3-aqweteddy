// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, frontTexts, backTexts, eventScore) {
    this.containerElement = containerElement
    
    // bind event
    this._pointDown = this._pointDown.bind(this)
    this._pointMove = this._pointMove.bind(this)
    this._pointUp = this._pointUp.bind(this)

    this.cnt = 0 // count for numbers of cards has drawned

    // mouse origin
    this.originX = 0
    this.originY = 0

    // active this event when score change
    this._eventScore = eventScore
    
    // card content
    this.frontTexts = frontTexts
    this.backTexts = backTexts
    this.next()
  }

  next() {
    this.containerElement.innerHTML = ''
    this.flashcardElement = this._createFlashcardDOM(this.frontTexts[this.cnt], this.backTexts[this.cnt])
    this.containerElement.append(this.flashcardElement)
    ++this.cnt
    return true
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div')
    cardContainer.classList.add('flashcard-box')
    cardContainer.classList.add('show-word')

    const wordSide = document.createElement('div')
    wordSide.classList.add('flashcard')
    wordSide.classList.add('word')
    wordSide.textContent = frontText

    const definitionSide = document.createElement('div')
    definitionSide.classList.add('flashcard')
    definitionSide.classList.add('definition')
    definitionSide.textContent = backText

    cardContainer.appendChild(wordSide)
    cardContainer.appendChild(definitionSide)
    cardContainer.style.animation = "bottomToTop 0.5s"

    cardContainer.addEventListener("pointerup", this._eventScore)
    cardContainer.addEventListener("pointerup", this._pointUp)
    cardContainer.addEventListener("pointerdown", this._pointDown)
    cardContainer.addEventListener("pointermove", this._pointMove)

    return cardContainer
  }

  _pointUp(event) {
    // flip card
    if (this.originX === event.clientX && this.originY === event.clientY)
      this.flashcardElement.classList.toggle('show-word')
    
    // release mouse & reset backgroud & set animation & reset origin
    document.querySelector('body').style.background = '#d0e6df'
    this.flashcardElement.style.transform = ''
    this.flashcardElement.style.transition = '0.6s'
    this.originX = 0
    this.originY = 0
  }

  _pointDown(event) {
    this.originX = event.clientX
    this.originY = event.clientY
  }

  _pointMove(event) {
    event.preventDefault()
    
    // prevent point not click
    if (this.originX == 0 && this.originY == 0) return

    // get delta x, delta y, degree of rotate
    const dx = event.clientX - this.originX
    const dy = event.clientY - this.originY
    const deg = dx * 0.2

    // change background
    if (dx > 150 || dx < -150) document.querySelector('body').style.background = '#97b7b7'
    else document.querySelector('body').style.background = '#d0e6df'
    
    // animation
    this.flashcardElement.style.transition = ''
    this.flashcardElement.style.transform = `translate(${dx}px, ${dy}px) rotate(${deg}deg)`
  }
}
