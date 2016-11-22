import { Template } from 'meteor/templating';
import { DeliveryOrder } from '../../api/delivery-order.js';
import { Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Schemas } from 'meteor/aldeed:simple-schema';
import '../../ui/layout/delivery-orderlayout.html';

import { Users } from 'meteor/accounts-base';

Deps.autorun(function(){
  Meteor.subscribe('deliveryorders');
  Meteor.subscribe('orderincompany');
  Meteor.subscribe('users');
});


if(Meteor.isClient){
  Template.Deliveryorder.onCreated( function() {

});

  Template.Deliveryorder.events({
    'submit [name="newOrder"]': function(event) {
      // Prevent default browser form submit
      event.preventDefault();
      // Get value from form element
      const neighborhood = event.target.neighborhood.value;
      const address = event.target.address.value;
      const number = event.target.number.value;

      companyIdFromUser =  Meteor.user().company
      console.log(companyIdFromUser)
      Session.set('currentCompany',companyIdFromUser)

      companyId = Session.get('currentCompany');

      const type = "callcenter";
      const amount = 1;
      var companyId = Session.get('currentCompany');

      Meteor.call('createDeliveryOrder', neighborhood, address, number, companyId, type, amount);
      console.log(event.type);
      event.target.neighborhood.value = "";
      event.target.address.value = "";
      event.target.number.value = "";
  },
  'submit [name="changeOrderAmount"]': function(event){
      event.preventDefault();

      const amount = event.target.amount.value;
      const order = this._id;
      Meteor.call("changeOrderAmount", order, amount);
  },
  });
}

/** Function to return the deliveryMans in a company **/
function getDeliveryMen(company){
    check(company, String);
    var deliveryMen = Meteor.users.find(
        {"company": company},
        {fields:
            {"emails": 1}
        }
    ).fetch();
    return deliveryMen;
}

/** Get the emails arrays from the DeliveryMen List
*** params: List of DeliveryMen
*** returns: a Array of Emails **/
function parserDeliveryMenEmails(deliveryMenList){
    var emailsJson = JSON.parse(JSON.stringify(deliveryMenList, {indent: true}));
    var emailsVector = [];
    for (var email in deliveryMenList) {
        emailsVector.push(deliveryMenList[email].emails)
    }
    return emailsVector;
}


/** Get the emails addresses from the emails List
*** params: Json Object of Emails
*** returns: a Array of Emails **/
function parserAddressFromEmails(emailsJson){
    var addressVector = [];
    for (var address in emailsJson) {
        addressVector.push(emailsJson[address][0].address);
    }
    return addressVector;
}

Template.Deliveryorder.helpers({
  deliveryorders(){
    return DeliveryOrder.find({});
  },
  deliveryManList: function(){
      const user = Meteor.user();

      var deliveryMen = getDeliveryMen(user.company);
      var emailsList = parserDeliveryMenEmails(deliveryMen);
      var addressList = parserAddressFromEmails(emailsList);

      /** Let this logs here intentionaly, to understand how this parser works
      console.log(deliveryMen);
      console.log(emailsJson[0][0].address);
      console.log(addressList);
      **/

      return addressList;

  },
});

/** Custom Helpers **/

/** Compares two arguments **/
Template.registerHelper("equals", function(a,b){
    return a === b;
});

Template.registerHelper("formatDate", function(date){
    return moment(date).format('HH:mm:ss DD/MM');
});
