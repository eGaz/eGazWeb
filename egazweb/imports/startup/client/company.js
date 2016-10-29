import { Template } from 'meteor/templating';

Template.companylayout.helpers({

});

Template.companylayout.events({
  'submit .new-company'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;

    const fantasyname = target.fantasyname.value;
    const name = target.name.value;
    const cnpj = target.cnpj.value;

    Meteor.Call('company.insert', fantasyname, name, cnpj);
    console.log(event);
    
  },
});
