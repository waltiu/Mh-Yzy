import gmtShow from './gmt/show.vue'
import _ from 'lodash'

export const CreaterRedColumn = {
  key: 'gmt',
  display: () => true,
  render (h) {
    // let stat = this.$attrs.value ? '是' : '否'
    // const content = ()
    return h(gmtShow, {
      props: {
        value: this.$attrs.value
      }
    })
  },
}

export const CreaterColumn = {
  //审计
  gmt:{
    key: CreaterRedColumn.key,
    table: { display: () => false },
    create: { display: () => false },
    edit: { display: () => false },
    read: {
      ..._.omit(CreaterRedColumn,'key')
    },
  }
}

export const normalCreaterColumn = () => {
  return CreaterColumn
}
