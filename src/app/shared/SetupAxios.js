export default function setupAxios(axios) {
    axios.interceptors.request.use(
      (config) => {
        const accessToken = sessionStorage.getItem('access_token')
  
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
  
        return config
      },
      (err) => Promise.reject(err)
    )
  }
  