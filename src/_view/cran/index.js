export const column = {
    selection: {
        table: {
            config: {
                type: 'selection',
                align: 'center'
            },
            display: () => true
        },
        key: 'incall-selection'
    },
    omID: {
        title: '设备ID',
        key: 'omID',
        // 注入table参数
        table: {
            config: {},
            display: () => true,
        },
        create: {
            display: () => false,
            rule: () => {},
        },
        edit: {
            display: () => false,
            type: "input",
        },
        read: {
            display: () => true,
            rule: () => {},
        },
        search: {
            display: () => true,
            render(h) {
                return h('el-input', {
                    props: {
                        value: this.$attrs.value,
                    },
                    on: {
                        input: (info) => { this.$emit('bindData', info) }
                    }
                })
            }

        },
        map: {}
    },
    omSN: {
        title: '设备SN',
        key: 'omSN',
        table: {
            config: {

            },
            display: () => true,
        },
        create: {
            display: () => true,
            rule: () => {},
        },
        edit: {
            type: "input",
            display: () => true,

        },
        read: {
            display: () => true,
        },
        search: {
            display: () => true,
            render(h) {
                return h('el-input', {
                    props: {
                        value: this.$attrs.value,
                    },
                    on: {
                        input: (info) => { this.$emit('bindData', info) }
                    }
                })
            }

        },
    },

    model: {
        title: '设备型号',
        key: 'model',
        table: {
            config: {},
            display: () => true,
        },
        create: {
            display: () => true,
            rule: () => {},
        },
        edit: {
            type: "selectType",
            display: () => true,
            values: '分合波器设备型号'

        },
        search: {
            display: () => true,
            render(h) {
                return h('el-input', {
                    props: {
                        value: this.$attrs.value,
                    },
                    on: {
                        input: (info) => { this.$emit('bindData', info) }
                    }
                })
            }

        },
        read: {
            display: () => true,
        },
        map: {}
    },
    name: {
        title: '设备名称',
        key: 'name',
        table: {
            config: {},
            display: () => true,
        },
        create: {
            display: () => false,
            rule: () => {},
        },
        edit: {
            type: "input",
            display: () => false,
            values: "传输系统厂家"


        },
        read: {
            display: () => true,
        },
        map: {}
    },
    waveNumber: {
        title: '波道数',
        key: 'waveNumber',
        table: {
            config: {
                width: '80%'

            },
            display: () => true,
        },
        create: {
            display: () => true,
            rule: () => {},
        },

        read: {
            display: () => true,
        },
        map: {}
    },
    type: {
        title: '设备类型',
        key: 'type',
        // table: {
        //     config: {
        //         width: '80%'
        //     },
        //     display: () => true,
        // },
        create: {
            display: () => true,
            rule: () => {},
        },

        read: {
            display: () => true,
        },
        map: {}
    },
    place: {
        title: '放置位置',
        key: 'place',
        table: {
            config: {
                width: '80%'

            },
            display: () => true,
        },
        edit: {
            type: 'selectPlay',
            display: () => true,
            values: ['机房', '室外']

        },
        read: {
            display: () => false,
        },
    },
    ldsysMachineRoom: {
        title: '所在机房',
        key: 'ldsysMachineRoom',

        create: {
            display: () => true,
            rule: () => {},
        },

        read: {
            display: () => true,
        },
        map: {}
    },
    portUseRate: {
        title: '占用率',
        key: 'portUseRate',
        table: {
            config: {
                width: '80%'
            },
            display: () => true,
        },
        create: {
            display: () => false,
            rule: () => {},
        },
        edit: {
            type: "select",
            display: () => false,
            values: [1, 2, 3]

        },
        read: {
            display: () => true,
        },
        map: {}
    },

    subFrame: {
        title: '子框',
        key: 'subFrame',
        // create: {
        //     display: () => true,
        //     rule: () => {},
        // },
        // edit: {
        //     type: "inputSmall",
        //     display: () => true,

        // },
        read: {
            display: () => true,
        },
    },
    slotPosition: {
        title: '槽位',
        key: 'slotPosition',
        // create: {
        //     display: () => true,
        //     rule: () => {},
        // },
        // edit: {
        //     type: "inputSmall",
        //     display: () => true,

        // },
        read: {
            display: () => true,
        },
    },
    lat: {
        title: '经度',
        key: 'lat',
        read: {
            display: () => true,
        },
    },
    lng: {
        title: '纬度',
        key: 'lng',
        read: {
            display: () => true,
        },
    }
}