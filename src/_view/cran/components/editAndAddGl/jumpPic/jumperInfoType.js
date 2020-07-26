// 枚举类型状态

let jumperInfoType = {
    // start 使用po 判断状态
    start: {
        10: {
            type: 'point',
            name: '网元',
            color: '',
            size: '30',
            icon: '/icons/lightRoadPictures/网元.png'
        },
        11: {
            type: 'point',
            name: '分光器',
            color: '',
            size: '30',
            icon: '/icons/lightRoadPictures/分光器.png'
        },
        13: {
            type: 'point',
            name: '分合波器',
            color: '',
            size: '30',
            icon: '/icons/lightRoadPictures/分和波器.png'
        },
        14: {
            type: 'point',
            name: '分合波器',
            color: '',
            size: '30',
            icon: '/icons/lightRoadPictures/分和波器.png'
        }
    },
    // node 中间
    node: {
        type: {
            0: {
                type: 'line',
                name: '光缆',
                color: 'red'
            },
            1: {
                type: 'point',
                name: '光交',
                color: '',
                size: '30',
                icon: '/icons/lightRoadPictures/光交箱.png'
            },
            2: {
                type: 'point',
                name: 'ODF',
                color: '',
                size: '30',
                icon: '/icons/lightRoadPictures/ODF.png'
            },
            8888: {
                type: 'point',
                name: '新增设备',
                color: '',
                size: '30',
                icon: '/icons/lightRoadPictures/未知设备.png'
            }
        }
    },
    // end 结束
    end: {
        10: {
            type: 'point',
            name: '网元',
            color: '',
            size: '30',
            icon: '/icons/lightRoadPictures/网元.png'
        },
        11: {
            type: 'point',
            name: '分光器',
            color: '',
            size: '30',
            icon: '/icons/lightRoadPictures/分光器.png'
        },
        13: {
            type: 'point',
            name: '分合波器',
            color: '',
            size: '30',
            icon: '/icons/lightRoadPictures/分和波器.png'
        },
        14: {
            type: 'point',
            name: '分合波器',
            color: '',
            size: '30',
            icon: '/icons/lightRoadPictures/分和波器.png'
        }
    }
}

let addNew = [{
        id: '',
        name: '跳纤',
        type: '0'
    },
    {
        id: '',
        jumpType: '',
        name: '　',
        portA: '',
        portAJump: '',
        portB: '',
        portBJump: '',
        type: 8888
    }
]

let ptn = {
    'node': [
        [{
                id: '',
                name: '跳纤',
                type: '0'
            },
            {
                id: '',
                jumpType: '',
                name: '　',
                portA: '',
                portAJump: '',
                portB: '',
                portBJump: '',
                type: '8888'
            },
            {
                id: '',
                name: '跳纤',
                type: '0'
            }
        ]
    ]
}

let sdh = {
    'node': [
        [{
                id: '',
                name: '跳纤',
                type: '0'
            },
            {
                id: '',
                jumpType: '',
                name: '　',
                portA: '',
                portAJump: '',
                portB: '',
                portBJump: '',
                type: '8888'
            },
            {
                id: '',
                name: '跳纤',
                type: '0'
            }
        ]
    ]
}

let olp = {
    'node': [
        [{
                id: '',
                name: '跳纤',
                type: '0'
            },
            {
                id: '',
                jumpType: '',
                name: '　',
                portA: '',
                portAJump: '',
                portB: '',
                portBJump: '',
                type: '8888'
            },
            {
                id: '',
                name: '跳纤',
                type: '0'
            }
        ],
        [{
                id: '',
                name: '跳纤',
                type: '0'
            },
            {
                id: '',
                jumpType: '',
                name: '　',
                portA: '',
                portAJump: '',
                portB: '',
                portBJump: '',
                type: '8888'
            },
            {
                id: '',
                name: '跳纤',
                type: '0'
            }
        ]
    ]
}

let editAndAdd = {
    'code': '',
    'name': '',
    'type': 'PTN',
    'lengthMap': null,
    'lengthMapSurplus': null,
    'coreNum': '双芯',
    'jsonExtends': {},
    'jumperInfo': {
        'end': {
            'id': '',
            'po': 'PTN',
            'name': '　',
            'type': '13',
            'portA': ''
        },
        'node': [
            [{
                    id: '',
                    name: '跳纤',
                    type: '0'
                },
                {
                    id: '',
                    jumpType: '',
                    name: '　',
                    portA: '',
                    portAJump: '',
                    portB: '',
                    portBJump: '',
                    type: '8888'
                },
                {
                    id: '',
                    name: '跳纤',
                    type: '0'
                }
            ]
        ],
        'start': {
            'id': '',
            'po': 'PTN',
            'name': '　',
            'type': '13',
            'portA': ''
        }
    },
    'note': null,
    'manufacturers': null,
    'startPort': null,
    'endPort': null,
    'startEp': null,
    'endEp': null,
    'startEpType': null,
    'endEpType': null,
    'innerJump': null,
    'azOCLine': null,
    'epA': null,
    'epZ': null,
    'epAPort': null,
    'epZPort': null,
    'olpOut': null,
    'graphInfo': null
}
export default {
    jumperInfoType,
    addNew,
    editAndAdd,
    ptn,
    olp,
    sdh
}