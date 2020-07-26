import { EventBus } from '@/_library/events';


export class ComplexBus extends EventBus {
  constructor ({ formData, pagination }) {
    super()

    this.formData = formData
    this.pagination = pagination

    this.form = new EventBus(this.formData)
    this.pagination = new EventBus(this.pagination)
  }

  formSetState = (...args) => {
    return this.form.setState(...args)
  }

  pageSetState = (...args) => {
    return this.pageSetState.setState(...args)
  }

}