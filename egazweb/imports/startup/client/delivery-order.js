import { Template } from 'meteor/templating';
import { DeliveryOrder } from '../../api/delivery-order.js';
import { Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Schemas } from 'meteor/aldeed:simple-schema';
import { Session } from 'meteor/session';
import '../../ui/layout/delivery-orderlayout.html';

Meteor.subscribe('deliveryorders');
Meteor.subscribe('orderincompany');

Session.set("currentCompany","Dcc9t9tnkAgK88syv");

if(Meteor.isClient){
  Template.Deliveryorder.onCreated( function() {

});

  Template.Deliveryorder.events({
    'submit form': function(event) {
      // Prevent default browser form submit
      event.preventDefault();
      // Get value from form element
      const neighborhood = event.target.neighborhood.value;
      const address = event.target.address.value;
      const number = event.target.number.value;
      const type = "callcenter";
      var companyId = Session.get('currentCompany');

      Meteor.call('createDeliveryOrder', neighborhood, address, number, companyId, type);
      console.log(event.type);
      event.target.neighborhood.value = "";
      event.target.address.value = "";
      event.target.number.value = "";
    },
  });
}

Template.Deliveryorder.helpers({
  deliveryorders(){
    return DeliveryOrder.find({});
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
