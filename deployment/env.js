const maxEnvLength = 100;

const reservedEnvKeys = [
	'NOW',

	// Questionable?
	'PATH',
	'HOME',
	'TEMP',

	// Legacy
	'AUTH_TOKEN',
	'DEPLOYMENT_ID',
	'REGISTRY_AUTH_TOKEN'
];

const EnvKey = {
	type: 'string',
	pattern: '^[A-z0-9_]+$',
	minLength: 1,
	maxLength: 256,
	allOf: [
		{
			not: {
				'enum': reservedEnvKeys
			}
		},
		{
			not: {
				pattern: '^NOW_.*$'
			}
		}
	]
};

const EnvKeys = {
	type: 'array',
	minItems: 0,
	maxItems: maxEnvLength,
	uniqueItems: true,
	items: EnvKey,
	additionalProperties: false
};

const EnvValue = {
	type: 'string',
	minLength: 0,
	maxLength: 65536
};

// { 'FOO': 'BAR' }
const EnvObject = {
	type: 'object',
	minProperties: 0,
	maxProperties: maxEnvLength,
	patternProperties: {
		'.+': EnvValue
	},
	additionalProperties: false
};

module.exports = {
	EnvKey,
	EnvKeys,
	EnvValue,
	EnvObject
};
