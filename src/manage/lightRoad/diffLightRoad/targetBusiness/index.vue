<template>
  <div>

    <div style="height: 60vh; overflow-y: auto; width: auto;">
      <transition-group name="el-fade-in-linear">
        <div v-for="(a,b) in $store.state.diffLightRoad.diffLightRoadList" :key="b + 'border'">

          <transition name="el-fade-in-linear" :appear="true">
            <el-card class="box-card" style="margin-top: 20px;">

              <div class="text item" @click="clear(b)" v-if="!$store.state.diffLightRoad.diffLoading">
                <i class="el-icon-close" style="float: right;"></i>
              </div>

              <div style="margin-top: 10px;">
                <p> {{ a.name }} </p>
                <!-- <transition-group name="el-fade-in-linear">
                  <div v-for="(c, d) in a" :key="d + 'item'" style="margin-top: 10px;">
                    {{ c }} <br>
                  </div>
                </transition-group> -->
              </div>

            </el-card>
          </transition>

        </div>
      </transition-group>
    </div>

  </div>

</template>

<script>

export default {
  name: 'targetBusiness',
  computed: {
  },
  methods: {
    clear (num) {
      this.$store.commit('delDiffLightRoad', num)
    }
  }
}
</script>
