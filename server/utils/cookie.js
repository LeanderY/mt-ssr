// cookie的获取需要 window 对象
const cookieToJson = (req, name) => {
  let city
  if (req.headers.cookie) {
    const cookieArr = req.headers.cookie.split(';')
    cookieArr.forEach(cookie => {
      const arr = cookie.split('=')
      if (arr[0].trim() === name) {
        city = decodeURI(arr[1])
      }
    })
  }
  return city || '滁州'
}

export default cookieToJson
