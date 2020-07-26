const data = [{
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
        title: 'well.length',
        tableDisplay: true,
        editDisplay: true,
        inputType: 'number',
        unit: window.i18n.t('main.metre'),
        key: 'length'
    },
    {
        title: 'infoMap.propertyRight',
        tableDisplay: true,
        editDisplay: true,
        enumerate: '产权',
        key: 'equity'
    },
    {
        title: 'well.numberHoles',
        tableDisplay: true,
        editDisplay: true,
        key: 'wellHole'
    },
    {
        title: 'tableSearch.remarks',
        tableDisplay: false,
        editDisplay: true,
        inputType: 'textarea',
        key: 'note'
    },
    {
        title: 'well.numberHoles',
        tableDisplay: true,
        editDisplay: false,
        key: 'wellHole'
    },
    {
        title: 'ldsysPoints',
        noDisplay: true,
        tableDisplay: false,
        editDisplay: false,
        key: 'ldsysPoints'
    }
]

export default data