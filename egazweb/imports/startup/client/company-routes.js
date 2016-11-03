import '../../ui/layout/homelayout.html'
import '../../ui/layout/companylayout.html'

Router.route('/company', function(){
  this.render('insertCompanyForm')
});

Router.route('/company/new', function(){
  this.render('newcompanylayout')
});
