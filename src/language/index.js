import Vue from 'vue'
import VueI18n from 'vue-i18n'
import LangStorage from './lang'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

const DEFAULT_LANG = 'zh'
const LOCALE_KEY = 'localeLanguage'
const locales = {
  zh: Object.assign(require('./zh.json'), zhLocale),
  en: Object.assign(require('./en.json'), enLocale)
}
const i18n = new VueI18n({
  locale: LangStorage.getLang('zh'),
  silentTranslationWarn: true,
  messages: locales
})
// 这里我们抛出一个setup方法，用来修改语言；
export const setup = lang => {
  if (lang === undefined) {
    lang = window.localStorage.getItem(LOCALE_KEY)
    if (locales[lang] === undefined) {
      lang = DEFAULT_LANG
    }
  }
  window.localStorage.setItem(LOCALE_KEY, lang)

  Object.keys(locales).forEach(lang => {
    document.body.classList.remove(`lang-${lang}`)
  })
  document.body.classList.add(`lang-${lang}`)
  document.body.setAttribute('lang', lang)
  // 把当前语言设置到vue的配置里
  Vue.config.lang = lang
  i18n.locale = lang
}
// 设置默认语言为中文
// 把i18n绑定到window上，方便我们在vue以外的文件使用语言包
window.i18n = i18n
export default i18n
