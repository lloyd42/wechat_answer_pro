export const request = (params) => {
    //const baseUrl = 'https://www.wanandroid.com'
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            //url: baseUrl + params.url,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}