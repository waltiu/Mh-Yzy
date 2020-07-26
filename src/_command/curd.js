import { http } from '@/_command/http'
import {
    baseCURD,
    autoCompentedUrl,
    searchMapOneUrl,
    fetchMapDataUrls
} from '@/_config/urls'
import { checkOutData } from '@/_command/tools'

import { EventEmitter } from 'events'


export class ResourceApiLayer extends EventEmitter {

    /**
     * Type 传入的type类型, 遍历字典.
     * @param {String} type 
     */
    constructor(type) {
        super()

        this.name = autoCompentedUrl[type].name

        this.mapUrlWidthCoorUrl = fetchMapDataUrls[type] ? fetchMapDataUrls[type].url : null
        this.mapUrlWidthCoorArgs = fetchMapDataUrls[type] ? fetchMapDataUrls[type].args : null

        this.mapOne = searchMapOneUrl[type].url
        this.mapOneArgs = searchMapOneUrl[type].args

        this.searchUrl = autoCompentedUrl[type].url
        this.searchArgs = autoCompentedUrl[type].args
        this.searchfilling = autoCompentedUrl[type].filling

        this.CURDArgs = baseCURD[type].args
        this.get = baseCURD[type].read || baseCURD[type].url
        this.post = baseCURD[type].create || baseCURD[type].url
        this.del = baseCURD[type].delete || baseCURD[type].url
        this.patch = baseCURD[type].update || baseCURD[type].url
    }

    /**
     * 创建资源 args 为待创建的资源
     * @param {Object} args 
     */
    create = ({ url, info }) => {
        this.emit('CreatStart')
        return http.post(`${url || this.post}`, {...this.CURDArgs, ...info })
            .finally(() => { this.emit('CreatEnd') })
    }

    /**
     * 删除一个项目 
     * @param {Object} args 为后端整个Object, 至少包含 {id: String}
     */
    delete = ({ url, args }) => {
        this.emit('DeleteStart')
        url = url || this.del
        return http.delete(`${url}/${args.id}`, args)
            .finally(() => { this.emit('DeleteEnd') })
    }

    /**
     * 后端废弃此URL, 分页使用 search
     * @param {Object} args
     */
    read({ url, args }) {
        return new Promise((resolve, reject) => {
            url = url || this.get
            http.get(url, { params: args }, {
                    params: {...this.CURDArgs, ...args }
                })
                .then(resolve)
                .catch(reject)
        })
    }

    /**
     * 查询一个id表格上的信息
     * @param {*} args 为后端整个Object
     */
    readOneTable = ({ url, args, info }) => {
        return http.get(`${url || this.get}/${info.id}`, {
            params: {...this.CURDArgs, ...args }
        })
    }

    /**
     * 查询一个id地图上的信息
     * @param {Object} args 为后端整个Object
     */
    readOneMap = ({ url, args, info } = {}) => {
        return http.get(`${url || this.mapOne}/${info.id}`, {
            params: {...this.mapOneArgs, ...args }
        })
    }


    /**
     * 更新资源
     */
    update = ({ url, info } = {}) => {
        this.emit('UpdateStart')
        return http.patch(`${url || this.patch}/${info.id}`, {
                ...info
            })
            .then((res) => this.emit('UpdateEnd', res))
    }

    /**
     * 搜索, 补全, 分页
     * 必要, 会覆盖默认args, 分页
     * args: {
     * name: String,
     * ...Any
     * }
     * 
     * filling: 存在 % 时候
     */

    search = ({ url, args, filling } = {}) => {
        this.emit('SearchStart')
        let targetUrl = url || this.searchUrl

        let targetFilling = filling || this.searchfilling || ''
        let name = `${targetFilling}${targetFilling}`

        if (args) {
            let targetName = args && args.name ? args.name : ''
            this.searchlastargs = {
                ...this.searchArgs,
                size: 10,
                page: 0,
                ...args
            }
            name = `${targetFilling}${targetName}${targetFilling}`
        }

        return http.get(targetUrl, {
                params: {
                    ...this.searchlastargs,
                    name: name
                }
            })
            .then(res => {
                this.emit('SearchEnd', res, args)
                return res
            })
    }

    fecthDataInMap = (args = {}, headers = {}) => {

        this.emit('fecthDataInMapStart')

        return http.get(this.mapUrlWidthCoorUrl, {
                headers: headers,
                params: args
            })
            .then(res => {
                this.emit('fecthDataInMapEnd', res)
                return res
            })
    }


}

export const getGroupAuthListById = (id) =>
    http.get(`/api/sysRoles/${id}/sysAuthList`)
    .then(checkOutData)

export const getGroupList = () =>
    http.get(`/api/sysRoles/`)
    .then(checkOutData)