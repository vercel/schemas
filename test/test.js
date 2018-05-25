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

exports.test_invalid_features_object = () => {
	const isValid = ajv.validate(deploymentConfigSchema, {
		features: {
			foo: []
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
	assert.equal(!isValid, true);
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
	assert.equal(!isValid, true);
};
