import mongoose, { Schema, Document, Types } from "mongoose";

export interface IListing extends Document {
  _id: Types.ObjectId;
  location: string;
  price: number;
  roomsAvailable: number;
  description: string;
  owner: Types.ObjectId;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const listingSchema = new Schema<IListing>(
  {
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0.01, "Price must be a positive number"],
    },
    roomsAvailable: {
      type: Number,
      required: [true, "Rooms available is required"],
      min: [0, "Rooms available cannot be negative"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 2000,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

listingSchema.index({ location: 1 });
listingSchema.index({ price: 1 });
listingSchema.index({ isAvailable: 1 });

export default mongoose.model<IListing>("Listing", listingSchema);