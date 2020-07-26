import { CreaterRedColumn } from '@/_config/create'
import showError from '../error/show.vue'

export const table = {
  name: {
    title: '成端名称',
    key: 'name'
  },
  type: {
    title: '设备类型',
    key: 'type',
    render (h) {
      let content = ``
      switch (this.$attrs.value) {
        case 7:
          content = '光交'
          break;

        case 8:
          content = 'ODF'
          break;

        default:
          content = `未知 (${this.$attrs.value})`
          break;
      }
      return h('div', content)
    },
  },
  locationError: {
    title: '定位异常',
    key: 'locationError',
    render (h) {
      let type = this.$attrs.value ? 'danger' : 'success'
      let text = this.$attrs.value ? '异常' : '正常'
      return h(showError, {
        props:{
          type,
          text
        }
      })
    },
  },
  locationErrorMsg: {
    title: '定位异常原因',
    key: 'locationErrorMsg'
  },
  CreaterRedColumn
}
