// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
    // bind event
    this._eventShowMain = this._eventShowMain.bind(this)
    this._eventShowResult = this._eventShowResult.bind(this)

    // create menu / flashcard / result
    const menuElement = document.querySelector('#menu')
    this.menu = new MenuScreen(menuElement)

    const mainElement = document.querySelector('#main')
    this.flashcards = new FlashcardScreen(mainElement)

    const resultElement = document.querySelector('#results')
    this.results = new ResultsScreen(resultElement)
    
    // add eventListener
    document.addEventListener('eventShowResult', this._eventShowResult)
    document.addEventListener('eventShowMain', this._eventShowMain)
  }
  _eventShowMain(event) {
    this.menu.hide()
    this.results.hide()

    // itemNumber: the no. of deck.
    // wrongIndex: the card's no. which is wrong answer.
    // if wrongIndex.length == 0, all card will be show.
    console.log(event.detail.wrongIndex)
    this.flashcards.show(event.detail.itemNumber, event.detail.wrongIndex)
  }

  _eventShowResult(event) {
    this.flashcards.hide()
    this.results.show(event.detail.right, event.detail.wrong)
    this.results.setContinueArgs(event.detail.itemNumber, event.detail.wrongIndex)
  }
}
