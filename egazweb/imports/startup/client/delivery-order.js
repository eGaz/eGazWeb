import { Template } from 'meteor/templating';
import { DeliveryOrder } from '../../api/delivery-order.js';
import { Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Schemas } from 'meteor/aldeed:simple-schema';
import '../../ui/layout/delivery-orderlayout.html';

Deps.autorun(function(){
  Meteor.subscribe('deliveryorders');
  Meteor.subscribe('orderincompany');
});


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

      companyIdFromUser =  Meteor.user().company
      console.log(companyIdFromUser)
      Session.set('currentCompany',companyIdFromUser)

      companyId = Session.get('currentCompany');

      Meteor.call('createDeliveryOrder', neighborhood, address, number, companyId);
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
