const Service = {
	type: 'object',
	additionalProperties: false,
	properties: {
		port: {
			type: 'number',
			minimum: 1,
			maximum: 65535
		}
	}
};

module.exports = {
	Service
};
