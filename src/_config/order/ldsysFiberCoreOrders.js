import { OrderUrlConfig } from './index';

export class ldsysFiberCoreOrders extends OrderUrlConfig {
  constructor (key) {
    super(key)

    this.paging = `/api/ldsysFiberCoreOrders/search/findPage`
    this.search = this.paging
  }
}

export const ldsysFiberCoreOrdersConfig = new ldsysFiberCoreOrders()
