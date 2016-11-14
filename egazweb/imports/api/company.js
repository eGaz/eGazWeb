import { Mongo } from 'meteor/mongo';
import { Meteor} from 'meteor/meteor';
import { SimpleSchema } from  'meteor/aldeed:simple-schema';
import { DeliveryOrder } from './delivery-order.js';


export const Company = new Mongo.Collection("company");

Company.attachSchema(new SimpleSchema({
  fantasyName: {type: String},
  name: {type: String},
  cnpj: {type: Number},
  createdAt: {type: Date},
}));

Meteor.methods({
    'createCompany': function(fantasyName, name, cnpj){
      check(fantasyName, String);
      check(name, String);
      check(cnpj, String);

      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      Company.insert({
        fantasyName,
        name,
        cnpj,
        createdAt: new Date(),
      });
    },

    'removeCompany': function(currentCompany){
      check(currentCompany, String);
      Company.remove(currentCompany);
    },
});
