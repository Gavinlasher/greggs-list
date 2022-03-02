import { Schema } from "mongoose";

export const JobsSchema = new Schema(
  {
    salary: { type: Number, required: true },
    hours: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
