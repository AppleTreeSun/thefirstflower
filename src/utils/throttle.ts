export default function throttle(fn: any, interval: number) {
  let lastTime = 0
  function _throttle() {
    const nowTime = Date.now()
    const remainTime = interval - (nowTime - lastTime)
    if (remainTime <= 0) {
      fn()
      lastTime = nowTime
    }
  }

  return _throttle
}
