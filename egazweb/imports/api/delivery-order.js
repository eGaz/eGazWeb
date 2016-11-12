import { Mongo } from 'meteor/mongo';

export const DeliveryOrder = new Mongo.Collection('delivery-order');

DeliveryOrder.attachSchema(new SimpleSchema({
  neighborhood: {type: String},
  address: {type: String},
  number: {type: Number},
  deliveryMan: {type: [String],  defaultValue: []},
}));

Meteor.methods({
    'createDeliveryOrder': function(neighborhood, address, number){
      check(neighborhood, String);
      check(address, String);
      check(number, Number);

      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      DeliveryOrder.insert({
        neighborhood,
        address,
        number,
        createdAt: new Date(),
      });
    },
});
