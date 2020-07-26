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
    key: 'name'
  },
  {
    title: 'tableSearch.address', // 地址
    tableDisplay: true,
    editDisplay: true,
    key: 'address'
  },
  // {
  //   title: '所属业务区',
  //   tableDisplay: true,
  //   editDisplay: true,
  //   enumerate: '所属业务区',
  //   key: 'serviceArea'
  // },
  {
    title: 'tableSearch.longitude', // 经度
    editDisplay: true,
    coordinate: true,
    tableDisplay: false,
    rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'blur' }],
    key: 'lng'
  },
  {
    title: 'tableSearch.latitude', // 纬度
    editDisplay: true,
    coordinate: true,
    tableDisplay: false,
    rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'blur' }],
    key: 'lat'
  },
  {
    title: 'tableSearch.remarks', // 备注
    tableDisplay: false,
    editDisplay: true,
    inputType: 'textarea',
    key: 'note'
  }
]

export default data
