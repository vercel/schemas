const Username = {
	type: 'string',
	minLength: 1,
	maxLength: 48,
	pattern: '^[a-z][a-z0-9_-]*$'
};

const Name = {
	type: 'string',
	minLength: 1,
	maxLength: 32
};

const Email = {
	type: 'string',
	minLength: 1,
	maxLength: 256
};

const PlatformVersion = {
	type: 'number',
	minimum: 1,
	maximum: 2
};

const Avatar = {
	type: 'string',
	minLength: 40,
	maxLength: 40,
	pattern: '^[0-9a-f]+$'
};

const DefaultDeploymentDomain = {
	type: 'string'
};

const User = {
	type: 'object',
	additionalProperties: false,
	properties: {
		username: Username,
		name: Name,
		email: Email,
		billingChecked: {type: 'boolean'},
		avatar: Avatar,
		platformVersion: PlatformVersion,
		defaultDeploymentDomain: DefaultDeploymentDomain
	}
};

module.exports = {
	User,
	Username,
	Name,
	Email,
	Avatar,
	PlatformVersion,
	DefaultDeploymentDomain
};
