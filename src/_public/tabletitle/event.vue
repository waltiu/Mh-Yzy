<template>
  <div>
    <el-card style="width: 100%;">
      <public-form
        :column="tableColumn"
        size="mini"
        label-width="80px"
        @allData="bindData"
        formstyle="display: flex;"
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
                @click="() => {resetForm(); bus.resetSearch()}"
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
    bus: Object,
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
  methods: {
    bindData (args) {
      this.tmpSearchArgs = args
    },
    search (args = this.tmpSearchArgs) {
      this.bus.search(args);
    }
  }
};
</script>
