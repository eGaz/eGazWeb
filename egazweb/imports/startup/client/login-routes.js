import '../../ui/layout/homelayout.html'
import '../../ui/layout/signinlayout.html'
import '../../ui/layout/signuplayout.html'
import '../../ui/layout/gestorlayout.html'
import '../../ui/layout/managementlayout.html'
import '../../ui/layout/managerlayout.html'
import '../../ui/layout/productlayout.html'
import '../../ui/layout/delivery-orderlayout.html'

var PostLogout = function(){
  Router.go('/');
};

var PostLogin = function(){
  Router.go('/gestor');
};

AccountsTemplates.configure({
    defaultLayout: 'homelayout',
    onLogoutHook: PostLogout
});

Router.route('/', function(){
  this.render('homelayout')
});

Router.route('/signin', function() {
  this.render('signinlayout')
});

Router.route('/signup', function(){
  this.render('signuplayout')
});

/*
Accounts.onLogin(function () {
  Router.go("/roles");
});
*/
