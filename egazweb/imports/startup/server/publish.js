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
