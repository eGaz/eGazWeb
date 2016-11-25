import { Template } from 'meteor/templating';
import { DeliveryOrder } from '../../api/delivery-order.js';
import { Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Schemas } from 'meteor/aldeed:simple-schema';
import { Company } from '../../api/company.js';
import '../../ui/layout/delivery-orderlayout.html';

import { Users } from 'meteor/accounts-base';

Deps.autorun(function(){
  Meteor.subscribe('deliveryorders');
  Meteor.subscribe('orderincompany');
  Meteor.subscribe('users');
  Meteor.subscribe('companies');
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

  'change [name="productSelect"]': function(event){
    var sel = event.target;
    var productId = sel.options[sel.selectedIndex].getAttribute('data-id');
    var order = this._id;
    Meteor.call('updateItem', order, productId);
    return Session.set('productId', productId);
  },

  'change [name="priceSelect"]': function(event){
  var sel = event.target;
  var price = sel.options[sel.selectedIndex].getAttribute('data-value');
  console.log(price)  
  var order = this._id;
  Meteor.call('updatePrice', order, Number(price))
  },

  });

}

/** Function to return the deliveryMans in a company **/
function getDeliveryMen(company){
    var emailsList = Meteor.users.find(
        {"company": company, "roles": 'Entregador'}
    );
    return emailsList;
}

/** Function to return the products in a company**/
function getProducts(company){
  var productList = Company.findOne({"_id": company});
  return productList;
}

function getPrices(company, product){
  var query = {"_id": company, "products._id": product};
  var priceList = Company.findOne({"_id": company, "products._id": product}).products.filter( function(s){
    return s._id === product;
  });
  return priceList;
}

Template.Deliveryorder.helpers({
  deliveryorders(){
    return DeliveryOrder.find({});
  },
  deliveryManList: function(){
      const user = Meteor.user();

      var deliveryMen = getDeliveryMen(user.company);

      return deliveryMen;
  },
  products: function(){
    const user = Meteor.user();
    var products = getProducts(user.company);
      return products;
  },

  pricesList: function(){
    if(Session.equals('productId', undefined)){
      return
    }else{
      var productId = Session.get('productId')
      console.log(productId);
      const user = Meteor.user();
      var prices = getPrices(user.company, productId);
      console.log(prices)
      return prices;
    }
  }
});

/** Custom Helpers **/

/** Compares two arguments **/
Template.registerHelper("equals", function(a,b){
    return a === b;
});

Template.registerHelper("formatDate", function(date){
    return moment(date).format('HH:mm:ss DD/MM');
});

Template.registerHelper( 'selected', ( v1, v2 ) => {
  return v1 === v2 ? true : false;
});
