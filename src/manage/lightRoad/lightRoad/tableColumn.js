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
      title: 'tableSearch.name', // 名称
      tableDisplay: true,
      rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'blur' }],
      editDisplay: true,
      width: 500,
      inputType: 'textarea',
      key: 'name'
    },
    {
      title: 'opticalPath.jumpFiberInformation', // 跳纤信息
      noDisplay: true,
      tableDisplay: false,
      editDisplay: false,
      key: 'jumperInfo'
    },
    {
      title: 'diffRoute.CN_CORE_N',
      tableDisplay: false,
      editDisplay: true,
      enumerate: '光路纤数',
      key: 'coreNum'
    },
    {
      title: 'statistics.lightPathType',
      tableDisplay: true,
      editDisplay: true,
      enumerate: '光路类型',
      key: 'type'
    },
    {
      title: 'tableSearch.remarks',
      tableDisplay: false,
      editDisplay: true,
      inputType: 'textarea',
      key: 'note'
    }
  ]

export default data
