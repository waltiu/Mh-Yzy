import { http } from '@/_command/http'


export class DownloadFile {

  /**
   * 构造函数
   * @param {*} url requests url
   * @param {String} type requests type
   */
  constructor ({ url, type, data, params }) {
    type = type || 'get'
    // 初始化事件列表
    /**
     * {
     *    onProgress,
     *    onEnd
     *    onError
     * }
     */
    this.eventList = {
      onSuccess: [],
      onEnd: [],
      onError: [],
      onProgress: []
    }
    // 请求体
    let self = this
    this.request = http({
      url: url,
      method: type,
      data: data,
      params: params,
      onDownloadProgress: self._onProgress,
      responseType: 'blob',
    })
      .then(self._download)
      .then(self._onSuccess)
      .catch(self._onError)
      .finally(self._onEnd)
  }

  /**
   * 下载文件
   * @param {Object} Axios Response
   */
  _download (response) {
    const downloadFileName = response.headers['content-disposition'].split('filename=')[1]
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', decodeURIComponent(downloadFileName))
    link.click()
    window.URL.revokeObjectURL(url)
  }

  /**
   * 事件注册
   * @param {String} name 
   * @param {Function} callback 
   */
  on = (name, callback) => {
    this.eventList[name].push(callback)
    return this
  }

  _onSuccess = () => {
    this.eventList['onSuccess'].forEach(item => item())
  }

  _onProgress = (...progress) => {
    this.eventList['onProgress'].forEach(item => item(...progress))
  }

  _onEnd = () => {
    this.eventList['onEnd'].forEach(item => item())
  }

  _onError = (...err) => {
    this.eventList['onError'].forEach(item => item(...err))
  }
}