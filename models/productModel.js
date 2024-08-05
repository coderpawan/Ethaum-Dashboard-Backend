import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    category: { type: ObjectId, ref: "Category", required: [true, "Category Selection is required"] },
    vendor: {
      type: String,
      required: [true, "Vendor is required"],
    },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      default: 0
    },
    image: {
      type: String,
      required: [true, "Picture is required"],
    },
    tags: {
      type: [String],
      required: [true, "Tags are required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    marketCost: {
      type: Number,
    },
    discount: {
      type: String,
    },
    realPrice: {
      type: Number,
      required: [true, "Real Price is required"],
    },
    costType: {
      type: String,
      required: [true, "Cost Type is required"],
    },
    startingPrice: {
      type: Number,
    },
    website: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
      required: [true, "Website URL is required"],
    },
    benefits: {
      type: [String],
      required: [true, "Benefits are required"],
    },
    reviews: [reviewSchema],
    adminApproval: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
