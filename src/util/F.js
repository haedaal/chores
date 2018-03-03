module.exports = {
  pipe(f, ...fs) {
    return function() {
      return fs.reduce((pv, cf) => cf(pv), f(...arguments))
    }
  },
  map(f) {
    return function(vs) {
      return vs.map(f)
    }
  },
  uniq(arr) {
    return [...new Set(arr)]
  },
  flattenArray(nested) {
    return nested.reduce((pv, cv) => {
      return pv.concat(cv)
    }, [])
  },
  pluck(...keys) {
    return obj => {
      return keys.reverse.reduce((pv, key) => {
        return obj ? obj[key] : undefined
      }, obj)
    }
  },
}
