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
    var today = new Date();
    var yesterday = (function(d){ d.setDate(d.getDate()-1); return d})(new Date);
    return DeliveryOrder.find({createdAt: {$lte: today, $gt: yesterday}});
});
