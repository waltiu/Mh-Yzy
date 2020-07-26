import { ApiLayer } from './index';
import { ldsysFiberCoreOrders } from '@/_config/order/ldsysFiberCoreOrders';

/**
 * 此 Class 不贮存状态， 由FormEventBus贮存状态， 同时也可以使用 APILayer 注入 EventBus 。
 */

export class OrderApiLayer extends ApiLayer {

  constructor (key) {
    super()
    this.configUrls = new ldsysFiberCoreOrders(key)
  }




}
