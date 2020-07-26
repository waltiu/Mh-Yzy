
import * as maptalks from 'maptalks'

export const mapLayer = () => [
  new maptalks.TileLayer(window.i18n.t('infoMap.BDMapStandard'), {
    'urlTemplate': 'http://online4.map.bdimg.com/tile/?qt=vtile&x={x}&y={y}&z={z}&styles=pl&scaler=300',
    spatialReference: {
      projection: 'baidu'
    },
    'coordinate': 'BD',
    'subdomains': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    'attribution': '&copy; Dreamcatchers'
  }),
  new maptalks.TileLayer(window.i18n.t('infoMap.BDMapSatelliteMap'), {
    'visible': false,
    'urlTemplate': 'http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46',
    'subdomains': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    spatialReference: {
      projection: 'baidu'
    },
    'coordinate': 'BD',
    'attribution': '&copy; Dreamcatchers'
  }),
  new maptalks.TileLayer('Google - 矢量地图', {
    'visible': false,
    'coordinate': 'GCJ',
    'urlTemplate': 'http://218.25.36.152:9009/arctiler/google/services/GoogleChinaMap/Google/{z}/{x}/{y}.png',
    'attribution': '&copy; <a href="http://ditu.google.cn/">Google</a>'
  }),
  new maptalks.TileLayer('Google - 卫星地图', {
    'visible': false,
    'coordinate': 'GCJ',
    'urlTemplate': 'http://218.25.36.152:9009/arctiler/google/services/GoogleChinaHybridMap/Google/{z}/{x}/{y}.png',
    'attribution': '&copy; <a href="http://ditu.google.cn/">Google</a>'
  }),
  new maptalks.TileLayer('高德 - 矢量地图', {
    'visible': false,
    'coordinate': 'GCJ',
    'urlTemplate': 'http://218.25.36.152:9009/arctiler/google/services/AMap/Google/{z}/{x}/{y}.png',
    'attribution': '&copy; <a href="http://ditu.google.cn/">Google</a>'
  }),
  new maptalks.TileLayer('高德 - 卫星地图', {
    'visible': false,
    'coordinate': 'GCJ',
    'urlTemplate': 'http://218.25.36.152:9009/arctiler/google/services/AHybridMap/Google/{z}/{x}/{y}.png',
    'attribution': '&copy; <a href="http://map.amap.cn/">AMAP</a>'
  }),
  new maptalks.TileLayer('天地图 - 卫星地图', {
    'visible': false,
    'coordinate': 'WGS',
    'urlTemplate': 'http://218.25.36.152:9009/arctiler/google/services/TiandituHybridMap3857/Google/{z}/{x}/{y}.png',
    'attribution': '&copy; <a href="http://map.amap.cn/">AMAP</a>'
  }),
  new maptalks.TileLayer('天地图 - 矢量地图', {
    'visible': false,
    'coordinate': 'WGS',
    'urlTemplate': 'http://218.25.36.152:9009/arctiler/google/services/TiandituMap3857/Google/{z}/{x}/{y}.png',
    'attribution': '&copy; <a href="http://map.amap.cn/">AMAP</a>'
  }),
]