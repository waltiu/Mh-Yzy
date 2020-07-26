import { CableOrder } from './cableorder';

export class TableBus extends CableOrder {
  constructor () {
    super()

    this.tableData = []

  }

  setTableData = (args) => {
    this.tableData = args
    this.emit('TableChange', args)
  }
}