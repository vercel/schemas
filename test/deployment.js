/* eslint camelcase: 0 */
const AJV = require('ajv');
const assert = require('assert');
const deploymentConfigSchema = require('../deployment/config');

const ajv = new AJV({allErrors: true});

exports.test_unknown_keys = () => {
	const isValid = ajv.validate(deploymentConfigSchema, {
		foo: 1,
		bar: 2
	});
	assert.equal(isValid, false);
	assert.equal(ajv.errors.length, 2);
	['foo', 'bar'].forEach((prop, i) => {
		const error = ajv.errors[i];
		assert.equal(error.keyword, 'additionalProperties');
		assert.equal(error.params.additionalProperty, prop);
	});
};

exports.test_features_object = () => {
	const isValid = ajv.validate(deploymentConfigSchema, {
		features: {
			foo: 'v2',
			bar: 2
		}
	});
	assert.equal(isValid, true);
};

exports.test_slot_key = () => {
	const isValid = ajv.validate(deploymentConfigSchema, {
		features: {
			cloud: 'v2'
		},
		slot: 'c.125-m512'
	});
	assert.equal(isValid, true);
};

exports.test_staging_slot_key = () => {
	const isValid = ajv.validate(deploymentConfigSchema, {
		features: {
			cloud: 'v2'
		},
		slot: 'staging-c.5-t1-w-m1024'
	});
	assert.equal(isValid, true);
};

exports.test_invalid_slot_key = () => {
	const isValid = ajv.validate(deploymentConfigSchema, {
		features: {
			cloud: 'v2'
		},
		slot: 'invalid-key'
	});
	assert.equal(isValid, false);
};

exports.test_slot_key_without_cloud_v2 = () => {
	const isValid = ajv.validate(deploymentConfigSchema, {
		slot: 'c.125-m512'
	});
	assert.equal(isValid, false);
};

exports.test_invalid_features_object = () => {
	const isValid = ajv.validate(deploymentConfigSchema, {
		features: {
			foo: []
		}
	});
	assert.equal(isValid, false);
};

exports.test_features_object = () => {
	const isValid = ajv.validate(deploymentConfigSchema, {
		limits: {
			duration: 60000,
			maxConcurrentReqs: 2,
			timeout: 60000 * 2
		}
	});
	assert.equal(isValid, true);
};

exports.test_invalid_limits_object = () => {
	const isValid = ajv.validate(deploymentConfigSchema, {
		limits: {
			foo: []
		}
	});
	assert.equal(!isValid, true);
};

exports.test_valid_env_types = () => {
	let isValid = ajv.validate(deploymentConfigSchema, {
		env: {
			VALID: '1'
		}
	});
	assert.equal(isValid, true);

	isValid = ajv.validate(deploymentConfigSchema, {
		env: [
			'VALID'
		]
	});
	assert.equal(isValid, true);
};

exports.test_invalid_env_types = () => {
	const isValid = ajv.validate(deploymentConfigSchema, {
		env: {
			INVALID: true
		}
	});
	assert.equal(!isValid, true);
};

exports.test_valid_build_env_types = () => {
	const isValid = ajv.validate(deploymentConfigSchema, {
		build: {
			env: {
				VALID: '1'
			}
		}
	});
	assert.equal(isValid, true);
};

exports.test_invalid_build_env_types = () => {
	const isValid = ajv.validate(deploymentConfigSchema, {
		build: {
			env: {
				INVALID: true
			}
		}
	});
	assert.equal(!isValid, true);
};

exports.test_invalid_static_object = () => {
	const isValid = ajv.validate(deploymentConfigSchema, {
		'static': {
			foo: []
		}
	});
	assert.equal(isValid, false);
};

exports.test_valid_static_object_trailing_slash = () => {
	const isValid = ajv.validate(deploymentConfigSchema, {
		'static': {
			trailingSlash: true
		}
	});
	assert.equal(isValid, true);
};

exports.test_valid_static_object_invalid_prop = () => {
	const isValid = ajv.validate(deploymentConfigSchema, {
		'static': {
			trailingSlash: []
		}
	});
	assert.equal(isValid, false);
};
