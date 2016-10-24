import { Template } from 'meteor/templating';

import './layout/managementlayout.html'

Template.managementlayout.helpers({
  users() {
    return Meteor.users.find({});
  },

   'play': function(){
    return "play";
  }
});
