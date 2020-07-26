<template>
  <div>
    <el-button
      class="table-inside-button"
      v-if="editMap"
      size="mini"
      type="primary"
      @click="edit = { ...info }"
    >{{$t('subdistricts.edit')}}</el-button>

    <public-alert-page
      :info="edit"
      :title="$t('subdistricts.Community_resource_editing')"
      :width="'90vw'"
      :top="'5vh'"
    >
      <edit-content :eventBus="eventBus" :request="request"></edit-content>

      <template v-slot:footer="{methods: {close}}">
        <el-button
          :loading="createing"
          type="primary"
          @click="submit(close)"
        >{{$t('subdistricts.submit')}}</el-button>
        <el-button @click="close()">{{$t('subdistricts.cancel')}}</el-button>
      </template>
    </public-alert-page>
  </div>
</template>

<script>
import EditContent from "./content";
import { FormEventBus } from '@/_command/event'

export default {
  name: "EditInfo",
  props: {
    request: Object,
    info: Object,
    editMap: {
      default: true,
      type: Boolean
    },
    editTf: {
      default: false,
      type: Boolean
    }
  },
  components: {
    EditContent
  },
  data () {
    return {
      edit: {},
      createing: false
    };
  },
  computed: {
    eventBus: function () {
      return new FormEventBus(this.edit)
    }
  },
  watch: {
    info: {
      handler: function (newVal) {
        if (this.editTf) {
          this.edit = { ...newVal }
        }
      },
      immediate: true,
      deep: true
    },

  },
  methods: {
    submit (close) {

      this.createing = true;
      this.request
        .update({ info: this.eventBus.submit() })
        .then(() => {
          this.$notify({
            title: "成功",
            message: `更新成功 ${this.eventBus.fullData.name}`,
            type: "success"
          });
          if (this.editTf) {
            this.$store.commit('mapEditInfoUpdate', { ...this.eventBus.fullData, ...{ mapType: 'subdistricts' } })
          }
          close();
        })
        .finally(() => {
          this.createing = false;
          this.fullData = {};
          this.edit = {}
        });
    }
  }
};
</script>
