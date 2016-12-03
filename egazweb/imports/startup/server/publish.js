import { Company } from '../../api/company.js';
import { DeliveryOrder } from '../../api/delivery-order.js'
import { Accounts } from 'meteor/accounts-base';

Meteor.publish( 'users', function() {
    return Meteor.users.find( {}, { fields: { "emails.address": 1, "roles": 1, "company": 1} } )
});

Meteor.publish("companies", function(){
    return Company.find();
});

Meteor.publish("deliveryorders", function(){
  /*Seting the dates filters to start exactly at of 00:00 and end at 23:59 of the current day*/
  var end = (function(d){ d.setHours(23,59,59,0); return d})(new Date);
  var begin = (function(d){ d.setHours(0,0,0,0); return d})(new Date);
  return DeliveryOrder.find({createdAt: {$lte: end, $gt: begin}});
});
