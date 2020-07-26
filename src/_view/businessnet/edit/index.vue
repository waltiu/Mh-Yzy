<template>
  <div>
    <el-button
      class="table-inside-button"
      size="mini"
      type="primary"
      @click="edit = { ...info }"
    >{{ $t("subdistricts.edit") }}</el-button>

    <public-alert-page
      :info="edit"
      :title="$t('opticalSplitter.editInformation')"
      :width="'90vw'"
      :top="'5vh'"
    >
      <edit-content :request="request" :info="info" @returnChangeData="changeInfo "></edit-content>

      <template v-slot:footer="{ methods: { close } }">
        <el-button
          :loading="patching"
          :disabled="!fullData.id"
          type="primary"
          @click="submit(close)"
        >{{ $t("subdistricts.submit") }}</el-button>
        <el-button @click="close()">{{ $t("subdistricts.cancel") }}</el-button>
      </template>
    </public-alert-page>
  </div>
</template>

<script>
import EditContent from "./content";

export default {
  name: "EditInfo",
  props: {
    info: Object,
    request: Object
  },
  components: {
    EditContent
  },
  data () {
    return {
      edit: {},
      fullData: {},
      patching: false
    };
  },
  methods: {
    submit (close) {
      if (this.fullData.ldsysOpticaleCableWorks && this.fullData.numberOfAnnular >= this.fullData.ldsysOpticaleCableWorks.length) {
        let a = [];
        this.fullData.ldsysOpticaleCableWorks.map(item =>
          a.push({ id: item.id })
        );
        this.fullData.ldsysOpticaleCableWorks = a;
        this.patching = true;
        this.request
          .update({ info: this.fullData })
          .then(() => {
            this.$notify({
              title: "更新成功",
              message: this.fullData.name,
              type: "success"
            });
          })
          .finally(() => {
            this.patching = false;
            this.fullData = {};
            close();
          });
      } else {

        this.$store.commit('setSysStatus', {
          info: {
            msg: '业务数组的数量不小于业务数量，请重新填写！',
            code: '500',
            time: new Date(),
            msgEn: '业务数组的数量不小于业务数量，请重新填写！'
          },
          key: 'httpErr',
        })
      }

    },
    changeInfo (info) {
      this.fullData = { ...this.fullData, ...info }
    }
  },
  watch: {
    info: function (newVal) {
      this.fullData = newVal
    }
  }
};
</script>
