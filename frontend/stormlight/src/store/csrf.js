import Cookies from 'js-cookie';

export async function fetch(url, options = {}) {
    // set options.method to 'GET' if there is no method
    options.method = options.method || 'GET';
    // set options.headers to an empty object if there is no headers
    options.headers = options.headers || {};

    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] =
            options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }
    // call the default window's fetch with the url and the options passed in
    const res = await window.fetch(url, options);
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        res.data = data;
    }

    if (res.status >= 400) throw res;

    // if the response status code is under 400, then return the response to the
    // next promise chain
    return res;
}

export function restoreCSRF() {
    return fetch('/api/csrf/restore');
}
