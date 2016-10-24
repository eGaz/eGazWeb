import { Meteor } from 'meteor/meteor';

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
    não faz possível que se filtre, mesmo usando dois filtros [role, grupo]*/
    /*Roles.addUsersToRoles('qCCtL4f8Cy5kWyiEz', 'Entregador');
    */


});
