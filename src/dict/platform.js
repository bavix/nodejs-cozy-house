import Platform from 'platform'

/**
 * @param {Object} meta
 * @return {Object}
 */
export default meta => {
  const platform = Platform.parse(meta.userAgent)
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
