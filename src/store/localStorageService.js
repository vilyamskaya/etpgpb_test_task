export const localStorageService = {
  setItem(key, value) {
    localStorage.setItem(key.toString(), JSON.stringify(value))
  },
  getColor() {
    const item = localStorage.getItem('color')
    return item ? JSON.parse(item) : { title: 'light', color: '#FFFC92' }
  },
  setColor(color) {
    localStorageService.setItem('color', color)
  },
  updateLocalStorage(tweets) {
    localStorageService.setItem('tweets', tweets)
  },
  getTweets() {
    const item = localStorage.getItem('tweets')
    return item ? JSON.parse(item) : []
  },
}
