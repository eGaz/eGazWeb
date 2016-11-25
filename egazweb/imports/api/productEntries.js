import { Mongo } from "meteor/mongo";

export const ProductEntries = new Mongo.Collection("productentries");

ProductEntries.attachSchema(new SimpleSchema({
  quantity: {type: Number},
  buyPrice: {type: Number},
  provider: {type: String},
  productId: {type: String},
  aquisitionDate: {type: Date},
}));
