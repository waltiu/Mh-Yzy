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
      title: 'alert.malfunctionName',
      tableDisplay: true,
      editDisplay: true,
      key: 'name'
    },
    {
      title: 'opticalSplitter.businessArea',
      tableDisplay: true,
      editDisplay: true,
      // enumerate: '所属业务区',
      autoComplete: 'cable',
      key: 'serviceArea'
    },
    {
      title: 'dynamic.isFixed',
      tableDisplay: true,
      editDisplay: false,
      render: (h, params) => {
        return h('el-tag', {
          props: {
            size: 'small',
            type: params.row.isFix ? 'success' : 'danger'
          }
        }, params.row.isFix ? window.i18n.t('OS.yes') : window.i18n.t('OS.no'))
      },
      key: 'isFix'
    },
    {
      title: 'dynamic.WhetherConfirm',
      tableDisplay: true,
      editDisplay: false,
      render: (h, params) => {
        return h('el-tag', {
          props: {
            size: 'small',
            type: params.row.isFixConfirm ? 'success' : 'danger'
          }
        }, params.row.isFixConfirm ? window.i18n.t('OS.yes') : window.i18n.t('OS.no'))
      },
      key: 'isFixConfirm'
    },
    {
      title: 'infoMap.faultDistance',
      editDisplay: true,
      tableDisplay: true,
      key: 'fontDistance'
    },
    {
      title: 'infoMap.faultEndDistance',
      editDisplay: true,
      tableDisplay: true,
      inputType: 'number',
      key: 'footDistance'
    },
    {
      title: 'tableSearch.longitude',
      editDisplay: true,
      coordinate: true,
      tableDisplay: false,
      inputType: 'number',
      key: 'lng'
    },
    {
      title: 'tableSearch.latitude',
      editDisplay: true,
      coordinate: true,
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
