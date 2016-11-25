import { Template } from 'meteor/templating';
import { Company } from '../../api/company.js';
import { Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Schemas } from 'meteor/aldeed:simple-schema'
import { Session } from 'meteor/session'

import '../../ui/layout/companylayout.html';
import '../../ui/layout/managementlayout.html';
import '../../ui/layout/employeelayout.html';
import '../../ui/layout/productlayout.html'

Deps.autorun(function(){
  Meteor.subscribe('companies');
  Meteor.subscribe('users');
});

//Function to initialize retrieve companyId of the user (used to initialize CompanySession)
function userCompany(userId){
  var company = Meteor.users.findOne({"_id": userId}, { fields: {"company": 1}});
  return company.company;
};

function productCompany(companyId){
  var company = Company.findOne({"_id": companyId});
  return company;
};

//Oncreated functions to templates that work on company collection
Template.Company.onCreated( function() {
  });
Template.Employee.onCreated( function() {
  });
Template.Product.onCreated( function() {
  });

//Events functions to template Company
Template.Company.events({
    'submit form': function(event) {
      // Prevent default browser form submit
      event.preventDefault();
      // Get value from form element
      const fantasyName = event.target.fantasyName.value;
      const name = event.target.name.value;
      const cnpj = event.target.cnpj.value;

      Meteor.call('createCompany', fantasyName, name, cnpj);

      event.target.fantasyName.value = "";
      event.target.name.value = "";
      event.target.cnpj.value = "";
    },

    'click .glyphicon-remove': function(event) {
      Meteor.call('removeCompany', this._id);
    },
});

//Events functions to template Employee
Template.Employee.events({
  'click .glyphicon-ok': function(event) {
    var userId = Meteor.userId();
    companyId = userCompany(userId);

    Session.set('currentCompany',companyId)
    currentCompany = Session.get('currentCompany')

    Meteor.call('setUserOnCompany', this._id, this.roles.toString(), currentCompany)
  }
});

Template.Product.events({
  'submit form': function(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var userId = Meteor.userId();
    companyId = userCompany(userId);

    Session.set('currentCompany',companyId)
    currentCompany = Session.get('currentCompany')

    // Get value from form element
    const alias = event.target.alias.value;
    const description = event.target.description.value;
    const stock = event.target.stock.value;
    const priceDescription = event.target.priceDescription.value;
    const price = event.target.price.value;

    Meteor.call('createProduct', currentCompany, alias, description, Number(stock), priceDescription, Number(price));
    FlashMessages.sendSuccess('Produto adicionado');
    event.target.alias.value = "";
    event.target.description.value = "";
    event.target.stock.value = "";
    event.target.priceDescription.value = "";
    event.target.price.value = "";
  },
  'click .glyphicon-remove': function(event) {
    Meteor.call('removeProduct', currentCompany, this._id);
  },

  'click .glyphicon-zoom-in': function(event){
    return Session.set('productId', this._id);
  },

  'click [name="new-price"]':function(event, template)
  {
    event.preventDefault();
    productId = Session.get('productId');
    var userId = Meteor.userId();
    companyId = userCompany(userId);

    Session.set('currentCompany',companyId)
    currentCompany = Session.get('currentCompany')

    const priceDescription = $('input[name="ModalPriceDescription"]').val();
    const price = $('input[name="ModalPrice"]').val();

    Meteor.call('createPrice', currentCompany, productId, priceDescription, Number(price));
  }

});

//Helper function to template company
Template.Company.helpers({
  companies(){
    return Company.find({});
  },
});

//Helper function to template Product
Template.Product.helpers({
  companies(){
    var userId = Meteor.userId();
    companyId = userCompany(userId);

    Session.set('currentCompany',companyId)
    currentCompany = Session.get('currentCompany')

    company = productCompany(currentCompany);
    return company ;
  },
});

//Helper functions to template Employee
Template.Employee.helpers({
  users(){
    var users = Meteor.users.find();
    if ( users ) {
      return users;
    }
  },
});
