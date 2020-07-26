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
      title: '设备ID', // 名称
      tableDisplay: false,
      rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'blur' }],
      editDisplay: true,
      key: 'epID'
    },
    {
      title: 'cable.area', // 所属区域
      tableDisplay: false,
      editDisplay: true,
      key: 'region'
    },
    {
      title: 'infoMap.motorRoom', // 机房
      noDisplay: true,
      tableDisplay: false,
      editDisplay: true,
      rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'change' }],
      autoComplete: 'deviceRoom',
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
      key: 'machineRoom'
    },
    {
      title: 'tableSearch.machineRoomName', // 机房名称
      tableDisplay: false,
      editDisplay: false,
      key: 'machineRoomName'
    },
    // {
    //   title: '经度',
    //   editDisplay: true,
    //   coordinate: true,
    //   tableDisplay: false,
    //   key: 'lng'
    // },
    // {
    //   title: '纬度',
    //   editDisplay: true,
    //   coordinate: true,
    //   tableDisplay: false,
    //   key: 'lat'
    // },
    {
      title: 'tableSearch.remarks', // 备注
      tableDisplay: false,
      editDisplay: true,
      inputType: 'textarea',
      key: 'note'
    }
  ]

export default data
