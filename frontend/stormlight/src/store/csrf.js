import Cookies from "js-cookie"

const fetch = async (url, options = {}) => {
    if (!options.headers) options.headers = {}
    if (!options.method) options.method = 'GET'

}
