<template>
  <!-- 用来CURD多个项目 - 侧栏 -->
  <div>
    <el-card
      class="box-card unselectable"
      style="padding:  0px; margin-top: 10px;margin-left: 15px"
    >
      <el-alert
        :title="$t('cable.prompt')"
        :description="$t('lightRoad.description')"
        type="warning"
        :closable="false"
      ></el-alert>

      <SlickList lockAxis="y" v-model="list" :useDragHandle="true">
        <SlickItem v-for="(item, index) in list" :index="index" :key="index">
          <!-- Index 即为当前的索引 -->
          <el-card class="box-card" style="margin-top: 10px;" shadow="never">
            <div>
              <!-- <el-tooltip content="删除当前杆路段" placement="left"> -->
              <i class="el-icon-close" style="float: right;" @click="removeCard(index)"></i>
              <!-- </el-tooltip> -->
            </div>

            <div v-loading="item.loading">
              <div style="margin-top: 10px;">
                <div
                  style="margin-top: 15px; margin-bottom: 15px; margin-left: 10px; display: flex;"
                >
                  <i v-handle class="el-icon-menu" style="margin-right: 5px; font-size: 18px;"></i>

                  <el-badge
                    :value="!_.isEmpty(del[index]) || item.id  ? '' : $t('lightRoad.newPoleRoad')"
                    class="item"
                  >{{ item.name }}</el-badge>
                </div>

                <div style="margin-left: 50px; display: flex;">
                  <div style="border: 1px solid #808080;width: 1px;height: 40px;"></div>
                  <div style="margin-left: 5px;">
                    {{ item.startName }}
                    <br>
                    {{ item.endName }}
                  </div>
                </div>

                <div style="float: right; margin-top: 10px;margin-bottom: 10px;">
                  <el-tooltip :content="$t('lightRoad.editPoleRoadSectionName')" placement="left">
                    <el-button
                      @click="editSectionName(index, item)"
                      icon="el-icon-edit"
                      size="mini"
                      type="primary"
                      style="margin-left: 20px;"
                      circle
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip :content="$t('cable.exchange')" placement="left">
                    <el-button
                      @click="reverse(index, item)"
                      icon="el-icon-sort"
                      size="mini"
                      type="primary"
                      style="margin-left: 5px;"
                      circle
                    ></el-button>
                  </el-tooltip>
                </div>

                <!-- <el-button @click="deleteObj(index, item, 'start')" v-show="_.isEmpty(del)" type="danger" icon="el-icon-delete" size="mini" style="margin-left: 5px;" circle></el-button> -->
                <!-- <el-button @click="deleteObj(index, item, 'end')" v-show="_.isEmpty(del)" type="danger" icon="el-icon-delete" size="mini" style="margin-left: 5px;" circle></el-button> -->
              </div>
            </div>
          </el-card>
        </SlickItem>
      </SlickList>
    </el-card>
    <change-section-name :info="edit" @returnData="bindEditData"></change-section-name>
  </div>
</template>

<script>
import { SlickList, SlickItem, HandleDirective } from 'vue-slicksort'
import changeSectionName from './changeSectionName.vue'

export default {
  directives: { handle: HandleDirective },
  name: 'addCard',
  props: {
    info: Object
  },
  components: {
    changeSectionName,
    SlickItem,
    SlickList
    // lineSetting
  },
  data () {
    return {
      template: {
        endId: '',
        endLat: '',
        endLng: '',
        endName: '',
        // id: '',
        name: '',
        startId: '',
        startLat: '',
        startLng: '',
        startName: ''
      },
      list: [],
      del: {}, // 要删除的Obj
      edit: {}, // 要编辑的信息, 此处为此obj, eg: {index: {}}
      add: {} // 要增加的Obj
    }
  },
  watch: {
    info: function (newVal) {
      this.list = newVal.lines ? newVal.lines : []
    },
    list: function () {
      this.$emit('returnData', {
        lines: this.list
      })
    },
    '$store.state.infoMap.laying': function (newVal) {
      // 判断是否在删除状态
      if (!this._.isEmpty(this.del)) {
        // 执行补全删除
        Object.entries(this.del).forEach(([index, obj]) => {
          let tmp = { ...obj }
          Object.entries(obj).forEach(([key, val]) => {
            if (!val) {
              tmp[key] = newVal[this.$hyphenate(key).split('-')[1]]
            }
          })
          tmp['loading'] = true
          tmp['name'] = tmp['startName'] + '-' + tmp['endName']
          this.$set(this.list, index, tmp)
          this.getPointsInfo(index, tmp)
          this.del = {}
        })
      } else {
        // 增加
        if (!this._.isEmpty(this.add)) {
          // 已经输入了一个点
          let add = { ...this.add }
          Object.entries(add).forEach(([key]) => {
            if (key.includes('end')) {
              add[key] = newVal[this.$hyphenate(key).split('-')[1]]
            }
          })
          this.add = {}
          add['name'] = add['startName'] + '-' + add['endName']
          add['loading'] = true
          this.$set(this.list, this.list.length - 1, add)
          this.getPointsInfo(this.list.length - 1, add)
        } else {
          // 没输入点
          let template = { ...this.template }
          Object.entries(template).forEach(([key]) => {
            if (key.includes('start')) {
              template[key] = newVal[this.$hyphenate(key).split('-')[1]]
            }
          })
          this.add = template
          this.list.push(template)
        }
      }
    }
  },
  methods: {
    getPointsInfo (index, info) {
      let tmp = { ...info }
      this.$http.post('/api/ldsysLineSections/getOneFrom2Point',
        [{ id: info.startId }, { id: info.endId }]
      ).then((result) => {
        if (result.data && result.data.length >= 1) {
          tmp = { ...tmp, id: result.data[0].id, name: result.data[0].name }
        }
        delete tmp.loading
        this.$set(this.list, index, tmp)
      })
    },
    deleteObj (index, item, type) {
      // 对于字段操作, 如果字段中含有Type包含 置空
      item = { ...item }
      Object.entries(item).forEach(([key]) => {
        if (key.includes(type)) {
          item[key] = ''
        }
      })
      // 删除任何一项, 段均不成立, 删除ID
      delete item.id
      // 置空 Name
      item['name'] = ''
      if (index === this.list.length - 1 && !item.startId && !item.endId) {
        this.removeCard(index)
      } else {
        this.del = { [index]: item }
        this.$set(this.list, index, item)
      }
    },
    reverse (index, item) {
      item = { ...item }
      Object.entries(item).forEach(([key]) => {
        if (key.includes('start')) {
          [item[key], item[key.replace('start', 'end')]] = [item[key.replace('start', 'end')], item[key]]
        }
      })
      item['name'] = item['startName'] + '-' + item['endName']
      this.$set(this.list, index, item)
    },
    bindEditData (args) {
      Object.entries(args).forEach(([key, val]) => {
        this.$set(this.list, key, val)
      })
    },
    editSectionName (index, item) {
      this.edit = { [index]: item }
    },
    removeCard (index) {
      if (index === this.list.length - 1) {
        this.add = {}
        this.del = {}
      }
      this.$delete(this.list, index)
    }
  }
}
</script>
