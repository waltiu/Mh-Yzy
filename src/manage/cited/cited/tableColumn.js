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
      editDisplay: true,
      key: 'name',
      rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'blur' }]
    },
    {
      title: 'tableSearch.property', // 产权
      tableDisplay: true,
      editDisplay: true,
      enumerate: '产权',
      key: 'equity'
    },
    {
      title: 'tableSearch.address',
      editDisplay: true,
      coordinate: true,
      tableDisplay: false,
      key: 'address'
    },
    {
      title: 'tableSearch.longitude',
      editDisplay: true,
      coordinate: true,
      rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'blur' }],
      tableDisplay: false,
      key: 'lng'
    },
    {
      title: 'tableSearch.latitude', // 纬度
      editDisplay: true,
      coordinate: true,
      rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'blur' }],
      tableDisplay: false,
      key: 'lat'
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
