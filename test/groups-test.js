'use strict';

const test = require('blue-tape');
const keycloakAdminClient = require('../index');
<<<<<<< HEAD
<<<<<<< HEAD
const kcSetupForTests = require('../scripts/kc-setup-for-tests.json');

const _ = require('./sleep');
=======
>>>>>>> dee9a1f... Added methods for listing groups, group members and user groups
=======
>>>>>>> a1bd7f8... Fixed Eslint issues

const settings = {
  baseUrl: 'http://127.0.0.1:8080/auth',
  username: 'admin',
  password: 'admin',
  grant_type: 'password',
  client_id: 'admin-cli'
};

test('Test getting the list of groups for a Realm', (t) => {
  const kca = keycloakAdminClient(settings);

  return kca.then((client) => {
    t.equal(typeof client.groups.find, 'function', 'The client object returned should have a groups function');

    // Use the master realm
    const realmName = 'master';

    return client.groups.find(realmName).then((listOfGroups) => {
      // The listOfUsers should be an Array
      t.equal(listOfGroups instanceof Array, true, 'the list of groups should be an array');
<<<<<<< HEAD
<<<<<<< HEAD
      
      // The list of groups in the master realm should have 2
      t.equal(listOfGroups.length, 2, 'There should be 2 groups in master');
      
=======

      // The list of groups in the master realm should have 2
      t.equal(listOfGroups.length, 2, 'There should be 2 groups in master');

>>>>>>> dee9a1f... Added methods for listing groups, group members and user groups
=======

      // The list of groups in the master realm should have 2
      t.equal(listOfGroups.length, 2, 'There should be 2 groups in master');

>>>>>>> a1bd7f8... Fixed Eslint issues
      // List is returned in random order, so we sort to it make tests stable
      listOfGroups.sort((group1, group2) => {
        return group1.name - group2.name;
      });
<<<<<<< HEAD
<<<<<<< HEAD
      
=======

>>>>>>> dee9a1f... Added methods for listing groups, group members and user groups
=======

>>>>>>> a1bd7f8... Fixed Eslint issues
      t.equal(listOfGroups[0].name, 'Test group 1', 'The name of the first group should be Test group 1');
      t.equal(listOfGroups[1].path, '/Test group 2', 'The path of the second group should be /Test group 2');
    });
  });
});

test('Test getting the list of group members from Test group 1 for a Realm', (t) => {
  const kca = keycloakAdminClient(settings);

  return kca.then((client) => {
    t.equal(typeof client.groups.members.find, 'function', 'The client object returned should have a groups.members function');

    // Use the master realm
    const realmName = 'master';
    // First groups id
    const groupId = '5a54a050-1b9d-4cfa-bf7f-048dd0ba7135';

    return client.groups.members.find(realmName, groupId).then((listOfMembers) => {
<<<<<<< HEAD
<<<<<<< HEAD
      
      // The listOfUsers should be an Array
      t.equal(listOfMembers instanceof Array, true, 'the list of groups should be an array');
      
=======
      // The listOfUsers should be an Array
      t.equal(listOfMembers instanceof Array, true, 'the list of groups should be an array');

>>>>>>> dee9a1f... Added methods for listing groups, group members and user groups
=======
      // The listOfUsers should be an Array
      t.equal(listOfMembers instanceof Array, true, 'the list of groups should be an array');

>>>>>>> a1bd7f8... Fixed Eslint issues
      // The list of groups in the master realm should have 2
      t.equal(listOfMembers.length, 1, 'There should be 1 member in the group');
      t.equal(listOfMembers[0].username, 'admin', 'The username of the member should be admin');
    });
  });
<<<<<<< HEAD
<<<<<<< HEAD
});
=======
});
>>>>>>> dee9a1f... Added methods for listing groups, group members and user groups
=======
});
>>>>>>> a1bd7f8... Fixed Eslint issues
