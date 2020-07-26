import { fileUploadAndDownload } from '@/_config/urls'


export class fileOperating {

  /**
   * Type 传入的type类型, 遍历字典.
   * @param {String} type 
   */
  constructor (type) {
    this.typeSet = fileUploadAndDownload[type]

    this.downloadUrl = this.typeSet['download'].url
    this.downloadArgs = this.typeSet['download'].args

    this.uploadUrl = this.typeSet['upload'].url
    this.uploadArgs = this.typeSet['upload'].args
  }

  download (response) {
    const downloadFileName = response.headers['content-disposition'].split('filename=')[1]
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', decodeURIComponent(downloadFileName))
    link.click()
    window.URL.revokeObjectURL(url)
  }
}
