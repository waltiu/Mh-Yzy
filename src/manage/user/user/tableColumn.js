import store from '@/store/index'
import cityJson from './mock/city.json'
const data = [{
        type: 'selection',
        width: 60,
        tableDisplay: true,
        editDisplay: false,
        align: 'center'
    },
    {
        title: 'user.userName', // 用户名
        tableDisplay: true,
        editDisplay: true,
        key: 'name',
        render: (h, params) => {
            return h('el-tooltip', {
                props: {
                    content: params.row.note || window.i18n.t('main.noNotes'),
                    placement: 'bottom-start'
                }
            }, [
                h(
                    'p',
                    params.row.name)
            ])
        }
    },
    {
        title: 'user.loginName', // 登录名
        tableDisplay: true,
        editDisplay: true,
        key: 'loginName'
    },
    {
        title: 'user.password', // 密码
        tableDisplay: false,
        noDisplay: true,
        editDisplay: true,
        inputType: 'password',
        key: 'loginPassword'
    },
    // {
    //   title: '账户状态',
    //   tableDisplay: true,
    //   editDisplay: false,
    //   key: 'isEnable',
    //   render: (h, params) => {
    //     return h('div', params.row.isEnable ? '启用' : '禁止')
    //   }
    // },
    {
        title: 'OS.departmentId', // 工程单位
        tableDisplay: false,
        editDisplay: () => {
            return store.getters.getUserRole.includes('fgqgdgl.sgryxz')
        },
        multiple: true,
        multipleLimit: 1,
        list: [],
        key: 'sysDepartments',
        source: (item, raw, res, columItem) => {
            if (item && item[0]) {
                return item
            } else {
                // 返回第一个
                if (item === undefined) {
                    return columItem.list[0] ? [columItem.list[0]] : []
                } else {
                    return []
                }
            }
        }
    },
    {
        title: 'user.mobilePhone', // 移动电话
        tableDisplay: true,
        editDisplay: true,
        key: 'mobilPhone'
    },
    {
        title: '办公室电话', // 办公室电话
        tableDisplay: false,
        editDisplay: true,
        key: 'officePhone'
    },
    {
        title: '用户组', // 用户组
        tableDisplay: false,
        noDisplay: true,
        editDisplay: () => {
            return store.getters.getUserRole.includes('yhzgl.u')
        },
        role: true,
        key: 'sysRoleList',
        source: (item) => item || []
    },
    {
        title: '性别', // 性别
        tableDisplay: false,
        editDisplay: true,
        list: ['男', '女'],
        key: 'sex',
        source: (item) => item || ''
    },
    {
        title: '电子邮件', // 电子邮件
        tableDisplay: false,
        editDisplay: true,
        key: 'email'
    },
    {
        title: '城市信息', // 电子邮件
        tableDisplay: false,
        editDisplay: true,
        key: 'cityInfo',
        cityJson: JSON.parse(JSON.stringify(cityJson))
    },
    {
        title: '备注', // 备注
        tableDisplay: false,
        editDisplay: true,
        inputType: 'textarea',
        key: 'note'
    },
    {
        title: '省', // 备注
        tableDisplay: false,
        editDisplay: false,
        key: 'belongProvince'
    },
    {
        title: '市', // 备注
        tableDisplay: false,
        editDisplay: false,
        key: 'belongCity'
    },
    {
        title: '区', // 备注
        tableDisplay: false,
        editDisplay: false,
        key: 'belongCountry'
    }
]

export default data