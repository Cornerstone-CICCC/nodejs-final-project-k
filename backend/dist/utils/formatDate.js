"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameDate = void 0;
// TODO: timezone is something went wrong, need to fix it
const isSameDate = (date1, date2) => {
    return toDate(date1) === toDate(date2);
};
exports.isSameDate = isSameDate;
const toDate = (date) => {
    const formattedDate = date.toLocaleString("en-US", {
        timeZone: "America/Vancouver",
    });
    const index = formattedDate.indexOf(",");
    return formattedDate.substring(0, index);
};
