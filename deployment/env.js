module.exports = {
	anyOf: [
		{
			type: 'object',
			patternProperties: {
				'.+': {
					type: 'string'
				}
			}
		},
		{
			type: 'array',
			items: {
				type: 'string'
			}
		}
	]
};
