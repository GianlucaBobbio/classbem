class ClassName extends String {
  constructor(name = '') {
    super(name)
  }

  e(...args) {
    let names = [this]
    const argsArray = Array.prototype.slice.call(args)
    names = names.concat(argsArray)
    return new ClassName(names.join('__'))
  }

  m(...args) {
    const name = this
    const argsArray = Array.prototype.slice.call(args)
    const nameModifiers = []
    argsArray.forEach((modifier) => {
      if (typeof modifier === 'string') {
        nameModifiers.push(`${name}--${modifier}`)
      } else if (Array.isArray(modifier)) {
        if (modifier[1]) {
          nameModifiers.push(`${name}--${modifier[0]}`)
        }
      }
    })
    return new ClassName(`${name} ${nameModifiers.join(' ')}`)
  }
}

module.exports = {
  ClassName,
}
