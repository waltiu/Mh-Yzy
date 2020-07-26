export const column = {
    selection: {
        table: {
            config: {
                type: 'selection',
                width: 60,
                align: 'center'
            },
            display: () => true
        },
        key: 'incall-selection'
    },
    name: {
        title: '名称',
        type: 'input',
        key: 'name',
        // 注入table参数
        table: {
            config: {},
            display: () => true,
        },
        create: {
            display: () => true,
            rule: () => {},
        },
        edit: {
            display: () => true,
            render(h) {
                return h('el-input', {
                    props: {
                        value: this.$attrs.value
                    },
                    on: {
                        input: (info) => { this.$emit('bindData', info) }
                    }
                })
            }
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
                        value: this.$attrs.value
                    },
                    on: {
                        input: (info) => { this.$emit('bindData', info) }
                    }
                })
            }
        },
        map: {}
    },
    model: {
        title: '机框型号',
        type: 'selectType',
        values: ['FONST1000(1UC)', 'FONST3000(3UC)'],
        key: 'model',
        // 注入table参数
        table: {
            config: {},
            display: () => true,
        },
        create: {
            display: () => true,
            rule: () => {},
        },
        edit: {
            display: () => true,
            render(h) {
                return h('el-input', {
                    props: {
                        value: this.$attrs.value
                    },
                    on: {
                        input: (info) => { this.$emit('bindData', info) }
                    }
                })
            }
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
                        value: this.$attrs.value
                    },
                    on: {
                        input: (info) => { this.$emit('bindData', info) }
                    }
                })
            }
        },
    },

    place: {
        title: '放置位置',
        type: 'place',
        values: ['机房', '室外'],
        key: 'place',
        // 注入table参数
        table: {
            config: {},
            display: () => true,
        },
        create: {
            display: () => true,
            rule: () => {},
        },
        edit: {
            display: () => true,
            render(h) {
                return h('el-input', {
                    props: {
                        value: this.$attrs.value
                    },
                    on: {
                        input: (info) => { this.$emit('bindData', info) }
                    }
                })
            }
        },
        read: {
            display: () => true,
            rule: () => {},
        }
    },
    lat: {
        title: '精度',
        type: 'lat',

        key: 'lat',
        // 注入table参数

        read: {
            display: () => true,
            rule: () => {},
        }
    },
    lng: {
        title: '纬度',
        type: 'lng',

        key: 'lng',
        // 注入table参数

        read: {
            display: () => true,
            rule: () => {},
        }
    },
    weight: {
        title: '重量',

        key: 'weight',
        // 注入table参数
        table: {
            config: {},
            display: () => true,
        },

        read: {
            display: () => true,
            rule: () => {},
        },
    },
    slotPosition: {
        title: '槽位',

        key: 'slotPosition',
        // 注入table参数
        table: {
            config: {},
            display: () => true,
        },

        read: {
            display: () => true,
            rule: () => {},
        },
    },
    type: {
        title: '槽位',
        type: 'select',
        key: 'type',
        // 注入table参数

        // create: {
        //     display: () => true,
        //     rule: () => {},
        // },
        // edit: {
        //     display: () => true,
        //     render(h) {
        //         return h('el-input', {
        //             props: {
        //                 value: this.$attrs.value
        //             },
        //             on: {
        //                 input: (info) => { this.$emit('bindData', info) }
        //             }
        //         })
        //     }
        // },
        // read: {
        //     display: () => true,
        //     rule: () => {},
        // }
    },



}