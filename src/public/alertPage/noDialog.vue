<template>
  <div style="display: flex;">
    <!-- 筛选条件: 在 table 里的 Object 都会默认显示, 如果有禁止显示的, 请把 title 置空-->

    <!-- 处理递归 -->
    <!-- <div :style="{
      width: table[1].key === 'name' ? '30%' : '100%'
    }">-->
    <div style="width: -webkit-fill-available;">
      <!-- 结束 -->

      <div v-for="(a, index) of table" :key="index">
        <div v-if="!!a.title && String(a.title).length > 1 && !a.noDisplay">
          <slot :name="a.key" :item="a" :info="fullData[a.key]" :fullInfo="fullData">
            <div style="display:flex;">
              <div style="display:block;width:auto;white-space: nowrap">{{ $t(a.title) }} :</div>
              <div style="width: 10px;"></div>

              <slot :name="`item-${a.key}`">
                <div v-if="!a.render" style="width: 100%">
                  <div style="width: 100%">
                    <div v-if="a.progress" style="width: 100%">
                      <use-rate
                        :progress="fullData[a.key] ? (fullData[a.key] * 100).toFixed(2) : 0"
                      ></use-rate>
                    </div>

                    <div
                      v-else-if="['engineeringDrawing', 'orderFile'].includes(a.key)"
                      style="width: 100%;"
                    >
                      <file-operating
                        :headers="$store.state.token"
                        :display="false"
                        :preList="(fullData[a.key] || {}).info || []"
                      ></file-operating>
                    </div>

                    <div v-else-if="!!a.autoComplete && fullData[a.key]">
                      <div style="display: flex">{{ fullData[a.key].name }}</div>
                    </div>

                    <div v-else-if="a.colorPicker">
                      <color-picker :color="fullData[a.key]"></color-picker>
                    </div>
                    <!-- 多选 -->
                    <div v-else-if="a.multiple">
                      <div
                        v-for="(item, index) in fullData[a.key]"
                        :key="index + 'select_' + 'index'"
                      >{{ $t(item.name) + ' '}}</div>

                      <div v-if="_.isEmpty(fullData[a.key])">{{$t('main.none')}}</div>
                    </div>

                    <div v-else-if="a.key === 'state'">
                      <order-status
                        :info="fullData"
                        @returnData="(info) => { fullData.state = info }"
                      ></order-status>
                    </div>

                    <div v-else-if="a.bigSelectDown">
                      <big-select-down
                        :onlyDisplay="true"
                        :list="a.bigSelectDown()"
                        :selected="fullData[a.key]"
                        :config="a"
                      ></big-select-down>
                    </div>

                    <div
                      v-else-if="a.time || ['date', 'datetime', 'time'].includes(a.inputType)"
                    >{{ fullData && fullData[a.key] ? $moment(Number(fullData[a.key])).format('llll') : $t('main.empty') }}</div>

                    <!-- 防止错位 -->
                    <div v-else style="width: 90%;word-wrap: break-word;">{{ computedEnumerate(a) }}</div>
                  </div>
                </div>

                <div v-else>
                  <render-element :renderObject="a" :info="{row: fullData}"></render-element>
                </div>
              </slot>
            </div>
          </slot>
          <!-- </div> -->

          <hr />
        </div>
      </div>

      <!-- 处理递归 -->
      <div v-if="table[1].key === 'name'">
        <el-collapse>
          <el-collapse-item name="1">
            <template slot="title">
              <i style="font-size: 18px; color: #409EFF; margin-right: 7px;" class="el-icon-edit"></i>
              <!-- 创建信息 -->
              {{$t('alert.createInformation')}}
            </template>
            <div>
              <no-dialog-alert :table="mixinsData" :info="this.info"></no-dialog-alert>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>

    <!-- 处理递归 -->
    <slot name="bar">
      <div style="width: 65%; display: flex;" v-if="table[1].key === 'name'">
        <div style="padding-left: 20px;padding-right: 20px;">
          <div style="width: 2px; border: 1px solid gray; height: 100%;"></div>
        </div>

        <div style="width: 100%">
          <slot name="view-header"></slot>
          <slot name="view-photo">
            <photo-viewer slot="view-photo" :info="fullData"></photo-viewer>
          </slot>
          <slot name="view-map">
            <display-in-map-via-alert-page :type="type" :info="info"></display-in-map-via-alert-page>
          </slot>
          <slot name="view-footer"></slot>
        </div>
      </div>
    </slot>

    <slot></slot>
  </div>
</template>

<script>
import useRate from '../useRate'
import photoViewer from '../photoViewer'
import orderStatus from '../orderStatus'
import renderElement from '../render'

import displayInMapViaAlertPage from '@/public/displayInMap/viaAlertPage.vue'

export default {
  name: 'noDialogAlert',
  props: {
    table: Array, // 表格表头
    info: Object, // 要展示的数据
    type: String
  },
  components: {
    useRate, photoViewer, orderStatus, renderElement, displayInMapViaAlertPage
  },
  data () {
    return {
      fullData: {},
      mixinsData: [
        {
          title: 'alert.founder',
          tableDisplay: false,
          editDisplay: false,
          key: 'gmtCreator'
        },
        {
          title: 'alert.creationTime',
          tableDisplay: false,
          editDisplay: false,
          time: true,
          key: 'gmtCreate'
        },
        {
          title: 'alert.modifier',
          tableDisplay: false,
          editDisplay: false,
          key: 'gmtModifier'
        },
        {
          title: 'alert.modifiedTime',
          tableDisplay: false,
          editDisplay: false,
          time: true,
          key: 'gmtModified'
        }
      ]
    }
  },
  watch: {
    info: {
      immediate: true,
      handler: function (newVal) {
        this.fullData = { ...newVal }
      },
      deep: true
    }
  },
  computed: {
    style: function () {
      let max = 0
      for (const iterator of this.table) {
        if (iterator.title && max < String(iterator.title).length) {
          max = String(iterator.title).length
        }
      }
      return {
        width: max * 19 + 'px',
        'text-align': 'right'
      }
    }
  },
  methods: {
    computedEnumerate (table) {
      // dialog在移除时候会触发一次检出数据, 如果sync被update后此项会报错， 所以hook解决
      if (!this.fullData) return this.$i18n.t('main.none')
      if (table.enumerate) {
        try {
          return (this.$store.getters.getObjByCode[this.fullData[table.key]].name)
        } catch (error) {
          return this.fullData[table.key] || this.$i18n.t('main.empty')
        }
      } else {
        switch (this.fullData[table.key]) {
          case undefined:
            return this.$i18n.t('main.empty')
          case false:
            return this.$i18n.t('main.false')
          case true:
            return this.$i18n.t('main.true')
          default:
            return this.fullData[table.key] || this.$i18n.t('main.empty')
        }
      }
    }
  }
}
</script>

<style scoped>
hr {
  background-color: #e0e0e0;
  height: 1px;
  border: none;
  margin-bottom: 9px;
  margin-top: 9px;
}
</style>
