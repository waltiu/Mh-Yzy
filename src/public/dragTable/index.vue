<template>
  <!-- 光缆同路由对比 -->
  <div>
    <el-card class="box-card unselectable">
      <div slot="header" class="clearfix">
        <span>{{ $t(title) }}</span>

        <div style="float: right; display: -webkit-inline-box;">
          <slot name="header-button"></slot>
        </div>
      </div>

      <draggable
        v-model="list"
        class="dragArea"
        style="min-height: 100px"
        :group="group"
      >
        <div v-for="(element, index) in list" :key="index + 'zz'">
          <el-card v-if="list.length && element" style="margin-top: 20px;">
            <div style="display: -webkit-box;">
              <el-button
                type="primary"
                @click="showInfo(element)"
                icon="el-icon-info"
                size="mini"
                circle
                style="margin-right: 10px;"
              ></el-button>
              <div style="width: 90%">{{element.name}}</div>
              <el-button icon="el-icon-close" circle size="mini" @click="remove(index)"></el-button>
            </div>
          </el-card>
        </div>
      </draggable>
      <slot name="tip">
       <center v-if="!list.length">{{$t('main.empty')}}</center>
      </slot>
      
      <!-- main.empty' -->
    </el-card>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'dragTable',
  components: {
    draggable
  },
  props: {
    info: Array,
    group: {
      type: String,
      default: 'default'
    },
    close: {
      default: true,
      type: Boolean
    },
    title: {
      default: '默认分组',
      type: String
    }
  },
  data () {
    return {
      list: []
    }
  },
  watch: {
    list: function (newVal) {
      this.$emit('returnData', newVal)
      
    },
    info: function (newVal) {
      this.list = newVal
      this.$emit("returnLength",this.list.length)
    }
  },
  methods: {
    showInfo (item) {
      this.$store.commit('setMapStatus', {
        key: 'alertInfo',
        status: { ...item }
      })
      this.$store.commit('setMapStatus', {
        key: 'alertType',
        status: 'cable'
      })
    },
    remove (index) {
      this.$delete(this.list, index)
    },
    onEnd () {
    }
  }
}
</script>
