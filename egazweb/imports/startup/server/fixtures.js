import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import  '../../api/company.js';

Meteor.startup(() => {
  /* The Default Roles to eGaz*/
  /* Adicionar lógica de "if not exist" para não dar problema de consistência
  toda as vezes que for iniciar o projeto não recriar as roles

  Roles.createRole('Gestor');
  Roles.createRole('Entregador');
  Roles.createRole('Administrador');
  Roles.createRole('Colaborador');
  */

    /* Por algum motivo adicionar a role Roles.GLOBAL_GROUP
    não faz possível que se filtre, mesmo usando dois filtros [role, grupo]
    Roles.addUsersToRoles('ID_DO_USER', 'Administrador');
    */
});

/*Accounts.onCreateUser(function(options, user) {
   // Use provided profile in options, or create an empty object
   user.profile = options.profile || {};
   // Assigns first and last names to the newly created user object
   user.profile.firstName = options.firstName;
   user.profile.lastName = options.lastName;
   // Returns the user object
   return user;
});*/

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
  }
});
