<template>
  <div>
    <public-table-title
      :request="request"
      :column="tableColumn"
      :args="tableStatus"
      @returnData="(info) => { tableStatus = info }"
    >
      <template v-slot:button-left>
        <div style="display: flex;">
          <over-area :request="request"></over-area>

          <middle-excel-export-import :type="'subdistricts'" :download="download" :upload="upload"></middle-excel-export-import>

          <create-info :request="request"></create-info>
        </div>
      </template>
    </public-table-title>
    <public-next-table-view :request="request" :column="tableColumn"></public-next-table-view>

    <public-paging
      :request="request"
      style="display: flex; justify-content: flex-end; margin-top: 20px;"
    ></public-paging>
  </div>
</template>

<script>
import { ResourceApiLayer } from "@/_command/curd";
import { column } from "./index.js";

import CreateInfo from "./create";
import overArea from './search/overarea'
import edit from "./edit";
import read from "./read";
import map from './map';
import { auth } from '@/_command/excelPermissions';

export default {
  name: "BusinessNet",
  components: {
    CreateInfo, overArea
  },
  data () {
    return {
      tableStatus: {}
    };
  },
  computed: {
    request: function () {
      return new ResourceApiLayer("subdistricts");
    },
    tableColumn: function () {
      column.name.title = window.i18n.t("subdistricts.name");
      column.area.title = window.i18n.t("subdistricts.area");
      column.lat.title = window.i18n.t("subdistricts.latitude");
      column.lng.title = window.i18n.t("subdistricts.longitude");
      column.note.title = window.i18n.t("subdistricts.note");
      column.city.title = window.i18n.t("subdistricts.city");
      // coloum.serviceArea.title=window.i18n.t("subdistricts.serviceArea");
      return { ...column, "incall-options": this.options() };
    },
  },
  methods: {
    download (downloadInfo) {
      return [
        {
          name: this.$i18n.t('_view.exportBDData'),
          args: { ...downloadInfo.args, type: 'BD' },
          url: downloadInfo.url,
          permission: () => auth("excelmanage.export")    //TODO 缺少小区资源.r权限判断
        },
        {
          name: this.$i18n.t('_view.exportWGSData'),
          args: { ...downloadInfo.args, type: 'WGS' },
          url: downloadInfo.url,
          permission: () => auth("excelmanage.export")
        },
        {
          name: this.$i18n.t('_view.exportGCJData'),
          args: { ...downloadInfo.args, type: 'GCJ' },
          url: downloadInfo.url,
          permission: () => auth("excelmanage.export")
        },
      ]
    },
    upload (info) {
      return [
        {
          name: this.$i18n.t('_view.exportBDData'),
          args: { ...info.args, type: 'BD' },
          url: info.url,
          permission: () => auth("excelmanage.input")
        },
        {
          name: this.$i18n.t('_view.exportWGSData'),
          args: { ...info.args, type: 'WGS' },
          url: info.url,
          permission: () => auth("excelmanage.input")
        },
        {
          name: this.$i18n.t('_view.exportGCJData'),
          args: { ...info.args, type: 'GCJ' },
          url: info.url,
          permission: () => auth("excelmanage.input")
        },
      ]
    },
    options () {
      return {
        title: this.$t("subdistricts.operating"),
        key: "incall-options",
        table: {
          display: () => true,
          render: (h, params) =>
            h(
              "div",
              {
                style: "display: flex;"
              },
              [
                h(read, {
                  props: {
                    request: this.request,
                    info: params.row
                  }
                }),
                h(edit, {
                  props: {
                    request: this.request,
                    info: params.row
                  }
                }),
                h("public-delete-button", {
                  props: {
                    request: this.request,
                    info: params.row
                  }
                }),
                h(map, {
                  props: {
                    request: this.request,
                    info: params.row
                  }
                })
              ]
            )
        }
      };
    }
  }
};
</script>
