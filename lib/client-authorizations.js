'use strict';

const resources = require('./authorizations-resources');
const policies = require('./authorizations-policies');
const permissions = require('./authorizations-permissions');

/**
 * @module authorizations
 */

module.exports = {
  resources: resources,
  policies: policies,
  permissions: permissions
};
