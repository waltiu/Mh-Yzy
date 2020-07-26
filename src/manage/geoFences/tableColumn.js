import randomColor from 'randomcolor'

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
      editDisplay: true,
      rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'blur' }],
      key: 'name'
    },
    {
      title: 'tableSearch.fenceType', // 围栏类型
      tableDisplay: true,
      editDisplay: true,
      enumerate: '地理围栏类型',
      rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'change' }],
      key: 'type'
    },
    {
      title: 'tableSearch.canton', // 行政区
      tableDisplay: true,
      editDisplay: true,
      enumerate: '地理围栏行政区',
      rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'change' }],
      key: 'administrativeRegion'
    },
    {
      title: 'tableSearch.color', // 颜色
      tableDisplay: true,
      editDisplay: true,
      colorPicker: true,
      source: (item) => {
        return item || randomColor()
      },
      key: 'color'
    },
    {
      title: 'fence.fence', // 围栏
      tableDisplay: false,
      noDisplay: true,
      editDisplay: false,
      key: 'geofence'
    },
    {
      title: 'fence.remarks', // 备注
      tableDisplay: false,
      editDisplay: true,
      inputType: 'textarea',
      key: 'note'
    }
  ]

export default data
