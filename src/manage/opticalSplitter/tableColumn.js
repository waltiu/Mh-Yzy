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
      title: 'opticalSplitter.businessArea',
      tableDisplay: true,
      editDisplay: true,
      enumerate: '所属业务区',
      key: 'serviceArea'
    },
    {
      title: 'opticalSplitter.belongToLightBox',
      tableDisplay: true,
      editDisplay: false,
      // noDisplay: true,
      key: 'place',
      render: (h, params) => {
        if (params.row.place === '光交') {
          return h('div', window.i18n.t('infoMap.cableBox'))
        } else if (params.row.place === 'other') {
          return h('div', window.i18n.t('vendorList.other'))
        } else if (params.row.place === '电杆') {
          return h('div', window.i18n.t('infoMap.pole'))
        } else if (params.row.place === 'ODF') {
          return h('div', 'ODF')
        } else if (params.row.place === 'outdoor') {
          return h('div', window.i18n.t('vendorList.outside'))
        }
      }
    },
    {
      title: 'opticalSplitter.belongToODFLightBox',
      noDisplay: true,
      tableDisplay: false,
      editDisplay: true,
      autoComplete: 'odf',
      rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'blur' }],
      key: 'ldsysOpticalCrossConnect'
    },
    {
      title: 'opticalSplitter.numberOfINPorts',
      tableDisplay: true,
      editDisplay: true,
      list: [1, 2],
      rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'blur' }],
      key: 'inNum'
    },
    {
      title: 'opticalSplitter.OUTRatio',
      tableDisplay: true,
      editDisplay: false,
      key: 'occupancyRatio'
    },
    {
      title: 'opticalSplitter.portOccupancyRate',
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
      title: 'opticalSplitter.bindQRCode',
      tableDisplay: true,
      editDisplay: false,
      key: 'isBindQRCode',
      render: (h, params) => {
        if (params.row.isBindQRCode === '已绑定') {
          return h('div', window.i18n.t('OS.yes'))
        } else if (params.row.isBindQRCode === '未绑定') {
          return h('div', window.i18n.t('OS.no'))
        }
      }
    },
    {
      title: 'opticalSplitter.INPortInformation',
      noDisplay: true,
      tableDisplay: false,
      editDisplay: false,
      key: 'inPort',
      source: (item) => {
        return item || {}
      }
    },
    {
      title: 'opticalSplitter.OUTPortInformation',
      noDisplay: true,
      tableDisplay: false,
      editDisplay: false,
      key: 'outPort',
      source: (item) => {
        return item || {}
      }
    },
    {
      title: 'opticalSplitter.numberOfOUTPorts',
      tableDisplay: false,
      editDisplay: true,
      list: [4, 8, 16, 32, 64],
      rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'blur' }],
      key: 'outNum'
    },
    // {
    //   title: 'opticalSplitter.coverageArea',
    //   tableDisplay: false,
    //   editDisplay: false,
    //   noDisplay: false,
    //   key: 'coverageArea'
    // },
    {
      title: 'tableSearch.canton',
      tableDisplay: false,
      editDisplay: false,
      selectDistrict: '行政区',
      key: 'baDistrict',
      render (h, params) {
        return h('div', `${params.row.baProvince || ''} ${params.row.baCity || ''} ${params.row.baCountry || ''}`)
      }
    },
    {
      title: '',
      tableDisplay: false,
      editDisplay: false,
      noDisplay: true,
      selectDistrict: '省',
      key: 'baProvince'
    },
    {
      title: 'tableSearch.canton',
      tableDisplay: false,
      editDisplay: true,
      noDisplay: true,
      selectDistrict: '市',
      key: 'baCity'
    },
    {
      title: '',
      tableDisplay: false,
      editDisplay: false,
      noDisplay: true,
      selectDistrict: '区',
      key: 'baCountry'
    },
    // {
    //   title: 'opticalSplitter.coverageArea',
    //   tableDisplay: false,
    //   editDisplay: false,
    //   key: 'coverageArea'
    // },
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
      title: 'opticalSplitter.latitude',
      editDisplay: true,
      coordinate: true,
      tableDisplay: false,
      key: 'lat'
    },
    {
      title: 'opticalSplitter.remarks',
      tableDisplay: false,
      editDisplay: true,
      inputType: 'textarea',
      key: 'note'
    }
  ]

export default data
