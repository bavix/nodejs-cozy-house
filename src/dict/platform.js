import Platform from 'platform'

/**
 * @param {String} userAgent
 * @return {Object}
 */
export default userAgent => {
  const platform = Platform.parse(userAgent)
  return {
    name: platform.name,
    version: platform.version,
    product: platform.product,
    manufacturer: platform.manufacturer,
    layout: platform.layout,
    osArch: platform.os.architecture,
    osFamily: platform.os.family,
    osVersion: platform.os.version
  }
}
