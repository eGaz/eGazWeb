import { Company } from '../../api/company.js';
import { DeliveryOrder } from '../../api/delivery-order.js'

Meteor.publish( 'users', function() {
  let isAdmin = Roles.userIsInRole( this.userId, 'Administrador' );

  if ( isAdmin ) {
    return [
      Meteor.users.find( {}, { fields: { "emails.address": 1, "roles": 1 } } )
    ];
  } else {
    return null;
  }
});

Meteor.publish("companies", function(){
    return Company.find();
});

Meteor.publish("deliveryorders", function(){
    return DeliveryOrder.find();
});

Meteor.publish('userWithoutCompany', function(){

  users = Meteor.user.find({});  
});
