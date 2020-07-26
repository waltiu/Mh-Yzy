<template>
  <div>
    <base-info-edit
      :type="type"
      :tableData="tableData"
      :editTf="editTf"
      :tabs="[{ name: $t('fence.editFence'), key: 'editOnMap' }]"
      @updated="$emit('updated')"
      @close="$emit('close')"
    >
      <div slot="editOnMap" slot-scope="slotInfo">
        <edit-on-map
          :fullData="slotInfo.fullData"
          @returnData="(info) => {slotInfo.fullData.geofence = {info: info}}"
        ></edit-on-map>
      </div>
    </base-info-edit>
  </div>
</template>

<script>
import editOnMap from './editOnMap'

export default {
  name: 'geoFencesEditAndAdd',
  props: {
    type: String,
    tableData: Object,
    editTf: Boolean

  },
  components: {
    editOnMap
  },
  computed: {
  }
}
</script>
