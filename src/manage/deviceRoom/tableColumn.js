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
    title: 'station.equipmentRoomLevel', // 机房级别
    tableDisplay: false,
    editDisplay: true,
    key: 'level',
    mapMultipleSplit: ';',
    enumerate: '机房等级'
  },
  {
    title: 'cable.area', // 所属区域
    tableDisplay: false,
    editDisplay: true,
    key: 'region'
  },
  {
    title: 'opticalSplitter.businessArea', // 所属服务区
    tableDisplay: false,
    editDisplay: true,
    inputType: 'textarea',
    key: 'serviceArea'
  },
  {
    title: 'infoMap.station', // 局站
    tableDisplay: false,
    editDisplay: true,
    autoComplete: 'station',
    rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'change' }],
    filter: (item, form) => {
      // 设置 form 中 lng, lat值
      if (item && item.lng && item.lat) {
        form.lng = item.lng
        form.lat = item.lat
      }
      return item
    },
    source: (item) => {
      return item || {}
    },
    key: 'ldsysStation'
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
    key: 'lng'
  },
  {
    title: 'tableSearch.latitude', // 纬度
    editDisplay: true,
    coordinate: true,
    tableDisplay: false,
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
