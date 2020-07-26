export const config = {
  ocName: {
    key: 'ocName',
    title: '光缆名称',
    width: '650px'

  },
  portRange: {
    key: 'portRange',
    title: '光交端口',
    width: '150px'

  },
  fiberRange: {
    key: 'fiberRange',
    title: '光缆芯序',
    width: '100px'

  },
  carryingWay: {
    key: 'carryingWay',
    title: '承载光路',
    width: '200px'
  },
  carryingBusiness: {
    key: 'carryingBusiness',
    title: '承载业务',
    width: '250px'

  },
  linkEquiment: {
    key: 'linkEquiment',
    title: '连接的设备',
    width: '200px'

  },
  userPort: {
    key: 'userPort',
    title: '端口',
    width: '100px'

  },
  state: {
    key: 'stateName',
    title: '状态',
    width: '100px',
    type: 'tag'

  },
  operation: {
    key: "operation",
    title: '操作',
    width: '100px',
    render: (h) => {
      return h('div', 111)
    }

  }
}
