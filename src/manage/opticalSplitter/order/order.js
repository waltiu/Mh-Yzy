// 全局注入

import showStatus from '@/public/orderStatus'
import moment from 'moment'

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
      title: 'OS.projectName', // 工程名称
      tableDisplay: true,
      editDisplay: true,
      key: 'name',
      rules: [{ required: true, message: window.i18n.t('main.enterName'), trigger: 'blur' }],
      render: (h, params) => {
        return h('el-tooltip',
          {
            props: {
              content: params.row.note || window.i18n.t('main.noNotes'),
              placement: 'bottom-start'
            }
          },
          [h('p', params.row.name)]
        )
      }
    },
    {
      title: 'OS.orderNumber', // 工程单号
      tableDisplay: true,
      editDisplay: true,
      key: 'orderNumber'
    },
    {
      title: 'OS.departmentId', // 工程单位
      tableDisplay: false,
      noDisplay: true,
      editDisplay: true,
      listDefault: [],
      permission: 'fgqgdgl.designate',
      key: 'departmentId'
    },
    {
      title: 'OS.overtime', // 工单已超时
      tableDisplay: false,
      editDisplay: false,
      list: [{ id: true, name: window.i18n.t('OS.yes') }, { id: false, name: window.i18n.t('OS.no') }],
      source: (info) => {
        return {
          id: info,
          name: info ? window.i18n.t('OS.yes') : window.i18n.t('OS.no')
        }
      },

      render: (h, content) => {
        return h('p', content.row.isExpire)
      },
      filter: (info) => {
        return info.id
      },
      key: 'isExpire'
    },
    {
      title: 'OS.name', // 工程单位名称
      tableDisplay: false,
      editDisplay: false,
      key: 'departmentName'
    },
    {
      title: 'OS.deadline', // 最晚完成时间
      tableDisplay: true,
      editDisplay: true,
      width: 230,
      inputType: 'datetime',
      key: 'endDate',
      source: (info) => info ? Number(info) : new Date() - 0,
      filter: (info) => info ? String(info) : null,
      render: (h, context) => {
        if (!context.row.endDate) {
          return h('p', '空')
        } else {
          return h('p', moment(Number(context.row.endDate)).format('llll'))
        }
      }
    },
    {
      title: 'OS.orderStatus', // 工程状态
      tableDisplay: true,
      editDisplay: false,
      key: 'state',
      render: (h, params) => {
        return h(showStatus, {
          props: {
            info: params.row,
            showHandle: false
          }
        })
      }
    },
    {
      title: 'OS.createdTime', // 已创建时间
      tableDisplay: true,
      noDisplay: true,
      editDisplay: false,
      type: 'time',
      key: 'gmtModified',
      render: (h, context) => {
        return h('p', moment(new Date()).from(Number(context.row.gmtModified)))
      }
    },
    {
      title: 'OS.remarks', // 备注
      tableDisplay: false,
      editDisplay: true,
      inputType: 'textarea',
      key: 'note'
    },
    {
      title: 'OS.file', // 工单文件
      tableDisplay: false,
      file: 'opticalSplitter',
      editDisplay: true,
      length: '48%',
      key: 'orderFile'
    },
    {
      title: 'OS.drawings', // 施工图
      tableDisplay: false,
      file: 'opticalSplitter',
      editDisplay: true,
      length: '48%',
      key: 'engineeringDrawing'
    }
  ]

export default data
