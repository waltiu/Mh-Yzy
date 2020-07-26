<template>
  <div>

    <div style="height: 80vh; overflow-y: auto; width: auto;">
      <transition-group name="el-fade-in-linear">
        <div v-for="(a,b) in $store.state.diffRoute.diffRouteList" :key="b + 'border'">

          <transition name="el-fade-in-linear" :appear="true">
            <el-card class="box-card" style="margin-top: 20px;">

              <div class="text item" @click="clear(b)" v-if="!$store.state.diffRoute.diffLoading">
                <i class="el-icon-close" style="float: right;"></i>
              </div>

              <div style="margin-top: 10px;">
                <transition-group name="el-fade-in-linear">
                  <div v-for="(c, d) in a" :key="d + 'item'" style="margin-top: 10px;">
                    {{ c.name }} <br>
                  </div>
                </transition-group>
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
      this.$store.commit('delGroup', num)
    }
  }
}
</script>
