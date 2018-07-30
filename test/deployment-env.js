/* eslint camelcase: 0 */
const AJV = require('ajv');
const assert = require('assert');
const {
	EnvKeys,
	EnvObject
} = require('../deployment/config-env');

const ajv = new AJV({allErrors: true});

// EnvKeys
exports.test_env_keys_valid = () => {
	const isValid = ajv.validate(EnvKeys, [
		'FOO',
		'BAR'
	]);
	assert.equal(isValid, true);
};

exports.test_env_keys_too_short = () => {
	const isValid = ajv.validate(EnvKeys, [
		'FOO',
		''
	]);
	assert.equal(isValid, false);
	assert.equal(ajv.errors[0].keyword, 'minLength');
};

exports.test_env_keys_too_long = () => {
	const isValid = ajv.validate(EnvKeys, [
		'FOO',
		'A'.repeat(257)
	]);
	assert.equal(isValid, false);
	assert.equal(ajv.errors[0].keyword, 'maxLength');
};

exports.test_env_keys_invalid_chars = () => {
	const isValid = ajv.validate(EnvKeys, [
		'FOO',
		'BA,D'
	]);
	assert.equal(isValid, false);
	assert.equal(ajv.errors[0].keyword, 'pattern');
};

exports.test_env_keys_invalid_type = () => {
	const isValid = ajv.validate(EnvKeys, [
		'FOO',
		true
	]);
	assert.equal(isValid, false);
	assert.equal(ajv.errors[0].keyword, 'type');
};

exports.test_env_keys_non_unique = () => {
	const isValid = ajv.validate(EnvKeys, [
		'FOO',
		'FOO'
	]);
	assert.equal(isValid, false);
	assert.equal(ajv.errors[0].keyword, 'uniqueItems');
};

exports.test_env_keys_reserved = () => {
	let isValid = ajv.validate(EnvKeys, [
		'FOO',
		'NOW'
	]);
	assert.equal(isValid, false);
	assert.equal(ajv.errors[0].keyword, 'not');

	isValid = ajv.validate(EnvKeys, [
		'NOW_DC'
	]);
	assert.equal(isValid, false);
	assert.equal(ajv.errors[0].keyword, 'not');

	isValid = ajv.validate(EnvKeys, [
		'NOW_FOO'
	]);
	assert.equal(isValid, false);
	assert.equal(ajv.errors[0].keyword, 'not');

	isValid = ajv.validate(EnvKeys, [
		'AUTH_TOKEN'
	]);
	assert.equal(isValid, false);
	assert.equal(ajv.errors[0].keyword, 'not');
};

// EnvObject
exports.test_env_object_valid = () => {
	const isValid = ajv.validate(EnvObject, {
		FOO: 'BAR',
		BAZ: '@secret'
	});
	assert.equal(isValid, true);
};

exports.test_env_object_bad_type = () => {
	const isValid = ajv.validate(EnvObject, {
		FOO: true
	});
	assert.equal(isValid, false);
	assert.equal(ajv.errors[0].keyword, 'type');
};

exports.test_env_object_too_long = () => {
	const isValid = ajv.validate(EnvObject, {
		FOO: 'a'.repeat(70000)
	});
	assert.equal(isValid, false);
	assert.equal(ajv.errors[0].keyword, 'maxLength');
};

exports.test_env_keys_npm_token = () => {
	const isValid = ajv.validate(EnvKeys, [
		'NOW_NPM_TOKEN'
	]);
	assert.equal(isValid, true);
};

