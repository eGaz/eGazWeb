import { Template } from 'meteor/templating';
import { users} from 'meteor/user'

Template.users.onCreated( () => {
  Template.subscribe( 'users' );
});

Template.users.helpers({
  users(){
    var users = Meteor.users.find();
    if ( users ) {
      return users;
    }
  },
});
