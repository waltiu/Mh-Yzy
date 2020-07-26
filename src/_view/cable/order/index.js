// import moment from 'moment'
import engineeringUnit from '@/_public/form/components/engineeringUnit.vue'
import workOrderStatus from '@/_public/form/components/workOrderStatus.vue'
import trueOrFalse from '@/_public/form/components/trueOrFalse.vue'
import showStatus from './public/status/show.vue'
import showError from './public/error/show.vue'
import changeStatus from './public/status/change.vue'
import { unixms2date, unixs2date } from '@/_command/tools';
import { CreaterColumn } from '@/_config/create'
export const column = {
  name:
  {
    title: '工程名称',
    key: 'name',
    table: { display: () => true },
    read: { display: () => true },
    create: {
      display: () => true,
      render (h) {
        return h("el-input", {
          attrs: { placeholder: '请输入' },
          props: {
            value: this.$attrs.value
          },
          on: {
            input: info => {
              this.$emit("bindData", info);
            }
          }
        });
      }
    },
    edit: { display: () => true },
    search: {
      display: () => true,
      render (h) {
        return h("el-input", {
          attrs: { placeholder: '查询' },
          props: {
            value: this.$attrs.value
          },
          on: {
            input: info => {
              this.$emit("bindData", info);
            }
          }
        });
      }
    },
  },
  orderNumber:
  {
    title: '工程单号',
    key: 'orderNumber',
    table: { display: () => true },
    read: { display: () => true },
    create: {
      display: () => true,
      render (h) {
        return h("el-input", {
          attrs: { placeholder: '请输入' },
          props: {
            value: this.$attrs.value
          },
          on: {
            input: info => {
              this.$emit("bindData", info);
            }
          }
        });
      }
    },
    edit: { display: () => true },
    search: {
      display: () => true,
      render (h) {
        return h("el-input", {
          attrs: { placeholder: '查询' },
          props: {
            value: this.$attrs.value
          },
          on: {
            input: info => {
              this.$emit("bindData", info);
            }
          }
        });
      }
    },
  },
  departmentName:
  {
    title: '工程单位名称',
    key: 'departmentName',
    table: { display: () => false },
    read: { display: () => true },
    create: { display: () => !true },
    edit: { display: () => !true },

  },
  locationError:
  {
    title: '定位异常',
    key: 'locationError',
    table: { 
      display: () => true,
      render (h,p) {
        let type = p.row.locationError ? 'danger' : 'success'
        let text = p.row.locationError ? '异常' : '正常'
        return h(showError, {
          props:{
            type,
            text
          }
        })
      },
     },
    read: {
      display: () => true,
      render (h) {
        let type = this.$attrs.value ? 'danger' : 'success'
        let text = this.$attrs.value ? '异常' : '正常'
        return h(showError, {
          props:{
            type,
            text
          }
        })
      },
    },
    create: { display: () => !true },
    edit: { display: () => !true },

  },
  locationOffsetMax:
  {
    title: '定位偏移距离',
    key: 'locationOffsetMax',
    table: { display: () => !true },
    read: { display: () => !true },
    create: { display: () => !true },
    edit: { display: () => !true },

  },
  locationErrorMsg:
  {
    title: '错误信息',
    key: 'locationErrorMsg',
    table: { display: () => !true },
    read: { display: () => !true },
    create: { display: () => !true },
    edit: { display: () => !true },

  },
  isExpire:
  {
    title: '是否超时',
    key: 'isExpire',
    table: { display: () => !true },
    read: {
      display: () => true,
      render (h) {
        let stat = this.$attrs.value ? '是' : '否'
        return h('div', stat)
      },
    },
    create: { display: () => !true },
    edit: { display: () => !true },
    search: {
      display: () => !true, render (h) {
        return h(trueOrFalse, {
          props: {
            value: this.$attrs.value
          },
          on: {
            returnData: (info) => {
              this.$emit('bindData', info.status)
            }
          }
        })
      },
    },
  },
  departmentId:
  {
    title: '工程单位',
    key: 'departmentId',
    table: { display: () => !true },
    read: { display: () => !true },
    create: {
      display: () => true,
      render (h) {
        return h(engineeringUnit, {
          style: 'width: 100%',
          props: {
            value: Number(this.$attrs.value)
          },
          on: {
            returnData: (val) => this.$emit('bindData', val ? val.id : null)
          }
        })
      }
    },
    edit: { display: () => true },
    search: {
      display: () => true,
      render (h) {
        return h(engineeringUnit, {
          props: {
            value: Number(this.$attrs.value)
          },
          on: {
            returnData: (val) => this.$emit('bindData', val ? val.id : null)
          }
        })
      }
    },

  },
  state:
  {
    title: '工程状态',
    key: 'state',
    table: {
      display: () => true,
      render (h, info) {
        return h(showStatus, {
          props: {
            status: info.row.state
          }
        })
      },
    },
    read: {
      display: () => true,
      render (h, info, full) {
        return h('div',
          {
            style: 'display: flex;'
          },
          [
            h(showStatus, {
              style: 'margin-right: 10px;',
              props: {
                size: 'small',
                status: this.$attrs.value
              }
            }),
            h(changeStatus, {
              props: {
                info: full
              },
              on: {
                statusChange: () => {
                  this.$attrs.bus.emit('reloadTable', full)
                }
              }
            })
          ]
        )
      },
    },
    create: { display: () => !true },
    edit: { display: () => !true },
    search: {
      display: () => true,
      render (h) {
        return h(workOrderStatus, {
          props: {
            value: this.$attrs.value
          },
          on: {
            returnData: (info) => {
              this.$emit('bindData', info.id)
            }
          }
        })
      },
    },

  },
  endDate:
  {
    title: '最晚完成时间',
    key: 'endDate',
    table: {
      display: () => true,
      render (h, params) {
        return h('div', unixms2date(params.row.endDate))
      }
    },
    read: {
      display: () => true,
      render (h) {
        return h('div', unixms2date(this.$attrs.value))
      },
    },
    create: {
      display: () => true,
      render (h) {
        return h('el-date-picker', {
          style: 'width: 100%',
          props: {
            'value-format': 'timestamp',
            value: this.$attrs.value,
            type: 'datetime',
            align: 'right'
          },
          on: {
            input: info => {
              this.$emit("bindData", info);
            }
          }
        })
      },
    },
    edit: { display: () => true },

  },
  lastCommitTime:
  {
    title: '提交时间',
    key: 'lastCommitTime',
    table: { display: () => !true },
    read: {
      display: () => true,
      render (h) {
        return h('div', unixms2date(this.$attrs.value * 1000))
      },
    },
    create: { display: () => !true },
    edit: { display: () => !true },
  },
  lastCheckTime:
  {
    title: '检查时间',
    key: 'lastCheckTime',
    table: { display: () => !true },
    read: {
      display: () => true,
      render (h) {
        return h('div', unixms2date(this.$attrs.value * 1000))
      },
    },
    create: { display: () => !true },
    edit: { display: () => !true },

  },
  finishTime:
  {
    title: '完成时间',
    key: 'finishTime',
    table: {
      display: () => !true,
      render (h) {
        return h('div', unixs2date(this.$attrs.value))
      },
    },
    read: {
      display: () => true,
      render (h) {
        return h('div', unixs2date(this.$attrs.value))
      },
    },
    create: {
      display: () => !true,
    },
    edit: { display: () => !true },

  },
  note:
  {
    title: '备注',
    key: 'note',
    table: { display: () => !true },
    read: { display: () => true },
    create: {
      display: () => true,
      render (h) {
        return h("el-input", {
          attrs: { placeholder: window.i18n.t("subdistricts.enter_here") },
          props: {
            value: this.$attrs.value,
            type: "textarea",
            autosize: { minRows: 2, maxRows: 4 }
          },
          on: {
            input: info => {
              this.$emit("bindData", info);
            }
          }
        });
      }
    },
    edit: {
      display: () => true,
      render (h) {
        return h("el-input", {
          attrs: { placeholder: window.i18n.t("subdistricts.enter_here") },
          props: {
            value: this.$attrs.value,
            type: "textarea",
            autosize: { minRows: 2, maxRows: 4 }
          },
          on: {
            input: info => {
              this.$emit("bindData", info);
            }
          }
        });
      }
    },
  },
  ...CreaterColumn
}
