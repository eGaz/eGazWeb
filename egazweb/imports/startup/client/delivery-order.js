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
    var emailsList = Meteor.users.find(
        {"company": company},
        {fields:
            {"emails.address": 1}
        }
    );
    return emailsList;
}

function parserDeliveryMen(deliveryMenList){
    var manVector = [];
    for (var deliveryMen in deliveryMenList) {
        manVector.push(deliveryMenList[deliveryMen].emails);
    }

    var emailVector = [];
    for (var email in manVector) {
        emailVector.push(manVector[email].address);
    }
    return manVector;
}

Template.Deliveryorder.helpers({
  deliveryorders(){
    return DeliveryOrder.find({});
  },
  deliveryManList: function(){
      const user = Meteor.user();

      var deliveryMen = getDeliveryMen(user.company);
      var listOfEmails = parserDeliveryMen(deliveryMen);

      console.log(deliveryMen);

      return listOfEmails.address;
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
