import mongoose, { Schema, Document, Types } from "mongoose";

export type validateStatus = "pending" | "accepted" | "declined";

export interface IInterestRequest extends Document {
  _id: Types.ObjectId;
  listing: Types.ObjectId;
  seeker: Types.ObjectId;
  status: validateStatus;
  createdAt: Date;
  updatedAt: Date;
}

const interestRequestSchema = new Schema<IInterestRequest>(
  {
    listing: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    seeker: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "accepted", "declined"],
        message: "Status must be pending, accepted, or declined",
      },
      default: "pending",
    },
  },
  { timestamps: true },
);

interestRequestSchema.index({ listing: 1, seeker: 1 }, { unique: true });

export default mongoose.model<IInterestRequest>("InterestRequest",interestRequestSchema);
