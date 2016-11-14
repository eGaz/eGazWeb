import '../../ui/layout/homelayout.html'
import '../../ui/layout/companylayout.html'
import '../../ui/layout/delivery-orderlayout.html'

Router.route('/company', function(){
  this.render('Company')
});

Router.route('/deliveryorder', function(){
  this.render('Deliveryorder')
});
