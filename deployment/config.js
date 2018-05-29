const staticSchema = require('./config-static');

module.exports = {
	type: 'object',
	additionalProperties: false,
	properties: {
		'name': {
			type: 'string',
			minLength: 1
		},
		'alias': {
			type: [
				'string',
				'array'
			]
		},
		'env': {
			type: [
				'object',
				'array'
			]
		},
		'scale': {
			type: 'object',
			patternProperties: {
				'^(sfo|bru)1$': {
					type: 'object',
					required: ['max', 'min'],
					properties: {
						max: {
							anyOf: [
								{
									type: 'number',
									minimum: 1
								},
								{'const': 'auto'}
							]
						},
						min: {
							type: 'number',
							minimum: 0
						}
					}
				}
			},
			additionalProperties: false
		},
		'regions': {
			type: 'array'
		},
		'dotenv': {
			type: [
				'boolean',
				'string'
			]
		},
		'files': {
			type: 'array'
		},
		'type': {
			type: 'string'
		},
		'forwardNpm': {
			type: 'boolean'
		},
		'public': {
			type: 'boolean'
		},
		'engines': {
			type: 'object'
		},
		'api': {
			type: 'string'
		},
		'static': staticSchema,
		'features': {
			type: 'object',
			patternProperties: {
				'.*': {
					type: ['string', 'number', 'boolean']
				}
			}
		}
	}
};

