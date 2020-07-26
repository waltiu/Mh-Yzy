/**
 * auth('aaa')
 * 是否有权限 aaa
 * 
 * return  true || false
 */
export const auth = (y) => y ? JSON.parse(sessionStorage.other).sysAuthList.map(x => x.code).includes(y) : false