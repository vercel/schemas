module.exports = {
	type: 'object',
	properties: {
		'public': {
			type: 'string'
		},
		'cleanUrls': {
			type: [
				'boolean',
				'array'
			]
		},
		'rewrites': {
			type: 'array'
		},
		'redirects': {
			type: 'array'
		},
		'headers': {
			type: 'array'
		},
		'directoryListing': {
			type: [
				'boolean',
				'array'
			]
		},
		'unlisted': {
			type: 'array'
		},
		'trailingSlash': {
			type: 'boolean'
		},
		'renderSingle': {
			type: 'boolean'
		}
	},
	additionalProperties: false
};
