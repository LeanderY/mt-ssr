class HttpException extends Error {
  constructor (message = '服务器异常', errorCode = 10000, code = 400) {
    super()
    this.code = code
    this.message = message
    this.errorCode = errorCode
  }
}

class Success extends HttpException {
  constructor (message, errorCode) {
    super()
    // eslint-disable-next-line no-console
    console.log(message, errorCode)
    this.code = 201
    this.message = message || 'ok'
    this.errorCode = errorCode || 0
  }
}

module.exports = {
  HttpException,
  Success
}
