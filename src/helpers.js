/**
 * @param meta
 * @param links
 */
export function makePagination(meta, links) {
    let pagination = {
        currentPage: meta.current_page,
        lastPage: meta.last_page,
        nextPageUrl: links.next,
        prevPageUrl: links.prev
    };
    return pagination;
}

/**
 * @param path
 * @returns {Promise<Response | never>}
 */
export function transportSend(path, data) {
    let domainUrl = process.env.ROOT_API;
    let requestUrl = path;
    if (!path.includes(domainUrl)) {
        requestUrl = domainUrl + path;
    }
    return fetch('/api/', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.X_API_KEY
        }
    })
        .then(res => res.json());
}