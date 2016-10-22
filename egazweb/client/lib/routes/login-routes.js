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
