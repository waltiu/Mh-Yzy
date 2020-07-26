<template>
  <div>
    <el-tabs value="first">
      <el-tab-pane :label="'基础信息'" name="first">
        <public-form-event
          style="width: 100%;"
          size="mini"
          label-width="100px"
          :eventBus="bus"
          :column="tableColumn"
        ></public-form-event>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { column } from "../index.js";

export default {
  name: 'ContentInfo',
  props: {
    bus: Object
  },
  computed: {
    tableColumn: function () {
      return Object.values(column)
        .filter(item => item.create && item.create.display)
        .filter(item => item.create.display())
        .map(item => {
          return {
            title: item.title,
            key: item.key,
            ...item.create
          };
        });
    }
  }
}
</script>