import { Schema } from "mongoose";

export const HousesSchema = new Schema(
  {
    bedrooms: { type: String, required: true },
    bathrooms: { type: String, required: true },
    price: { type: Number, required: true },
    sqft: { type: Number, required: true },
    description: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// ValueSchema.virtual('creator', {
//   localField: 'creatorId',
//   foreignField: '_id',
//   justOne: true,
//   ref: 'Profile'
// })
