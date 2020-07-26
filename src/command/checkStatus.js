import Vue from 'vue'
import { Notification } from 'element-ui'
import _ from 'lodash'

var reqIsOK = (context, title = (window.i18n.t('user.successOperation'))) => {
  Notification.success({
    title: title,
    message: context
  })
}

var reqIsFail = (context, title = (window.i18n.t('user.operateFailed'))) => {
  Notification.error({
    title: title,
    message: context
  })
}

var checkStatus = (request) => {
  if (!request) {
    return false
  }
  let state = false

  let name = ''

  if (_.isObject(request.config.data)) {
    name = request.config.data
  } else if (request.config.data) {
    name = JSON.parse(request.config.data).name
  }

  name = name || ''

  switch (request.config.method.toUpperCase()) {
    case 'POST':

      if (String(request.status).slice(0, 2) === '20') {
        reqIsOK(name + (window.i18n.t('user.operationComplete')))
        state = true
      } else if (String(request.status) === '409') {
        reqIsFail((window.i18n.t('user.check')))
      } else {
        reqIsFail((window.i18n.t('user.errorCode')) + request.status)
      }

      break

    case 'DELETE':
      if (String(request.status).slice(0, 2) === '20') {
        reqIsOK(name + (window.i18n.t('user.deletion')))
        state = true
      } else if (String(request.status) === '409') {
        reqIsFail((window.i18n.t('user.target')) + name + (window.i18n.t('user.content')))
      } else {
        reqIsFail((window.i18n.t('user.deleteFailed')) + request.status)
      }

      break

    case 'PATCH':

      if (String(request.status).slice(0, 2) === '20') {
        reqIsOK(name + (window.i18n.t('user.updateCompleted')))
        state = true
      } else {
        reqIsFail((window.i18n.t('user.updateFailed')) + request.status)
      }

      break
  }
  return state
}

Vue.prototype.$checkStatus = checkStatus
