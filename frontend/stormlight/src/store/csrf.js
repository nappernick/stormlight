import Cookies from "js-cookie"

const fetch = async (url, options = {}) => {
    if (!options.headers) options.headers = {}
    if (!options.method) options.method = 'GET'
    if (options.method !== "GET") {
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }
    const res = await window.fetch(url, options)
    const contentType = res.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) res.data = await res.json()
    if (res.status >= 400) throw (res)

    return res
}

const restoreCSRF = () => fetch('/api/csrf/restore')


export {
    fetch,
    restoreCSRF,
};
