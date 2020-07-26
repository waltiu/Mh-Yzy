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
      title: 'tableSearch.property',
      tableDisplay: true,
      editDisplay: true,
      enumerate: '产权',
      key: 'equity'
    },
    {
      title: 'tableSearch.longTermAttribute',
      tableDisplay: true,
      editDisplay: true,
      enumerate: '长本属性',
      key: 'longOrLocal'
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
      tableDisplay: false,
      rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'blur' }],
      key: 'lng'
    },
    {
      title: 'tableSearch.latitude',
      editDisplay: true,
      coordinate: true,
      tableDisplay: false,
      rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'blur' }],
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
