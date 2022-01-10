import { WHITE_LIST_DOMAINS } from "*/utils/constants";

export const corsOptions = {
  origin: function (origin, callback) {
    if (WHITE_LIST_DOMAINS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
