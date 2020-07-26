import { EventEmitter } from 'events'
import { http } from '../http';
import { RestUrlConfig } from '@/_config';

export class ApiLayer extends EventEmitter {
  constructor (key) {
    super()

    this.configUrls = new RestUrlConfig(key)

    this.searchArgs = {}
  }

  create = (...args) => {
    this.emit('CreateStart')
    return this._create(...args)
      .then(res => {
        this.emit('CreateEnd', res)
        return res
      })
  }

  update = (...args) => {
    this.emit('UpdateStart')
    return this._update(...args)
      .then(res => {
        this.emit('UpdateEnd', res)
        return res
      })
  }

  read = (...args) => {
    this.emit('ReadStart')
    return this._read(...args)
      .then(res => {
        this.emit('ReadEnd', res)
        return res
      })
  }

  delete = (...args) => {
    this.emit('DeleteStart')
    return this._delete(...args)
      .then(res => {
        this.emit('DeleteEnd', res)
        return res
      })
  }

  /**
   * Search Methods Have State
   */
  search = (args) => {
    this.searchArgs = { ...this.searchArgs, ...args }
    this.emit('SearchStart')
    return this._search(this.searchArgs)
      .then(res => {
        this.emit('SearchEnd', res)
        return res
      })
  }

  resetSearch = () => {
    this.searchArgs = {}
    return this.search({})
  }



  _create = (data) => {
    return http.post(`${this.configUrls.create}`, {
      ...data,
      ...this.configUrls.createArgs
    })
  }

  _update = (data) => {
    return http.patch(`${this.configUrls.update}`, {
      ...data,
      ...this.configUrls.updateArgs
    })
  }

  /**
   * FindOne
   */
  _read = (id, args) => {
    return http.get(`${this.configUrls.findOne}/${id}`, {
      params: args
    })
  }

  _delete = (id, args) => {
    return http.delete(`${this.configUrls.delete}/${id}`, {
      params: args
    })
  }

  /**
   * 分页/搜索
   */
  _search = (args) => {
    return http.get(`${this.configUrls.search}`, {
      params: {
        ...this.configUrls.searchArgs,
        ...args
      }
    })
  }
}