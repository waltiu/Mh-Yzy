<!--suppress ALL -->
<template>
  <div>
    <el-card class="box-card" style="padding:  0px; margin-top: 10px;margin-left: 15px">
      <!-- <div
        style="display: flex; flex-direction: row; justify-content: space-between;height: 30px;align-items: center"
      >
        <div style="display: flex;flex-direction: row;align-items: center">
          <el-switch
            class="switch-dataManager"
            v-model="isOutlineData"
            active-color="#ff4949"
            inactive-color="#13ce66"
            :active-text="$t('dataManagerCard.offline')"
            :inactive-text="$t('dataManagerCard.online')"
          ></el-switch>
          <span style="size: 4px; color: #6d7380;margin-left: 3px">Beta</span>
        </div>
        <div v-if="!isLoading" style="display: flex;flex-direction: row;align-items: center">
          <span style="padding: 5px;">{{$t('dataManagerCard.refreshData')}}</span>
          <el-button type="primary" size="mini" icon="el-icon-refresh" circle @click="update()"></el-button>
        </div>
        <div v-if="isLoading" style="display: flex;flex-direction: row;align-items: center">
          <span style="padding: 5px;">{{$t('dataManagerCard.updating')}}</span>
          <Lottie :options="defaultOptions" :height="46" :width="60"/>
        </div>
      </div>-->
      <!-- <div
        style="display: flex; flex-direction: row; justify-content: space-between;height: 30px;align-items: center;border-top: #dcdfe6 solid 1px;margin-top: 8px;padding-top: 12px"
      >-->
      <div
        style="display: flex; flex-direction: row; justify-content: space-between;height: 30px;align-items: center;"
      >
        <div>
          <img src="/icons/drag.png" style="width: 20px; height: 20px;" />
          <span
            style="size: 4px; color: #222222;margin-left: 3px"
          >{{$t('dataManagerCard.changePosition')}}</span>
        </div>

        <div style="display: flex;flex-direction: row;align-items: center">
          <el-switch
            class="switch-dataManager"
            v-model="draggable"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-text="$t('dataManagerCard.open')"
            :inactive-text="$t('dataManagerCard.close')"
          ></el-switch>
          <span style="size: 4px; color: #6d7380;margin-left: 3px"></span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>

// import Lottie from '../../../lottie'
// import * as animationData from '@/assets/location.json'
import Dexie from 'dexie'

export default {
  name: 'dataManagerCard',
  // components: { Lottie },
  data () {
    return {
      draggable: false,
      isOutlineData: false,
      isLoading: false,
      // defaultOptions: { animationData: animationData },
      animationSpeed: 1
    }
  },
  methods: {
    update () {
      Dexie.exists('lms_mapdb').then((exitst) => {
        if (exitst) {
          this.isLoading = true
          Dexie.delete('lms_mapdb').then(() => {
            this.initDb()
          })
        }
      })
    },
    initDb () {
      let typs = Object.keys(this.$searchMapUrl)
      let gets = []
      let store = this.$store
      for (let type of typs) {
        gets.push(
          this.$http.get(this.$searchMapUrl[type].url, {
            params: {
              lng: 0, lat: 0, zoom: 1, ...this.$searchMapUrl[type].args
            }
          })
        )
      }
      // 并发获取全部资源
      let that = this
      const axios = this.$http
      this.isLoading = true
      axios.all(gets).then((results) => {
        let db = new Dexie('lms_mapdb')
        let table = {}
        for (let i = 0; i < typs.length; i++) {
          let type = typs[i]
          table[type] = '++id,data'
        }
        db.version(1).stores(table)
        for (let i = 0; i < typs.length; i++) {
          let type = typs[i]
          db.transaction('rw', type, async () => {
            await db[type].add({ data: results[i].data })
          })
        }
        store.commit('resetIsOutLineLoadedData', null)

        that.isLoading = false
      })
    }
  },
  watch: {
    isOutlineData (val) {
      // todo 去switch抖动
      // 离线数据
      if (val) {
        Dexie.exists('lms_mapdb').then((exitst) => {
          if (!exitst) {
            // 不存在此数据库、初次加载
            this.initDb()
          }
          this.$store.commit('setIsOutLineModel', true)
        })
        // 在线数据
      } else {
        this.$store.commit('setIsOutLineModel', false)
        this.$store.commit('resetIsOutLineLoadedData', null)
      }
    },
    draggable (val) {
      this.$store.commit('setDraggable', val)
    }
  }
}
</script>
<style>
</style>
