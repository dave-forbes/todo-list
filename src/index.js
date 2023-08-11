import dateFormat, { masks } from "dateformat";
const now = new Date();
const span = document.querySelector('#date');

span.textContent = dateFormat(now, "dddd mmmm dS");