import { OrderApiLayer } from '@/_command/api/order';
import { http } from '@/_command/http';

export class CableOrder extends OrderApiLayer {
  constructor () {
    super('ldsysFiberCoreOrders')

  }

  changeOrderStatus = (...args) => {
    this.emit('StartChangeOrderStatus')

    return this._changeOrderStatus(...args)
      .then(res => {
        this.emit('EndChangeOrderStatus', res)
        return res
      })
  }

  createJumpFiber = (...args) => {
    this.emit('StartCreateJumpFiber')

    return this._createJumpFiber(...args)
      .then(res => {
        this.emit('EndCreateJumpFiber', res)
        return res
      })
  }

  createFormedJumpFiber = (...args) => {
    this.emit('StartFormedJumpFiber')

    return this._createFormedJumpFiber(...args)
      .then(res => {
        this.emit('EndFormedJumpFiber', res)
        return res
      })
  }


  checkLocation = (...args) => {
    this.emit('StartCheckLocation')
    return this._checkLocation(...args)
      .then(res => {
        this.emit('EndCheckLocation')
        return res
      })
  }

  deleteJumpFiber = (...args) => {
    this.emit('StartDeleteJumpFiber')
    return this._deleteJumpFiber(...args)
      .then(res => {
        this.emit('EndDeleteJumpFiber')
        return res
      })
  }

  changeFormedJumpFiber = (...args) => {
    this.emit('StartChangeFormedJumpFiber')
    return this._changeFormedJumpFiber(...args)
      .then(res => {
        this.emit('EndChangeFormedJumpFiber', res)
        return res
      })
  }

  /**
   * TODO
   * 工单-成端跳纤修改（资源）
   */
  _changeFormedJumpFiber = (data) => {
    return http.patch(`api/ldsysFiberCoreOrders/jumpFiber/formedJumpFiber/${data.id}`)
  }

  /**
   * 工单-跳纤-删除
   */
  _deleteJumpFiber = (id) => {
    return http.delete(`/ldsysFiberCoreOrders/jumpFiber/${id}`)
  }

  /**
   * FullData
   */
  _checkLocation = ({ lng, lat, id }) => {
    return http.post(`/api/ldsysFiberCoreOrders/checkLocation`, {
      lng: lng,
      lat: lat,
      id: id
    })
  }

  /**
   * 工单-创建成端跳纤（资源提交）
   * TODO
   */
  _createFormedJumpFiber = (data) => {
    return http.post(`/api/ldsysFiberCoreOrders/jumpFiber/${data.id}/formedJumpFiber`)
  }

  /**
   * 工单-创建跳纤
   * TODO
   */
  _createJumpFiber = (data) => {
    return http.post(`/api/ldsysFiberCoreOrders/${data.id}/jumpFiber`)
  }

  _changeOrderStatus = (id, action) => {
    return http.post(`/api/ldsysFiberCoreOrders/${id}/orderStateConvert`, `action=${action}`)
  }



}