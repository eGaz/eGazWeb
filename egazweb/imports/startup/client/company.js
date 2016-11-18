import { Template } from 'meteor/templating';
import { Company } from '../../api/company.js';
import { Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Schemas } from 'meteor/aldeed:simple-schema'
import { Session } from 'meteor/session'

import '../../ui/layout/companylayout.html';
import '../../ui/layout/managementlayout.html';
import '../../ui/layout/employeelayout.html';
Deps.autorun(function(){
  Meteor.subscribe('companies');
  Meteor.subscribe('users');
});

if(Meteor.isClient){
  Template.Company.onCreated( function() {
  });
  Template.Employee.onCreated( function() {


  });

  Template.Company.events({
    'submit form': function(event) {
      // Prevent default browser form submit
      event.preventDefault();
      // Get value from form element
      const fantasyName = event.target.fantasyName.value;
      const name = event.target.name.value;
      const cnpj = event.target.cnpj.value;

      Meteor.call('createCompany', fantasyName, name, cnpj);
      console.log(event.type);
      event.target.fantasyName.value = "";
      event.target.name.value = "";
      event.target.cnpj.value = "";
    },
    'click .glyphicon-remove': function(event) {
      Meteor.call('removeCompany', this._id);
    }
  });
}

Template.Company.helpers({
  companies(){
    return Company.find({});
  },
});

Template.Employee.helpers({
  users(){
    var users = Meteor.users.find();
    if ( users ) {
      return users;
    }
  },
});

function userCompany(userId){
  var company = Meteor.users.findOne({"_id": userId}, { fields: {"company": 1}});
  return company.company;
};

Template.Employee.events({
  'click .glyphicon-ok': function(event) {
    var userId = Meteor.userId();
    companyId = userCompany(userId);

    Session.set('currentCompany',companyId)
    currentCompany = Session.get('currentCompany')

    Meteor.call('setUserOnCompany', this._id, this.roles.toString(), currentCompany)
  }
});
