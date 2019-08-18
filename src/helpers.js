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