import '../../ui/layout/homelayout.html'
import '../../ui/layout/companylayout.html'

Router.route('/company', function(){
  this.render('companylayout')
});

Router.route('/company/new', function(){
  this.render('newcompanylayout')
});
