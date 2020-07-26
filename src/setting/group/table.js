let table = [
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
    title: 'tableSearch.remarks',
    tableDisplay: true,
    editDisplay: true,
    key: 'note'
  },
]


export default table