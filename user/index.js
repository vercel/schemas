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
	minLength: 5,
	maxLength: 256
};

const PlatformVersion = {
	oneOf: [
		{
			// A `null` platform version means to always use the latest
			type: 'null'
		},
		{
			type: 'integer',
			minimum: 1,
			maximum: 2
		}
	]
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

const Bio = {
	type: 'string'
};

const Website = {
	type: 'string',
	minLength: 4,
	maxLength: 40
};

const Profile = {
	type: 'object',
	properties: {
		service: {
			type: 'string'
		},
		link: {
			type: 'string'
		}
	}
};

const Profiles = {
	type: 'array',
	minItems: 0,
	maxItems: 100,
	uniqueItems: true,
	items: Profile,
	additionalProperties: false
};

const PublicTeams = {
	type: 'array',
	items: { type: 'string' }
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
		defaultDeploymentDomain: DefaultDeploymentDomain,
		bio: Bio,
		website: Website,
		profiles: Profiles,
		publicTeams: PublicTeams
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
