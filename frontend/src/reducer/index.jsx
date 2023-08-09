import { combineReducers } from "redux";

import notebox from "./notebox";
import sidetab from "./sidetab";
import auth from "./auth";

export default combineReducers({ notebox, sidetab, auth });
