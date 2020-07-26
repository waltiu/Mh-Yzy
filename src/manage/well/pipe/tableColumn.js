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
      title: 'well.length',
      tableDisplay: true,
      editDisplay: true,
      inputType: 'number',
      unit: window.i18n.t('main.metre'),
      key: 'length'
    },
    {
      title: 'well.pipeInformation',
      noDisplay: true,
      tableDisplay: false,
      editDisplay: false,
      key: 'lines'
    },
    {
      title: 'well.affiliatedCity',
      tableDisplay: false,
      editDisplay: true,
      key: 'city'
    },
    {
      title: 'cable.area',
      tableDisplay: false,
      editDisplay: false,
      key: 'region'
    },
    {
      title: 'infoMap.propertyRight',
      tableDisplay: true,
      editDisplay: true,
      enumerate: '产权',
      key: 'equity'
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
