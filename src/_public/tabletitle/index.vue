<template>
  <div>
    <el-card style="width: 100%;">
      <public-form
        :column="tableColumn"
        size="mini"
        label-width="80px"
        @allData="bindData"
        :tableHeader="tableHeader"
        :tableItem="tableItem"
      >
        <template v-slot:addone="{ methods: { resetForm } }">
          <slot name="button-header"></slot>
          <div style="display: flex; justify-content: flex-end;">
            <slot name="button-left"></slot>
            <slot name="button-body">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-refresh"
                @click="() => {resetForm(); search({});reset()}"
              >{{$t('_public.reset')}}</el-button>
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-search"
                @click="search()"
              >{{$t('_public.inquire')}}</el-button>
            </slot>
            <slot name="button-right"></slot>
          </div>
        </template>
      </public-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "TableTitle",
  props: {
    column: Object,
    request: Object,
    args: Object
  },
  data () {
    return {
      searchInfo: {},
      tableHeader: {
        display: 'flex'
      },
      tableItem: {
        width: '300px',
        marginRight: '10px'
      }
    }
  },
  computed: {
    tableColumn: function () {
      return Object.values(this.column)
        .filter(item => item.search && item.search.display)
        .filter(item => item.search.display())
        .map(item => {
          return {
            title: item.title,
            key: item.key,
            ...item.search,
            style: { width: "26%" }
          };
        });
    }
  },
  watch: {
    request: {
      immediate: true,
      handler: function () {
        this.search();
      }
    }
  },
  methods: {
    bindData (info) {
      this.searchInfo = info
      this.$emit("returnData", info);
    },
    search (args = this.args) {
      this.$emit("searchInfo", this.searchInfo)
      this.request.search({ args: args });
    },
    handleKeyup (event) {
      // const e = event || window.event || arguments.callee.caller.arguments[0]
      const e = event
      if (!e) return
      if (e.key == 'Enter')
        this.search()
    },
    reset () {
      this.searchInfo = ""
      this.$emit("searchInfo", this.searchInfo)
    }
  },
  mounted () {
    window.addEventListener('keyup', this.handleKeyup)
  }
};
</script>
