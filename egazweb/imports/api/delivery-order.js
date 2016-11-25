import { Mongo } from "meteor/mongo";

export const DeliveryOrder = new Mongo.Collection("deliveryorder");

DeliveryOrder.attachSchema(new SimpleSchema({
      type: {type: String, optional: true},
      neighborhood: {type: String},
      address: {type: String},
      number: {type: String},
      amount: {type: Number, optional: true},
      item: {type: String, optional: true},
      price: {type: Number, optional: true, decimal: true},
      companyId: {type: String},
      deliveryMan: {type: String, optional: true},
      status: {type: String, defaultValue: 'Aberto', allowedValues: ['Aberto', 'Entregue']},
      createdAt: {type: Date}
    },
));

Meteor.methods({
    'createDeliveryOrder': function(neighborhood, address, number, companyId, type, amount){
      check(neighborhood, String);
      check(address, String);
      check(number, String);
      check(companyId, String);
      check(type, String);
      check(amount, Number);

      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      DeliveryOrder.insert({
        neighborhood,
        address,
        number,
        companyId,
        type,
        amount,
        createdAt: new Date(),
      });
    },
    'changeOrderAmount': function(order, amount){
        check(order, String);
        check(amount, String);

        DeliveryOrder.update({_id:order}, {$set:{
            amount: amount
        }});
        },
        'updateDeliveryMan': function(order, deliveryMan){
        check(deliveryMan, String);
        check(order, String);

        DeliveryOrder.update({_id: order}, {$set:{
            deliveryMan: deliveryMan
        }});
        },

      'updateItem': function(order, item){
        check(order, String);
        check(item, String);

        DeliveryOrder.update({_id:order}, {$set: {
          item: item
        }});
      },
      'updatePrice': function(order, price){
        check(order, String);
        check(price, Number);

        DeliveryOrder.update({_id:order}, {$set: {
          price: price
        }});
      }
});
