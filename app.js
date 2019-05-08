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
    this._eventShowMain = this._eventShowMain.bind(this)
    this._eventShowResult = this._eventShowResult.bind(this)

    const menuElement = document.querySelector('#menu')
    this.menu = new MenuScreen(menuElement)
    document.addEventListener('eventShowMain', this._eventShowMain)

    const mainElement = document.querySelector('#main')
    this.flashcards = new FlashcardScreen(mainElement)
    document.addEventListener('eventShowResult', this._eventShowResult)

    const resultElement = document.querySelector('#results')
    this.results = new ResultsScreen(resultElement)
  }
  _eventShowMain(event) {
    this.menu.hide()
    this.results.hide()
    this.flashcards.show(event.detail.itemNumber, event.detail.wrongIndex)
  }

  _eventShowResult(event) {
    this.flashcards.hide()
    console.log(event.detail.wrongIndex)
    this.results.show(event.detail.itemNumber, event.detail.right, event.detail.wrong, event.detail.wrongIndex)
  }
}
