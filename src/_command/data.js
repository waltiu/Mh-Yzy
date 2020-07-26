import _ from 'lodash'

/**
 * 提取gmt审计元素
 * @param {Object} data
 */
export const gmtPick = (data) => {
  return {
    ...data,
    gmt:_.pick(data,['gmtCreate','gmtCreator','gmtModified','gmtModifier'])
  }

}
