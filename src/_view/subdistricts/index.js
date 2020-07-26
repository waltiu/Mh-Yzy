export const column = {
  selection: {
    table: {
      config: {
        type: "selection",
        width: 60,
        align: "center"
      },
      display: () => true
    },
    key: "incall-selection"
  },
  name: {
    title: "名称",
    key: "name",
    // 注入table参数
    table: {
      config: {},
      display: () => true
    },
    create: {
      display: () => true,
      rule: () => { }
    },
    edit: {
      display: () => true,
      render (h) {
        return h("el-input", {
          attrs: {
            placeholder: window.i18n.t("subdistricts.enter_here")
          },
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
      // TODO
      // rules: [{ required: true, trigger: "blur" }]
    },
    read: {
      display: () => true,
      rule: () => { }
    },
    search: {
      display: () => true,
      render (h) {
        return h("el-input", {
          attrs: { placeholder: window.i18n.t("subdistricts.enter_here") },
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
    map: {}
  },
  city: {
    title: "所属城市",
    key: "city",
    table: {
      config: {},
      display: () => true
    },
    create: {
      display: () => true,
      rule: () => { }
    },
    edit: {
      display: () => true,
      render (h) {
        return h("el-input", {
          attrs: { placeholder: window.i18n.t("subdistricts.enter_here") },
          props: {
            value: this.$attrs.value,
            type: "text"
          },
          on: {
            input: info => {
              this.$emit("bindData", info);
            }
          }
        });
      }
    },
    read: {
      display: () => true
    },
    map: {}
  },
  area: {
    title: "所属区域",
    key: "area",
    table: {
      config: {},
      display: () => true
    },
    create: {
      display: () => true,
      rule: () => { }
    },
    edit: {
      display: () => true,
      render (h) {
        return h("el-input", {
          attrs: { placeholder: window.i18n.t("subdistricts.enter_here") },
          props: {
            value: this.$attrs.value,
            type: "text"
          },
          on: {
            input: info => {
              this.$emit("bindData", info);
            }
          }
        });
      }
    },
    read: {
      display: () => true
    },
    map: {}
  },
  serviceArea: {
    title: "opticalSplitter.businessArea",
    key: 'serviceArea',
    table: {
      config: {},
      display: () => true
    },
    read: {
      config: {},
      display: () => true
    },
    create: {
      display: () => !true,
      rule: () => { }
    },
    edit: {
      display: () => !true,
    },
    map: {}
  },
  isHaveOverAreaMr: {
    title: "_view.isAcrossAreas",
    key: 'isHaveOverAreaMr',
    table: {
      config: {},
      display: () => true
    },
    read: {
      config: {},
      display: () => true
    },
    create: {
      display: () => !true,
      rule: () => { }
    },
    edit: {
      display: () => !true,
    },
    map: {}
  },
  lng: {
    title: "经度",
    key: 'lng',
    table: {
      config: {},
      display: () => !true
    },
    create: {
      display: () => true,
      render (h) {
        return h("public-form-select-point", {
          props: {
            coor: (this.$attrs.full && this.$attrs.full.lng && this.$attrs.full.lat)
              ? { lng: this.$attrs.full.lng, lat: this.$attrs.full.lat }
              : null,
          },
          on: {
            returnData: info => {
              this.$attrs.functions.bindData(info.lat, 'lat')
              this.$attrs.functions.bindData(info.lng, 'lng')
            }
          },
        });
      },
      rule: () => { }
    },
    edit: {
      title: window.i18n.t('cable.latitudeAndLongitude'),
      display: () => true,
      render (h) {
        return h("public-form-select-point", {
          props: {
            coor: (this.$attrs.full && this.$attrs.full.lng && this.$attrs.full.lat)
              ? { lng: this.$attrs.full.lng, lat: this.$attrs.full.lat }
              : null,
          },
          on: {
            returnData: info => {
              this.$attrs.functions.bindData(info.lat, 'lat')
              this.$attrs.functions.bindData(info.lng, 'lng')
            }
          },
        });
      },
    },
    read: {
      display: () => true
    },
    map: {}
  },
  lat: {
    title: "纬度",
    key: "lat",
    table: {
      config: {},
      display: () => !true
    },
    create: {
      display: () => !true,
      rule: () => { }
    },
    edit: {
      display: () => !true,
    },
    read: {
      display: () => true
    },
    map: {}
  },
  note: {
    title: "备注",
    key: "note",
    table: {
      config: {},
      display: () => false
    },
    create: {
      display: () => true,
      rule: () => { }
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
    read: {
      display: () => true
    },
    map: {}
  }

}

