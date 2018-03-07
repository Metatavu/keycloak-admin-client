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
  A function to create a new policy.
  @param {string} realmName - The name of the realm (not the realmID) where the client policies exist - ex: master
  @param {string} id - The id of the client (not the client-id) where the policy will be created
  @param {object} policy - The JSON representation of a policy - http://www.keycloak.org/docs-api/3.4/rest-api/index.html#_policyrepresentation - name must be unique within the client
  @returns {Promise} A promise that will resolve with the newly created policy
  @example
  keycloakAdminClient(settings)
    .then((client) => {
      client.clients.authorizations.policies.create(realmName, id, policy)
        .then((createdResource) => {
        console.log(createdResource) // [{...}]
      })
    });
 */
function create (client) {
  return function create (realm, id, policy) {
    return new Promise((resolve, reject) => {
      if (!policy) {
        return reject(new Error('policy is missing'));
      }

      const req = {
        url: `${client.baseUrl}/admin/realms/${realm}/clients/${id}/authz/resource-server/policy/${policy.type}`,
        auth: {
          bearer: privates.get(client).accessToken
        },
        body: policy,
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
  A function to get the all the policys of a client or a specific policy for a client
  @param {string} realmName - The name of the realm (not the realmID) where the client policys exist - ex: master
  @param {string} id - The id of the client (not the client-id) where the policy will be found
  @param {string} policyType - Optional type of a specific policy to find, requires policyId to be set as well
  @param {string} policyId - Optional ID of a specific policy to find, requires policyType to be set as well
  @returns {Promise} A promise that will resolve with the Array of policies or just one policy if the policyId and policyType option is used
  @example
  keycloakAdminClient(settings)
    .then((client) => {
      client.clients.authorizations.policies.find(realmName, id)
        .then((policys) => {
          console.log(policys)
      })
    })
 */
function find (client) {
  return function find (realm, id, policyType, policyId) {
    return new Promise((resolve, reject) => {
      const req = {
        auth: {
          bearer: privates.get(client).accessToken
        },
        json: true
      };

      if (policyId && policyType) {
        req.url = `${client.baseUrl}/admin/realms/${realm}/clients/${id}/authz/resource-server/policy/${policyType}/${policyId}`;
      } else {
        req.url = `${client.baseUrl}/admin/realms/${realm}/clients/${id}/authz/resource-server/policy`;
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
  A function to update a policy.
  @param {string} realmName - The name of the realm (not the realmID) where the client policies exist - ex: master
  @param {string} id - The id of the client (not the client-id) where the policy will be found
  @param {object} policy - The JSON representation of a policy - http://www.keycloak.org/docs-api/3.4/rest-api/index.html#_policyrepresentation - name must be unique within the client
  @returns {Promise} A promise that will resolve with the newly created client role
  @example
  keycloakAdminClient(settings)
    .then((client) => {
      client.clients.authorizations.policies.update(realm, id, policy)
        .then((updatedResource) => {
        console.log(updatedResource) // [{...}]
      })
    })
 */
function update (client) {
  return function update (realm, id, policy) {
    return new Promise((resolve, reject) => {
      if (!policy) {
        return reject(new Error('policy is missing'));
      }

      const req = {
        url: `${client.baseUrl}/admin/realms/${realm}/clients/${id}/authz/resource-server/policy/${policy.type}/${policy.id}`,
        auth: {
          bearer: privates.get(client).accessToken
        },
        body: policy,
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
        return resolve(client.clients.authorizations.policies.find(realm, id, policy.type, policy.id));
      });
    });
  };
}

/**
  A function to remove a policy.
  @param {string} realm - The name of the realm (not the realmID) where the client roles exist - ex: master
  @param {string} id - The id of the client (not the client-id) where the policy will be found
  @param {string} policyId - ID of a policy to update
  @returns {Promise} A promise that will resolve with empty return value if deletion was successful
  @example
  keycloakAdminClient(settings)
    .then((client) => {
      client.clients.authorizations.policies.remove(realm, id, policyId)
        .then(() => {
        console.log("Resource successfully removed");
      })
    })
 */
function remove (client) {
  return function remove (realm, id, policyId) {
    return new Promise((resolve, reject) => {
      if (!policyId) {
        return reject(new Error('policyId is missing'));
      }

      const req = {
        url: `${client.baseUrl}/admin/realms/${realm}/clients/${id}/authz/resource-server/policy/${policyId}`,
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
