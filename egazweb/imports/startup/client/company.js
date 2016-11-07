import { Template } from 'meteor/templating';
import { Company } from '../../api/company.js';
import { Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Schemas } from 'meteor/aldeed:simple-schema'

import '../../ui/layout/companylayout.html';
import '../../ui/layout/managementlayout.html';

Meteor.subscribe('companies');

if(Meteor.isClient){
  Template.Company.onCreated( function() {
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
      
    }
  });
}

Template.Company.helpers({
  companies(){
    return Company.find({});
  }
});
