import { Template } from 'meteor/templating';
import { Company } from '../../api/company.js';
import { Meteor} from 'meteor/meteor';

import '../../ui/layout/companylayout.html';

Template.insertCompanyForm.helpers({

});

if(Meteor.isClient){
  Template.insertCompanyForm.events({
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
  });
}
