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
    title: 'tableSearch.administratorName', // 管理员名称
    tableDisplay: false,
    editDisplay: true,
    key: 'userName'
  },
  {
    title: 'tableSearch.loginName', // 登录名称
    tableDisplay: false,
    editDisplay: true,
    key: 'userLoginName'
  },
  {
    title: 'tableSearch.administratorPassword', // 管理员密码
    tableDisplay: false,
    editDisplay: true,
    inputType: 'password',
    key: 'userPassword'
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
