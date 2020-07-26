<template>
  <!--
    formData中会持续存在中间数据, 只有在需要时emit数据
  -->
  <div style="min-height: 200px;">
    <el-form label-width="105px" :model="formData" :rules="rules">
      <div v-for="(a, index) in columns" :key="index">
        <div v-if="_.isFunction(a.editDisplay) ? a.editDisplay($store) : !!a.editDisplay">
          <div v-if="!a.permission || $store.getters.getUserRole.includes(a.permission)">
            <slot :name="'full' + '-' + a.key">
              <el-form-item
                style="display:block;width:auto;white-space: nowrap;"
                :label="$t(a.title) + (a.unit ? '(' + a.unit + ')' : '')"
                label-position="right"
                :prop="a.key"
              >
                <slot :name="a.key" :fullData="fullData" :item="formData[a.key]">
                  <!-- 当为 sysRoleList 时候进行插槽 -->
                  <div v-if="!!a.coordinate">
                    <el-input
                      icon="ios-location"
                      v-model="formData[a.key]"
                      size="small"
                      v-if="a!==5"
                      ref="coordinate"
                    >
                      <i
                        slot="suffix"
                        v-show="!disableArray.includes(a.key)"
                        class="el-icon-location"
                        style="font-size: 18px;"
                        @click="() => {selectPointInMap = {lng: formData.lng , lat: formData.lat }}"
                      ></i>
                    </el-input>
                  </div>

                  <div v-else-if="!!a.enumerate">
                    <el-select clearable size="small" style="width: 100%" v-model="formData[a.key]">
                      <el-option
                        v-for="(option, index_1) in $store.getters.getObjByType[a.enumerate]"
                        :value="option.code"
                        :label="option.name"
                        :key="index_1"
                      >{{option.name}}</el-option>
                    </el-select>
                  </div>

                  <div v-else-if="!!a.selectDistrict"></div>
                  <div v-else-if="!!a.cityJson">
                    <select-city :info="a" @getCityInfo="getCityInfo" :tableData="tableData"></select-city>
                  </div>

                  <div v-else-if="!!a.autoComplete">
                    <auto-complete-info
                      :values="formData[a.key]"
                      @returnData="(e) => {$set(formData, a.key, e)}"
                      :placeholder="$t(a.title)"
                      :url="$autoCompentedUrl[a.autoComplete].url "
                      :preData="$autoCompentedUrl[a.autoComplete].args"
                    ></auto-complete-info>
                  </div>

                  <div v-else-if="!!a.bigSelectDown">
                    <big-select-down
                      :list="a.bigSelectDown()"
                      :selected="formData[a.key]"
                      :config="a"
                      @returnData="(val) => {$set(formData, a.key, val)}"
                    ></big-select-down>
                  </div>

                  <!-- 权限检查 (编辑) -->
                  <div v-else-if="!!a.role">
                    <sys-role-check
                      :info="formData[a.key]"
                      @returnData="(item) => {formData[a.key] = item}"
                    ></sys-role-check>
                  </div>
                  <div v-else-if="!!a.listDefault">
                    <div v-if="sysDepartmentName">
                      <el-input v-model="sysDepartmentName"></el-input>
                    </div>
                  </div>
                  <div v-else-if="!!a.list">
                    <el-select
                      clearable
                      :multiple="!!a.multiple"
                      :multiple-limit="a.multipleLimit || 0"
                      style="width: 100%;"
                      size="small"
                      v-model="formData[a.key]"
                      filterable
                      :placeholder="$t('main.selection') + $t(a.title)"
                      value-key="id"
                    >
                      <el-option
                        v-for="(item, itemIndex) in (_.isFunction(a.list) ? a.list() : a.list)"
                        :key="itemIndex"
                        :label="_.isObject(item) ? item.name : item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </div>

                  <div v-else-if="a.colorPicker">
                    <el-color-picker v-model="formData[a.key]"></el-color-picker>
                  </div>
                  <!-- 文件上传 -->
                  <div v-else-if="!!a.file">
                    <file-operating
                      :preList="(formData[a.key] || {}).info || []"
                      :url="'/file/upload'"
                      :display="true"
                      :headers="$store.state.token"
                      @returnData="(info) => { $set(formData, a.key, {'info': info}) }"
                    ></file-operating>
                  </div>

                  <div v-else-if="['date', 'datetime', 'time'].includes(a.inputType)">
                    <el-date-picker
                      size="small"
                      style="width: 100%"
                      value-format="timestamp"
                      v-model="formData[a.key]"
                      :type="a.inputType"
                      :placeholder="$t('public.selectDateAndTime')"
                    ></el-date-picker>
                  </div>

                  <div v-else>
                    <!-- 增加type类型为 password 的支持, 当类型为passord时, 重置为未更改 -->
                    <el-input
                      size="small"
                      :disabled="a.disable"
                      :placeholder="a.inputType == 'password' ? $t('user.notChanged') : $t('tableSearch.pleaseInput')"
                      :type="a.inputType || 'text'"
                      v-model="formData[a.key]"
                    ></el-input>

                    <div v-if="a.inputType == 'password'">
                      <!-- 密码校验 -->
                      <el-input
                        size="small"
                        :disabled="!formData[a.key]"
                        :placeholder="$t('public.confirmYourPassword')"
                        type="password"
                        v-model="VerificationPassword"
                      ></el-input>

                      <el-tag
                        v-if="formData[a.key] !== VerificationPassword && formData[a.key]"
                        type="danger"
                      >{{$t("main.inconsistent")}}</el-tag>
                    </div>
                  </div>
                </slot>
              </el-form-item>
            </slot>
          </div>
        </div>
      </div>
    </el-form>
    <div>
      <select-point
        @returnData="(e) => {formData.lng = e.lng, formData.lat = e.lat}"
        :point="selectPointInMap"
      ></select-point>
    </div>
  </div>
