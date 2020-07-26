const data =
  [
    {
      type: 'selection',
      width: 60,
      tableDisplay: true,
      editDisplay: false,
      align: 'center'
    },
    {
      title: 'cable.name', // 名称
      tableDisplay: true,
      editDisplay: true,
      rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'blur' }],
      key: 'name'
    },
    {
      title: 'cable.opticalCoreCapacity', // 光芯容量
      tableDisplay: false,
      editDisplay: true,
      rules: [{ required: true, message: '不可为空', trigger: 'blur' }],
      key: 'ocSize'
    },
    {
      title: 'tableSearch.cableStructure', // 光缆结构
      tableDisplay: false,
      editDisplay: true,
      key: 'structure',
      enumerate: '光缆结构'
    },
    {
      title: 'cable.jumperFiberInformation', // 跳纤信息
      noDisplay: true,
      tableDisplay: false,
      editDisplay: false,
      key: 'jumperInfo'
    },
    {
      title: 'cable.opticalCableInformation', // 光缆信息
      noDisplay: true,
      tableDisplay: false,
      editDisplay: false,
      key: 'lines'
    },
    {
      title: 'cable.cableLayingInformation', // 光缆敷设信息
      noDisplay: true,
      tableDisplay: false,
      editDisplay: false,
      key: 'surplusInfo'
    },
    {
      title: 'tableSearch.typeOpticalCable', // 光缆类型
      tableDisplay: false,
      editDisplay: true,
      key: 'ocType',
      enumerate: '光缆类型'
    },
    {
      title: 'tableSearch.level', // 光缆层级
      tableDisplay: true,
      editDisplay: true,
      key: 'level',
      enumerate: '光缆层级'
    },
    {
      title: 'tableSearch.maintenanceLevelTest', // 维护等级
      tableDisplay: false,
      editDisplay: true,
      key: 'maintainLevel',
      enumerate: '维护等级'

    },
    {
      title: 'cable.area', // 所属区域
      tableDisplay: false,
      editDisplay: true,
      key: 'region'
    },
    {
      title: 'tableSearch.opticalFiberMode', // 光纤模式
      tableDisplay: false,
      editDisplay: true,
      key: 'schema',
      enumerate: '光纤模式'

    },
    {
      title: 'cable.mapLength', // 地图长度
      tableDisplay: false,
      editDisplay: false,
      unit: window.i18n.t('main.metre'),
      key: 'lineLength'
    },
    {
      title: 'cable.cableLength', // 光缆长度
      tableDisplay: false,
      editDisplay: false,
      unit: window.i18n.t('main.metre'),
      key: 'lineSpecialLength'
    },
    {
      title: 'cable.transmissionSystem', // 传输系统
      tableDisplay: false,
      editDisplay: false,
      noDisplay: true,
      // bigSelectDown: () => store.getters.getObjByType['传输系统'],
      // result: (item, info) => {
      //   return item.reduce((result, val, index) => {
      //     result[index] = { 'transferSystem': val }
      //     return result
      //   }, {})
      // },
      // display: (item, info) => {
      //   return Object.values(item).map(a => {
      //     return a.transferSystem
      //   })
      // },
      key: 'ocCoreInfo'
    },
    {
      title: 'cable.remarks', // 备注
      tableDisplay: false,
      editDisplay: true,
      inputType: 'textarea',
      key: 'note'
    }
  ]

export default data
