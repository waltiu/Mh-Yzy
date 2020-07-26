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
      title: 'infoMap.propertyRight',
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
      title: 'tableSearch.maintenanceMode',
      tableDisplay: true,
      editDisplay: true,
      enumerate: '维护方式',
      key: 'maintenance'
    },
    {
      title: 'well.numberHoles',
      tableDisplay: true,
      editDisplay: false,
      key: 'wellHole'
    },
    {
      title: 'ldsysPoints',
      noDisplay: true,
      tableDisplay: false,
      editDisplay: false,
      key: 'ldsysPoints'
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
