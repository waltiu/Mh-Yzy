export class RestUrlConfig {
  constructor (key) {

    this.paging = `/api/${key}/`
    this.findOne = `/api/${key}/`
    this.create = `/api/${key}/`
    this.update = `/api/${key}/`
    this.delete = `/api/${key}/`

    // same as paging
    this.search = this.paging


    this.pagingArgs = {}
    this.findOneArgs = {}
    this.createArgs = {}
    this.updateArgs = {}
    this.deleteArgs = {}

    // same as paging
    this.searchArgs = this.pagingArgs
  }
}