import { Mongo } from 'meteor/mongo';

export const DeliveryOrder = new Mongo.Collection('delivery-order');

DeliveryOrder.attachSchema(new SimpleSchema({
  neighborhood: {type: String},
  address: {type: String},
  number: {type: Number},
  amount: {type: Number},
  deliveryMan: {type: [String],  defaultValue: []},
  createdAt: {type: Date}
}));

Meteor.methods({
    'createDeliveryOrder': function(neighborhood, address, number){
      check(neighborhood, String);
      check(address, String);
      check(number, Number);
      check(amount, Number);
      check(deliveryMan, String);

      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      DeliveryOrder.insert({
        neighborhood,
        address,
        number,
        amount,
        createdAt: new Date(),
      });
    },
});
