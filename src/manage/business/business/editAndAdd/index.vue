<template>
  <div>
    <dialog-page
      @ok="submit"
      :title="
        $t(titleType) +
          (tableData.add === 0 ? $t('main.increase') : $t('main.edit'))
      "
      :info="tableData"
    >
      <div v-loading="loading">
        <el-tabs value="info">
          <el-tab-pane :label="$t('main.basicInformation')" name="info">
            <edit-add-info
              :disableArray="disableArray"
              @returnData="
                e => {
                  fullData = e;
                }
              "
              :columns="columns"
              :tableData="fullData"
            >
              <div slot="full-serviceType" v-if="tableData.add !== 0"></div>
              <div slot="full-workOrProtect" v-if="fullData.serviceType === 'ywlx.hj'"></div>
            </edit-add-info>
          </el-tab-pane>

          <el-tab-pane :label="'业务编辑'" v-if="fullData.serviceType === 'ywlx.hj'">
            <edit-page :fullData="fullData" @returnData="bindData"></edit-page>
          </el-tab-pane>
        </el-tabs>
      </div>
    </dialog-page>
  </div>
</template>

<script>
import EditPage from "./edit";

export default {
  name: "businessEditAndAdd",
  props: {
    type: String,
    // 表格数据
    tableData: [Object, Number]
  },
  components: {
    EditPage
  },
  data () {
    return {
      editStatus: false,
      disableArray: [],
      fullData: {},
      loading: false
    };
  },
  computed: {
    titleType: function () {
      return this.$pageUrl[this.type].name;
    },
    columns: function () {
      return this.$allConfig[this.type];
    }
  },
  methods: {
    bindData (info) {
      this.fullData = { ...this.fullData, ...info };
    },
    submit () {
      let a = [];
      if (this.fullData.ldsysOpticalCableWays) {
        this.fullData.ldsysOpticalCableWays.map(item => a.push({ id: item.id }));
        this.fullData.ldsysOpticalCableWays = a;
      }

      this.$resourceOperating(
        {
          name: this.type,
          type: this.tableData.add === 0 ? "create" : "update",
          info: this.fullData
        },
        e => {
          this.$checkStatus(e);
          // 重载表格
          this.$emit("reload");
        }
      );
    }
  },
  watch: {
    tableData: function (newVal) {
      if (newVal.add === undefined) {
        this.loading = true;
        this.$getTableFullInfo(this.type, newVal, e => {
          this.fullData = e.data;
          this.loading = false;
        });
      } else {
        this.fullData = {};
      }
    }
  }
};
</script>
