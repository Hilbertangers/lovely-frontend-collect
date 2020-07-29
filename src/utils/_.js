export const _ = {
  isArray (v) {
    return Object.prototype.toString.call(v) === '[object Array]';
  },
  isObject (v) {
    return Object.prototype.toString.call(v) === '[object Object]';
  },
  jsonCopy (v) {
    return (_.isObject(v) || _.isArray(v)) ? JSON.parse(JSON.stringify(v)) : v;
  },
  objGet (source, path, defaultValue = undefined) {
    const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');
    let result = source;
    for (const p of paths) {
      result = Object(result)[p];
      if (result === undefined) {
        return defaultValue;
      }
      if (typeof result === 'function') {
        return p === paths[paths.length - 1] ? result : defaultValue;
      }
    }
    return result;
  }
}
