import mongoose from "mongoose";
import { AccountSchema, ProfileSchema } from "../models/Account";
import { HousesSchema } from "../models/houses";
import { ValueSchema } from "../models/Value";

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Account = mongoose.model("Account", AccountSchema);
  Profiles = mongoose.model("Profile", ProfileSchema, "accounts");
  Houses = mongoose.model("Houses", HousesSchema);
}

export const dbContext = new DbContext();
