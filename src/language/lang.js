export default {
  setLang (lang) {
    window.localStorage.setItem('user_lang', lang)
  },
  getLang (defaultLang) {
    const localLang = window.localStorage.getItem('user_lang')
    if (localLang === null) {
      return defaultLang
    } else {
      return localLang
    }
  }
}
