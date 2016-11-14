import { Mongo } from "meteor/mongo";

export const DeliveryOrder = new Mongo.Collection("deliveryorder");

DeliveryOrder.attachSchema(new SimpleSchema({
      type: {type: String, optional: true},
      neighborhood: {type: String},
      address: {type: String},
      number: {type: String},
      amount: {type: Number, optional: true},
      price: {type: Number, optional: true},
      companyId: {type: String},
      deliveryMan: {type: String, optional: true},
      status: {type: String, defaultValue: 'Aberto', allowedValues: ['Aberto', 'Entregue']},
      createdAt: {type: Date}
    },
));

Meteor.methods({
    'createDeliveryOrder': function(neighborhood, address, number, companyId){
      check(neighborhood, String);
      check(address, String);
      check(number, String);
      check(companyId, String);

      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      DeliveryOrder.insert({
        neighborhood,
        address,
        number,
        companyId,
        createdAt: new Date(),
      });
    },
});
