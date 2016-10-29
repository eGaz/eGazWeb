import { Mongo } from 'meteor/mongo';
import { Meteor} from 'meteor/meteor';

export const Company = new Mongo.Collection('company');

CompanySchema = new SimpleSchema({
  fantasyName: {type: String},
  name: {type: String},
  cnpj: {type: Number},
});

Company.attachSchema(CompanySchema);

Meteor.methods({
  'company.insert'(fantasyName, name, Cnpj){
    check(fantasyName, String);
    check(name, String);
    check(cnpj, String);
    Company.insert({
      fantasyName,
      name,
      cnpj,
      createdAt: new Date(),
    });
  }
});
