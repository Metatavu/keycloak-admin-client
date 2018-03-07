'use strict';

const privates = require('./private-map');
const request = require('request');

/**
 * @module clients
 */

module.exports = {
  create: create,
  find: find,
  update: update,
  remove: remove
};

/**
  A function to create a new permission.
  @param {string} realmName - The name of the realm (not the realmID) where the client permissions exist - ex: master
  @param {string} id - The id of the client (not the client-id) where the permission will be created
  @param {object} permission - The JSON representation of a permission - http://www.keycloak.org/docs-api/3.4/rest-api/index.html#_permissionrepresentation - name must be unique within the client
  @returns {Promise} A promise that will resolve with the newly created permission
  @example
  keycloakAdminClient(settings)
    .then((client) => {
      client.clients.authorizations.permissions.create(realmName, id, permission)
        .then((createdResource) => {
        console.log(createdResource) // [{...}]
      })
    });
 */
function create (client) {
  return function create (realm, id, permission) {
    return new Promise((resolve, reject) => {
      if (!permission) {
        return reject(new Error('permission is missing'));
      }

      const req = {
        url: `${client.baseUrl}/admin/realms/${realm}/clients/${id}/authz/resource-server/permission/${permission.type}`,
        auth: {
          bearer: privates.get(client).accessToken
        },
        body: permission,
        method: 'POST',
        json: true
      };
      
      request(req, (err, resp, body) => {
        if (err) {
          return reject(err);
        }

        if (resp.statusCode !== 201) {
          return reject(body);
        }

        return resolve(body);
      });
    });
  };
}

/**
  A function to get the all the permissions of a client or a specific permission for a client
  @param {string} realmName - The name of the realm (not the realmID) where the client permissions exist - ex: master
  @param {string} id - The id of the client (not the client-id) where the permission will be found
  @param {string} permissionType - Optional type of a specific permission to find, requires permissionId to be set as well
  @param {string} permissionId - Optional ID of a specific permission to find, requires permissionType to be set as well
  @returns {Promise} A promise that will resolve with the Array of permissions or just one permission if the permissionId and permissionType option is used
  @example
  keycloakAdminClient(settings)
    .then((client) => {
      client.clients.authorizations.permissions.find(realmName, id)
        .then((permissions) => {
          console.log(permissions)
      })
    })
 */
function find (client) {
  return function find (realm, id, permissionType, permissionId) {
    return new Promise((resolve, reject) => {
      const req = {
        auth: {
          bearer: privates.get(client).accessToken
        },
        json: true
      };

      if (permissionId && permissionType) {
        req.url = `${client.baseUrl}/admin/realms/${realm}/clients/${id}/authz/resource-server/permission/${permissionType}/${permissionId}`;
      } else {
        req.url = `${client.baseUrl}/admin/realms/${realm}/clients/${id}/authz/resource-server/permission`;
      }

      request(req, (err, resp, body) => {
        if (err) {
          return reject(err);
        }

        if (resp.statusCode !== 200) {
          return reject(body);
        }

        return resolve(body);
      });
    });
  };
}

/**
  A function to update a permission.
  @param {string} realmName - The name of the realm (not the realmID) where the client permissions exist - ex: master
  @param {string} id - The id of the client (not the client-id) where the permission will be found
  @param {object} permission - The JSON representation of a permission - http://www.keycloak.org/docs-api/3.4/rest-api/index.html#_permissionrepresentation - name must be unique within the client
  @returns {Promise} A promise that will resolve with the newly created client role
  @example
  keycloakAdminClient(settings)
    .then((client) => {
      client.clients.authorizations.permissions.update(realm, id, permission)
        .then((updatedResource) => {
        console.log(updatedResource) // [{...}]
      })
    })
 */
function update (client) {
  return function update (realm, id, permission) {
    return new Promise((resolve, reject) => {
      if (!permission) {
        return reject(new Error('permission is missing'));
      }

      const req = {
        url: `${client.baseUrl}/admin/realms/${realm}/clients/${id}/authz/resource-server/permission/${permission.type}/${permission.id}`,
        auth: {
          bearer: privates.get(client).accessToken
        },
        body: permission,
        method: 'PUT',
        json: true
      };

      request(req, (err, resp, body) => {
        if (err) {
          return reject(err);
        }

        if (resp.statusCode !== 204) {
          return reject(body);
        }

        // Since the create Endpoint returns an empty body, go get what we just imported.
        return resolve(client.clients.authorizations.permissions.find(realm, id, permission.type, permission.id));
      });
    });
  };
}

/**
  A function to remove a permission.
  @param {string} realm - The name of the realm (not the realmID) where the client roles exist - ex: master
  @param {string} id - The id of the client (not the client-id) where the permission will be found
  @param {string} permissionId - ID of a permission to update
  @returns {Promise} A promise that will resolve with empty return value if deletion was successful
  @example
  keycloakAdminClient(settings)
    .then((client) => {
      client.clients.authorizations.permissions.remove(realm, id, permissionId)
        .then(() => {
        console.log("Resource successfully removed");
      })
    })
 */
function remove (client) {
  return function remove (realm, id, permissionId) {
    return new Promise((resolve, reject) => {
      if (!permissionId) {
        return reject(new Error('permissionId is missing'));
      }

      const req = {
        url: `${client.baseUrl}/admin/realms/${realm}/clients/${id}/authz/resource-server/permission/${permissionId}`,
        auth: {
          bearer: privates.get(client).accessToken
        },
        method: 'DELETE',
        json: true
      };

      request(req, (err, resp, body) => {
        if (err) {
          return reject(err);
        }

        if (resp.statusCode !== 204) {
          return reject(body);
        }

        return resolve();
      });
    });
  };
}
