<template>
  <div>
    <div v-for="(item, index) in column" :key="index">
      <div :style="item.style || { display: 'flex' }">
        <slot :name="`${item.key}-full`">
          {{ item.title && `${$t(item.title)} :` }}
          <div style="margin-left: 10px;">
            <slot :name="`${item.key}-header`"></slot>
            <slot :name="`${item.key}-body`">
              <public-render
                v-if="item.render"
                :renderObject="item.render"
                :value="computedData[item.key]"
                :fullData="computedData"
                :bus="bus"
                @bindData="(info) => { bindData(info, item.key) }"
              ></public-render>

              <div v-else>{{ computedData[item.key] || '空' }}</div>
            </slot>

            <slot :name="`${item.key}-tail`"></slot>
          </div>
        </slot>
      </div>

      <hr v-if="item.title" style="margin: 5px" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentShow',
  data(){
return{
    computedData:{}

}
  },
  props: {
    bus: Object,
    column: Array,
    fullData: Object
  },
  watch:{
    fullData:function(newvAL){
      this.computedData=newvAL
      if (newvAL.ldsysMachineRoom) {
     this.computedData={...this.computedData,...{ldsysMachineRoom:newvAL.ldsysMachineRoom.name},...{portUseRate:`${(newvAL.portUseRate*100).toFixed(2)}%`}}}
      else{
        this.computedData={...this.computedData,...{ldsysMachineRoom:'_'},...{portUseRate:`${(newvAL.portUseRate*100).toFixed(2)}%`}}} 
      }

   
  }
}
</script>
