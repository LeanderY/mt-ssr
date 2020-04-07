export default function ({ $axios, redirect }) {
  // request interceptor
  $axios.interceptors.request.use(
    config => {
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  // response interceptor
  $axios.interceptors.response.use(
    response => {
      const res = response.data
      if (response.status === 200) {
        return res
      } else {
        return Promise.reject(res.message)
      }
    },
    error => {
      return Promise.reject(error)
    }
  )
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/404')
    } else if (code === 500) {
      redirect('/500')
    }
  })
}
