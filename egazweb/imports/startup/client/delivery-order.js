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
  'change [name="deliveryMan"]': function(event, template){
      event.preventDefault();
      let delivery = $(event.target).find( 'option:selected' ).val();
      let role = $( event.target ).find( 'option:selected' ).val();


      const deliveryMan = event.target.value;
      const deliveryManId = Meteor.users.findOne({ 'emails.address' : deliveryMan })._id;
      const order = this._id;

      console.log(deliveryManId);
      console.log("_idOrder " + order);

      console.log($(event.currentTarget.innerHTML));

      Meteor.call("updateDeliveryMan", order, deliveryManId);
    },
  'change [name="productSelect"]': function(event){
    var select = event.target;
    var productId = select.options[select.selectedIndex].getAttribute('data-id');
    var order = this._id;
    Meteor.call('updateItem', order, productId);
    return Session.set('productId', productId);
  },

  'change [name="priceSelect"]': function(event){
    var select = event.target;
    var price = select.options[select.selectedIndex].getAttribute('data-value');
    var order = this._id;
    Meteor.call('updatePrice', order, Number(price))
    return Session.set('income', price);
  },

  'change [name="orderStatus"]': function(event){
    var select = event.target;
    var status = select.options[select.selectedIndex].getAttribute('data-id');
    var order = this._id;
    if(status === ""){
    }else{
      if(status === "Entregue"){
        var amount = this.amount;
        var companyId = Meteor.user().company
        var income = Session.get('income');

        Meteor.call('updateIncome', companyId, Number(income), Number(amount));
        Meteor.call('updateStatus', order, status);
      }else{
          Meteor.call('updateStatus', order, status);
        }
    }
  },

  'change .radio-inline': function(event){
    var select = event.target.value;
    return Session.set('orderStatus', select);
  },

  });

}

/** Function to return the deliveryMans in a company **/
function getDeliveryMen(company){
    check(company, String);
    var deliveryMen = Meteor.users.find(
        {"company": company, "roles": "Entregador"},
        {fields:
            {"emails": 1}
        }
    );
    return deliveryMen;
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

function getIncome(company){
  /*Seting the dates filters to start exactly at of 00:00 and end at 23:59 of the current day*/
  var begin = (function(d){ d.setHours(23,59,59,0); return d})(new Date);
  var end = (function(d){ d.setHours(0,0,0,0); return d})(new Date);
  var income = Company.findOne({"_id": company}).incomes.filter( function(s){
      return s.createdAt <= begin && s.createdAt >= end;
  });
  return income;
}

Template.Deliveryorder.helpers({
  deliveryorders(){
    if(Session.equals('orderStatus', undefined)){
      var orders = DeliveryOrder.find({status: "Aberto"},{sort: {createdAt: -1}});
      return orders;
    }else if (Session.equals('orderStatus', "")){
      return DeliveryOrder.find({},{sort: {createdAt: -1} });
    }else{
      var status = Session.get('orderStatus');
      var orders = DeliveryOrder.find({status: status}, {sort: {createdAt: -1}}).fetch({});
      return orders;
    }
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
  },
});

Template.Income.helpers({
  income: function(){
    const user =  Meteor.user();
    var income = getIncome(user.company);
    console.log(income)
    total = 0;
    i = 0;
    console.log(income);
    while(income[i]){
      total = total + income[i].value;
        i++;
    }
    return total;
  }

});

/** Custom Helpers **/

/** Compares two arguments **/
Template.registerHelper("equals", function(a,b){
    return a === b;
});

Template.registerHelper("formatDate", function(date){
    return moment(date).format('DD/MM HH:mm:ss');
});

Template.registerHelper( 'selected', ( v1, v2 ) => {
  return v1 === v2 ? true : false;
});
