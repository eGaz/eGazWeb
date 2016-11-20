import { Mongo } from 'meteor/mongo';
import { Meteor} from 'meteor/meteor';
import { SimpleSchema } from  'meteor/aldeed:simple-schema';
import { DeliveryOrder } from './delivery-order.js';
import { Accounts } from 'meteor/accounts-base';


export const Company = new Mongo.Collection("company");

Employees = new SimpleSchema({
  userId: {type: String, optional: true},
  role: {type: String, optional: true},
});

Prices = new SimpleSchema({
  priceDescription: {type: String},
  price: {type: Number}
});

Product = new SimpleSchema({
  _id: {type: String},
  alias: {type: String},
  description: {type: String},
  stock: {type: Number, optional: true},
  prices: {type: [Prices], optional: true}
});

Company.attachSchema(new SimpleSchema({
  fantasyName: {type: String},
  name: {type: String},
  cnpj: {type: Number},
  createdAt: {type: Date},
  employees: {type: [Employees], optional: true},
  products: {type: [Product], optional: true}
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

    'setUserOnCompany': function(userId, roles,companyId){
        check(userId, String)
        check(roles, String)
        check(companyId, String)

        Company.update(companyId, {$addToSet: {["employees"]: {"userId": userId, "role": roles }}});
        Meteor.users.update(userId, {$set: {"company": companyId}});
    },

    'createProduct': function(companyId, alias, description, stock, priceDescription, price){
      check(companyId, String)
      check(alias, String)
      check(description, String)
      check(stock, Number)
      check(priceDescription, String)
      check(price, Number)

      Company.update(companyId, {$addToSet: {["products"]:
          {"_id": Random.id(),
            "alias": alias,
            "description": description,
            "stock": stock,
            prices: [
              {
              "priceDescription": priceDescription,
              "price": price
              }
            ]
           }}}
      );
      },

    'removeProduct': function(companyId, productId){
        check(companyId, String)
        check(productId, String)
        Company.update({}, {$pull: {products:{ _id: productId}}}, { multi: true });
    },

    'createPrice': function(companyId, productId, priceDescription, price){
      check(companyId, String)
      check(productId, String)
      check(priceDescription, String)
      check(price, Number)

        Company.update(companyId, {$addToset: {["products"]: productId,
          prices:[
            {
              "priceDescription": priceDescription,
              "price": price
            }
          ]
          }
        }
      )
    }
});
