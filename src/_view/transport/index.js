
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
    title: '名称',
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
      type: "input",
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
            value: this.$attrs.value,
          },
          on: {
            input: (info) => { this.$emit('bindData', info) }
          }
        })
      }

    },
    map: {}
  },

  tsType: {
    title: '设备类型',
    key: 'tsType',
    table: {
      config: {},
      display: () => true,
    },
    create: {
      display: () => true,
      rule: () => { },
    },
    edit: {
      type: "select",
      display: () => true,
      values: "传输系统设备类型"

    },
    read: {
      display: () => true,
    },
    map: {}
  },
  speed: {
    title: '系统速率',
    key: 'speed',
    table: {
      config: {},
      display: () => true,
    },
    create: {
      display: () => true,
      rule: () => { },
    },
    edit: {
      type: "select",
      display: () => true,
      values: "传输系统系统速率"

    },
    read: {
      display: () => true,
    },
    map: {}
  },
  tsManufacturers: {
    title: '厂家',
    key: 'tsManufacturers',
    table: {
      config: {},
      display: () => true,
    },
    create: {
      display: () => true,
      rule: () => { },
    },
    edit: {
      type: "select",
      display: () => true,
      values: "传输系统厂家"


    },
    read: {
      display: () => true,
    },
    map: {}
  },
  netLevel: {
    title: '网络层级',
    key: 'netLevel',
    table: {
      config: {},
      display: () => true,
    },
    create: {
      display: () => true,
      rule: () => { },
    },
    edit: {
      type: "select",
      display: () => true,
      values: "传输系统网络层级"

    },
    read: {
      display: () => true,
    },
    map: {}
  },
  note: {
    title: '备注',
    key: 'note',
    table: {
      config: {},
      display: () => true,
    },
    create: {
      display: () => true,
      rule: () => { },
    },
    edit: {
      type: "select",
      display: () => true,

    },
    read: {
      display: () => true,
    },
    map: {}
  },
}
