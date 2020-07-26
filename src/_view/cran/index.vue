<template>
  <div>
    <public-table-title
      :request="request"
      :column="tableColumn"
      :args="tableStatus"
      @returnData="(info) => { tableStatus = info }"
    >
      <template v-slot:button-left>
        <create-info :request="request"></create-info>
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
import { ResourceApiLayer } from '@/_command/curd';
import { column } from './index.js'

import CreateInfo from './create'
import edit from './edit'
import read from './read'
// import map from './map/index.vue'

export default {
  name: 'cran',
  components: {
    CreateInfo
  },
  data () {
    return {
      tableStatus: {}
    }
  },
  computed: {
    request: function () {
      return new ResourceApiLayer('cran')
    },
    tableColumn: function () {
      return { ...column, 'incall-options': this.options() }
    }
  },

  methods: {
    options () {
      return {
        title: 'subdistricts.operating',
        key: 'incall-options',
        table: {
          display: () => true,
          render: (h, params) => h('div', {
            style: 'display:flex;width:100%; flex-wrap:wrap;'

          }, [
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
            h('public-delete-button', {
              props: {
                request: this.request,
                info: params.row
              }
            }),
            // h(map, {
            //   props: {
            //     request: this.request,
            //     info: params.row
            //   }
            // })
          ]
          )
        }
      }
    }
  }
}
</script>

