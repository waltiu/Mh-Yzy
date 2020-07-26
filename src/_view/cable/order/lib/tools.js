
/**
 * diff port, return different
 * @param {Object} newPort 
 * @param {Object} oldPort 
 * @param {Array} item [keys]
 */

export const diffPort = (newPort, oldPort, item) => {

  if (!(newPort && oldPort && item)) {
    return {}
  }

  let oldPortEntries = Object.entries(oldPort)

  let tmp = oldPortEntries
    .filter(([key, val]) => {
      let newSinglPort = newPort[key]
      if (val === newSinglPort) return false
      for (const iterator of item) {
        if (val[iterator] !== newSinglPort[iterator]) {
          return true
        }
      }

      return false
    })

  return Object.fromEntries(tmp)
}

export const parseTime = (time = '') => time ? time.split('.')[0].replace('T', ' ') : '空'