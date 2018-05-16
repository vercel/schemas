module.exports = {
	type: 'object',
	properties: {
		cleanURLs: {
			type: [
				'boolean',
				'array'
			]
		},
		rewrites: {
			type: 'array'
		},
		redirects: {
			type: 'array'
		},
		headers: {
			type: 'array'
		},
		trailingSlash: {
			type: 'boolean'
		}
	},
	additionalProperties: false
};
