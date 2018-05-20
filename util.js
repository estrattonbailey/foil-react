export function pick (src, pick) {
  let keys = Object.keys(src)

  let picked = {}
  let rest = {}

  for (let i = 0; i < keys.length; i++) {
    if (pick.indexOf(keys[i]) > -1) {
      picked[keys[i]] = src[keys[i]]
    } else {
      rest[keys[i]] = src[keys[i]]
    }
  }

  return {
    picked,
    rest
  }
}
