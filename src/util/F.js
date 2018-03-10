module.exports = {
  pipe(f, ...fs) {
    return function() {
      return fs.reduce((pv, cf) => cf(pv), f(...arguments))
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
}
