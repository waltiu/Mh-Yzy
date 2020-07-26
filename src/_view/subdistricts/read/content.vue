<template>
  <div v-loading="loading">
    <div style="display: flex">
      <el-tabs value="first">
        <el-tab-pane :label="$t('subdistricts.base_infomation')" name="first">
          <public-content style="width: 40vw;" :column="tableColumn" :fullData="fullData"></public-content>
        </el-tab-pane>

        <el-tab-pane label="小区分析" name="sec">
          <div style="display: flex;">
            <div style="width: 55vw; margin-left: 20px; ">
              <select-item :eventBus="eventBus"></select-item>
              <show-map style="margin-top: 10px;" :eventBus="eventBus"></show-map>
            </div>

            <div style="margin-left: 10px;">
              <sub-checkbox :eventBus="eventBus"></sub-checkbox>

              <search-text :read="true" style="margin-top: 10px;" :eventBus="eventBus"></search-text>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { column } from "../index.js";
import ShowMap from "../components/map";
import SelectItem from "../components/select";
import searchText from "../components/net/search";
import SubCheckbox from '../components/checkbox'

export default {
  name: "ContentPage",
  props: {
    request: Object,
    eventBus: Object,
    info: Object
  },
  components: {
    SubCheckbox,
    ShowMap,
    SelectItem,
    searchText
  },
  data () {
    return {
      checked: [],
      fullData: {},
      loading: false,
      showInfo: [],
      baseDeviceRoomList: null,
      isSame: false
    };
  },
  methods: {
    loadInfo () {
      this.loading = true;
      this.request
        .readOneTable({ info: this.eventBus.fullData })
        .then(res => {
          this.eventBus.setFull(res.data);

          this.fullData = res.data;
        })
        .finally(() => {
          this.loading = false;
        });

    }
  },
  computed: {
    tableColumn: function () {
      return Object.values(column)
        .filter(item => item.read && item.read.display)
        .filter(item => item.read.display())
        .map(item => {
          return {
            title: item.title,
            key: item.key,
            ...item.read
          }
        })
    }
  },
  watch: {
    info: {
      handler: function (newVal) {
        this.fullData = { ...newVal }
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.loadInfo()
    })
  },
}
</script>
