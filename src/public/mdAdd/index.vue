<template>
  <div>
    <md-speed-dial
      md-event="click"
      class="md-bottom-right"
      md-direction="top"
      style="position: fixed; z-index: 20; right: 120px; bottom: 50px;"
    >
      <md-speed-dial-target class="md-primary" @click="() => {buttonStatus = !buttonStatus}">
        <md-icon class="md-morph-initial">menu</md-icon>
        <md-icon class="md-morph-final">edit</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content v-show="buttonStatus">
        <div v-for="(item, index) of list" :key="index">
          <md-button class="md-icon-button" @click="click(index, item)" v-if="permission(item)">
            <el-tooltip class="item" effect="dark" :content="$t(item.text)" placement="left">
              <md-icon>{{ item.icon }}</md-icon>
            </el-tooltip>
          </md-button>
        </div>
        <slot></slot>
      </md-speed-dial-content>
    </md-speed-dial>
  </div>
</template>

<script>

export default {
  name: 'mdAdd',
  props: {
    type: String, // 组件名称
    info: Object, // 组件附加信息
    permissionKey: {
      default: '$userPermission',
      type: String
    }
  },
  components: {
  },
  data () {
    return {
      buttonStatus: false,
      preData: {
        add: {
          icon: 'add',
          text: 'main.increase',
          key: 'c' // 权限
        }
      }
    }
  },
  computed: {
    list: function () {
      return { ...this.preData, ...this.info }
    }
  },
  methods: {
    permission (info) {
      let baseKey = this[this.permissionKey][this.type]
      return this.$store.getters.getUserRole.includes(baseKey.key + '.' + info.key)
    },
    click (index, item) {
      this.$emit(index, index, item)
      this.$emit('all', index, item)
    }
  }
}
</script>