</template>

<script>
import selectPoint from '@/public/selectPointInMap'
import selectCity from './selectCity'

export default {
  name: 'editAndAdd',
  components: {
    selectPoint,
    selectCity
  },
  data () {
    return {
      preRequire: {
        name: {
          require: (data) => !!data
        }
      },
      ableToDo: true,
      addInfo: {}, // 获取地址信息
      addFormatted: {}, // 详细地址
      VerificationPassword: '',
      loading: true,
      selectPointInMap: {},
      watchFormData: () => { }, // 用来储存动态 WATCH 对象
      formData: {},
      inAndOut: true,
      status: {}, // 表单的状态, eg: {key: {disbale: true}}
      dName: {},
      sysDepartmentName: '',
    }
  },
  props: {
    columns: Array,
    tableData: Object,
    disableArray: {
      default: () => [],
      type: Array
    },
    preData: Object
  },
  computed: {
    fullData: function () {
      return this.tableData
    },
    rules: function () {
      if (this.columns) {
        return Object.entries(this.columns).reduce((res, [, val]) => {
          if (val.rules) res[val.key] = val.rules
          return res
        }, {})
      }
      return {}
    }
  },
  watch: {
    columns: {
      immediate: true,
      handler: function () {
        // 生成初始列表
        if (this._.isEmpty(this.fullData)) {
          this.$nextTick(() => {
            this.formData = this.columns.reduce((res, key) => {
              if (key.key) {
                if (key.source) {
                  // 初始数据
                  res[key.key] = key.source()
                } else {
                  res[key.key] = null
                }
              }

              return res
            }, {})
          })
        }
      },
      deep: true
    },
    fullData: {
      immediate: true,
      handler: function (newVal) {
        this.watchLoop(newVal)
      },
      deep: true
    },
    'fullData.lat': {
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal && oldVal) {
          this.$refs.coordinate[1].blur()
          this.$refs.coordinate[1].focus()
          this.$refs.coordinate[2].blur()
          this.$refs.coordinate[2].focus()
          this.$refs.coordinate[2].blur()

        }

      },
      immediate: true,
      deep: true
    }
  },
  mounted: function () {
    this.dName = this.$store.state.userInfos
    if (this.dName.sysDepartments[0]) {
      this.sysDepartmentName = this.dName.sysDepartments[0].name
    }
  },
  methods: {
    getAllNew () {
      this.$http.get('getLocation/geocoder/v2/?&location=' + this.formData.lat + ',' + this.formData.lng + '&output=json&pois=1&ak=gTFWcx9MY4m9HVGVZGijrXPYgnKkbpep')
        .then(Response => {
          this.addInfo = Response.data
          this.addFormatted = { ...this.addFormatted, ...this.addInfo['result'] }
          for (const p in this.addFormatted) {
            if (p === 'formatted_address') {
              this.formData['address'] = this.addFormatted[p]
            }
          }
        })
    },
    getCityInfo (info) {
      this.formData = { ...this.formData, ...info }
    },
    watchLoop (newVal) {
      // 防止内存泄露
      this.watchFormData()
      // 使用 filter 执行筛选后数据后为formData赋值, 并且开始挂载监视FormData
      if (newVal) {
        this.formData = this.sourceHandle()
        // if (this.formData.useInfos === '') {
        //   this.formData.useInfos = {}
        // }
        this.watchFormData = this.$watch('formData', (newVal) => {
          if (this.formData.lat !== this.fullData.lat || this.formData.lng !== this.fullData.lng) {
            if (this.formData.lat !== '' && this.formData.lng !== '') {
              if (this.formData.address === this.fullData.address) {
                this.getAllNew()
              }
            }
          }
          this.$emit('returnData', this.filterHandle(newVal))
        }, { deep: true })
      }

      this.inAndOut = this.$store.state.other.inAndOut
      if (this.ableToDo) {
        if (this.formData.name === null || this.formData.name === '') {
          this.ableToDo = false
        }
        if (this.formData.lng === null || this.formData.lng === '') {
          this.ableToDo = false
        }
        if (this.formData.lat === null || this.formData.lat === '') {
          this.ableToDo = false
        }
        if (this.formData.ldsysOpticalCrossConnect && (this.formData.ldsysOpticalCrossConnect.code === undefined ||
          this.formData.ldsysOpticalCrossConnect.code === '' ||
          this.formData.ldsysOpticalCrossConnect.code === null)) {
          this.ableToDo = false
        }
      } else {
        this.ableToDo = true
      }
      this.$store.commit('getAbleToDO', this.ableToDo)
    },
    filterHandle () {
      // 对所有的数据执行 filter 方法后返回
      let tmp = this.columns.reduce((res, val) => {
        if (!val.key) return res
        try {
          res[val.key] = val.filter ? val.filter(this.formData[val.key], this.formData, res) : this.formData[val.key]
        } catch (error) {
          res[val.key] = null
        }
        return res
      }, {})
      return { ...this.formData, ...tmp }
    },
    sourceHandle () {
      // 对所有的数据执行 source 后返回
      let tmp = this.columns.reduce((res, val) => {
        if (!val.key) return res
        try {
          res[val.key] = val.source ? val.source(this.fullData[val.key], this.fullData, res, val) : this.fullData[val.key]
        } catch (error) {
          // TODO
          res[val.key] = null
        }
        return res
      }, {})
      return { ...this.fullData, ...tmp }
    }
  }
}
</script>
