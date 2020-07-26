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
      title: 'tableSearch.name',
      tableDisplay: true,
      rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'blur' }],
      editDisplay: true,
      key: 'name'
    },
    {
      title: 'business.length', // 光路总长
      tableDisplay: false,
      editDisplay: false,
      key: 'lengthMapSurplus'
    },
    {
      title: 'business.mapLength', // 地图长度
      tableDisplay: false,
      editDisplay: false,
      unit: window.i18n.t('main.metre'),
      key: 'lengthMap'
    },
    {
      title: 'business.businessType', // 业务类型
      tableDisplay: true,
      editDisplay: true,
      enumerate: '业务类型',
      key: 'serviceType'
    },
    {
      title: 'business.workProtection', // 工作/保护
      tableDisplay: true,
      editDisplay: true,
      enumerate: '工作/保护',
      key: 'workOrProtect'
    },
    {
      title: 'business.remarks', // 备注
      tableDisplay: false,
      editDisplay: true,
      inputType: 'textarea',
      key: 'note'
    },
    {
      tableDisplay: false,
      editDisplay: false,
      noDisplay: true,
      inputType: 'textarea',
      key: 'ldsysOpticalCableWays'
    }
  ]

export default data
