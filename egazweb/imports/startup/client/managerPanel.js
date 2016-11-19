import { Template } from 'meteor/templating';

Template.managerlayout.events({
    'click .glyphicon-user': function(event){
        console.log("olá empregados");
    }
});
