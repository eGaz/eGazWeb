import '../../ui/layout/homelayout.html'
import '../../ui/layout/signinlayout.html'
import '../../ui/layout/signuplayout.html'
import '../../ui/layout/gestorlayout.html'
import '../../ui/layout/managementlayout.html'

var myPostLogout = function(){
  Router.go('/');
};

AccountsTemplates.configure({
    defaultLayout: 'homelayout',
    onLogoutHook: myPostLogout
});

Router.route('/', function(){
  this.render('homelayout')
});

Router.route('/signin', function() {
  this.render('signinlayout')
});

Router.route('/signup', function(){
  this.route('signuplayout')
});
