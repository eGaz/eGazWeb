import '../../ui/layout/homelayout.html'
import '../../ui/layout/companylayout.html'
import '../../ui/layout/employeelayout.html'

Router.route('/company', function(){
  this.render('Company')
});

Router.route('/deliveryorder', function(){
  this.render('Deliveryorder')
});

Router.route('/employee', function(){
  this.render('Employee')
});
