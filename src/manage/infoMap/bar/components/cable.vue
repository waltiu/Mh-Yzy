<template>
  <div>
    <public-content :name="$options.name">
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <img src="/icons/filtrate.png" width="20px" height="20px" />
            {{$t('infoMap.high-levelScreening')}}
          </template>
          <enum-type :name="$options.name" :enumerateArray="$allConfig[$options.name]">
            <div class="enuselectitem">
              <div class="nameBox">
                <span>{{$t('infoMap.transmissionSystem')}}:</span>
              </div>

              <big-select-down
                class="input"
                selectAll
                :max="9999999"
                :selected="selected"
                :config="table"
                :list="table.bigSelectDown()"
                @returnData="bindData"
              ></big-select-down>
            </div>
          </enum-type>
        </el-collapse-item>
      </el-collapse>

      <center v-if="$store.getters.getKeepCableShowById.length" style="margin-top: 20px;">
        <el-button
          size="mini"
          @click="$store.commit('setMapStatus', {
          key: 'keepCableShow',
          status: []
        })"
          type="primary"
        >{{$t('infoMap.clearMarking')}}</el-button>
      </center>
    </public-content>
  </div>
</template>

<script>
import enumType from '../public/enumerateType'
import publicContent from '../public/content'

export default {
  name: 'cable',
  components: {
    publicContent,
    enumType
  },
  data () {
    return {
      table: {
        title: '传输系统',
        tableDisplay: false,
        editDisplay: false,
        noDisplay: true,
        bigSelectDown: () => this.$store.getters.getObjByType['传输系统'],
        result: (item) => {
          return item.join(';')
        },
        display: (item) => {
          if (this._.isString(item)) {
            return item.split(';')
          }
          return []
        },
        key: 'ocCoreInfo'
      }
    }
  },
  computed: {
    displayName: {
      get: function () {
        return !!this.$store.state.infoMapShow.inputSelect[this.$options.name].displayName
      },
      set: function (newVal) {
        this.$store.commit('setInputAddOne', {
          name: 'cable',
          val: {
            displayName: newVal
          }
        })
      }
    },
    selected: function () {
      if (this.$store.state.infoMapShow.inputSelect[this.$options.name].selected) {
        return this.$store.state.infoMapShow.inputSelect[this.$options.name].selected.transferSystems
      } else {
        return ''
      }
    }
  },
  methods: {
    bindData (newVal) {
      this.$store.commit('setInputSelect', {
        name: 'cable',
        keys: 'cable',
        val: { 'transferSystems': newVal }
      })
    }
  }
}
</script>

<style>
.enuselectitem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
  align-items: center;
}
.nameBox {
  display: flex;
  width: 27%;
  font-size: 13px;
  /*justify-content: flex-end;*/
}
.input {
  width: 75%;
}
</style>
