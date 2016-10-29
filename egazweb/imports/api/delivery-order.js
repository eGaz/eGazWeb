import { Mongo } from 'meteor/mongo';

export const DeliveryOrder = new Mongo.Collection('delivery-order');

DeliveryOrder.schema = new SimpleSchema({
    neighborhood: {type: String},
    adress: {type: String},
    number: {type: Number}
});
