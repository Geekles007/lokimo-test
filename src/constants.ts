const env = import.meta.env;

const MAP_BOX_TOKEN = env.VITE_MAP_BOX_TOKEN;
const DATE_FORMAT = "DD";
const DATA_API = env.VITE_DATA_API;
const DATA_LIMIT = 20;

export {
    MAP_BOX_TOKEN,
    DATE_FORMAT,
    DATA_API,
    DATA_LIMIT
}
