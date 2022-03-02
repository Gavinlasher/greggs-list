import mongoose from "mongoose";
import { AccountSchema, ProfileSchema } from "../models/Account";
import { HousesSchema } from "../models/houses";
import { JobsSchema } from "../models/Job";
import { ValueSchema } from "../models/Value";

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Account = mongoose.model("Account", AccountSchema);
  Profiles = mongoose.model("Profile", ProfileSchema, "accounts");
  Houses = mongoose.model("Houses", HousesSchema);
  Jobs = mongoose.model("jobs", JobsSchema);
}

export const dbContext = new DbContext();
