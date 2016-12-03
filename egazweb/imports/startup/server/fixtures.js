import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';
import { Company } from '../../api/company.js';
import { Roles } from 'meteor/alanning:roles'
Meteor.startup(() => {
  /* The Default Roles to eGaz*/
  /* Adicionar lógica de "if not exist" para não dar problema de consistência
  toda as vezes que for iniciar o projeto não recriar as roles

  */
  var roles = Meteor.roles.find({}).count();

  if(roles > 0){
    console.log("ok");
  }else{
    Roles.createRole('Gestor');
    Roles.createRole('Entregador');
    Roles.createRole('Administrador');
    Roles.createRole('Colaborador');
    Roles.createRole('Convidado');
  }

    /* Por algum motivo adicionar a role Roles.GLOBAL_GROUP
    não faz possível que se filtre, mesmo usando dois filtros [role, grupo]
    */
});

Accounts.onCreateUser(function(options, user) {
   // Set a default role to a newly created user
   user.roles= 'Convidado';
   user.company = '';
   return user;
});

Meteor.methods({
  setRoleOnUser( options ) {
  check( options, {
      user: String,
      role: String
    });

    try {
      Roles.setUserRoles( options.user, [ options.role ] );
    } catch( exception ) {
      return exception;
    }
  },
});
