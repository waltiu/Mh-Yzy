import { baiduAK } from '@/_config/baiduAk'
import store from '@/store'
import { http } from '@/_command/http'

export const getLocationList = (query, location = store.getters.getCenterByBaidu.reverse().join(',')) =>
  http.get('/searchLocation/place/v2/suggestion', {
    params: {
      query: query,
      region: '中国',
      city_limit: false,
      output: 'json',
      location: location,
      ak: baiduAK
    }
  })
    .then(res => res.data)

