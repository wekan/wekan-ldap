import {importNewUsers} from './sync';

Meteor.methods({
  ldap_sync_now() {
    const user = Meteor.user();
    if (!user) {
      throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'ldap_sync_users' });
    }

    //TODO: This needs to be fixed - security issue -> alanning:meteor-roles
    //if (!RocketChat.authz.hasRole(user._id, 'admin')) {
    //	throw new Meteor.Error('error-not-authorized', 'Not authorized', { method: 'ldap_sync_users' });
    //}

    if (Meteor.settings.LDAP_Enable !== true) {
      throw new Meteor.Error('LDAP_disabled');
    }

    this.unblock();

    importNewUsers();

    return {
      message: 'Sync_in_progress',
      params: [],
    };
  },
});
