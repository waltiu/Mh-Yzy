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
      title: 'tableSearch.nominalCapacity', // 标称容量
      tableDisplay: true,
      editDisplay: true,
      inputType: 'number',
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      key: 'occSize'
    },
    {
      title: 'tableSearch.portUsageInformation', // 端口使用信息
      noDisplay: true,
      tableDisplay: false,
      editDisplay: false,
      key: 'useInfos'
    },
    {
      title: 'tableSearch.installationMode', // 安装方式
      tableDisplay: true,
      editDisplay: true,
      key: 'installWay',
      enumerate: '安装方式'
    },
    {
      title: 'opticalSplitter.portOccupancyRate', // 端口占用率
      tableDisplay: true,
      editDisplay: false,
      progress: true,
      key: 'portUseRate',
      render: (h, params) => {
        let type
        if (params.row.portUseRate >= 0.8) {
          type = 'danger'
        } else {
          type = 'success'
        }
        return h('div', [
          h(
            'el-tag',
            {
              props: {
                type: type,
                size: 'small'
              }
            },
            (params.row.portUseRate * 100).toFixed(2) + '%')
        ])
      }
    },
    {
      title: 'tableSearch.level', // 级别
      tableDisplay: true,
      editDisplay: true,
      key: 'level',
      enumerate: '级别'
    },
    {
      title: 'infoMap.propertyRight', // 产权
      tableDisplay: false,
      editDisplay: true,
      key: 'equity',
      enumerate: '产权'
    },
    {
      title: 'infoMap.motorRoom', // 机房
      tableDisplay: false,
      editDisplay: true,
      autoComplete: 'deviceRoom',
      rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'change' }],
      key: 'ldsysMachineRoom',
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
      }
    },
    {
      title: 'tableSearch.frameNumber', // 框数
      tableDisplay: false,
      editDisplay: true,
      inputType: 'number',
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      key: 'rectangleNum'
    },
    {
      title: 'tableSearch.diskPerFrame', // 每框盘数
      tableDisplay: false,
      editDisplay: true,
      inputType: 'number',
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      key: 'rectangleRowNum'
    },
    // {
    //   title: '经度',
    //   editDisplay: true,
    //   coordinate: true,
    //   tableDisplay: false,
    //   rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
    //   key: 'lng'
    // },
    // {
    //   title: '纬度',
    //   editDisplay: true,
    //   coordinate: true,
    //   tableDisplay: false,
    //   rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
    //   key: 'lat'
    // },
    {
      title: 'opticalSplitter.remarks', // 备注
      tableDisplay: false,
      editDisplay: true,
      inputType: 'textarea',
      key: 'note'
    }
  ]

export default data
