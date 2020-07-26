import { mapHttp } from '@/_command/http'

export const setHttpStatus = (key, val) => {
  mapHttp.defaults.headers.common[key] = val
}