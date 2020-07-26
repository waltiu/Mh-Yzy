
export const column = {
  selection: {
    table: {
      config: {
        type: 'selection',
        width: 60,
        align: 'center'
      },
      display: () => true
    },
    key: 'incall-selection'
  },
  name: {
    title: 'subdistricts.name',
    key: 'name',
    // 注入table参数
    table: {
      config: {},
      display: () => true,
    },
    create: {
      display: () => true,
      rule: () => { },
    },
    edit: {
      display: () => true,
      render (h) {
        return h('el-input', {
          props: {
            value: this.$attrs.value
          },
          on: {
            input: (info) => { this.$emit('bindData', info) }
          }
        })
      }
    },
    read: {
      display: () => true,
      rule: () => { },
    },
    search: {
      display: () => true,
      render (h) {
        return h('el-input', {
          props: {
            value: this.$attrs.value
          },
          on: {
            input: (info) => { this.$emit('bindData', info) }
          }
        })
      }
    },
    map: {}
  },
 
}
