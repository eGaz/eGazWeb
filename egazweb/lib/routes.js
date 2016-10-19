var myPostLogout = function(){
  //example redirect after logout
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
