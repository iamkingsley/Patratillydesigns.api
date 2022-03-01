"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
const constants_1 = require("../constants");
function paginate(totalItems, currentPage = 1, pageSize = 10, count = 0, url = '') {
    const totalPages = Math.ceil(totalItems / pageSize);
    if (currentPage < 1) {
        currentPage = 1;
    }
    else if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    return {
        total: totalItems,
        currentPage: +currentPage,
        count,
        lastPage: totalPages,
        firstItem: startIndex,
        lastItem: endIndex,
        perPage: pageSize,
        first_page_url: `${constants_1.APP_URL}${url}&page=1`,
        last_page_url: `${constants_1.APP_URL}${url}&page=${totalPages}`,
        next_page_url: totalPages > currentPage
            ? `${constants_1.APP_URL}${url}&page=${Number(currentPage) + 1}`
            : null,
        prev_page_url: totalPages > currentPage ? `${constants_1.APP_URL}${url}&page=${currentPage}` : null,
    };
}
exports.paginate = paginate;
//# sourceMappingURL=paginate.js.map