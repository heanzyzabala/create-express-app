import * as convict from 'convict';
import * as convictFormatWithValidator from 'convict-format-with-validator';
import * as dotenv from 'dotenv';

dotenv.config();
convict.addFormats(convictFormatWithValidator);

const createConfig = () => {
	const config = convict({
		ENV: {
			env: 'NODE_ENV',
			format: String,
			default: 'dev',
		},
		PORT: {
			env: 'PORT',
			format: 'int',
			default: null,
		},
		DB_HOST: {
			env: 'DB_HOST',
			format: '*',
			default: null,
		},
		DB_NAME: {
			env: 'DB_NAME',
			format: '*',
			default: null,
		},
		DB_PORT: {
			env: 'DB_PORT',
			format: 'int',
			default: null,
		},
		DB_USER: {
			env: 'DB_USER',
			format: String,
			default: null,
		},
		DB_PASS: {
			env: 'DB_PASS',
			format: String,
			default: null,
		},
	});
	config.validate({ allowed: 'strict' });
	return config;
};

const config = createConfig();
export { config };
