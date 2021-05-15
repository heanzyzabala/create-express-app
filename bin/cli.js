#! /usr/bin/env node

const { spawn } = require('child_process');

const name = process.argv[2] || 'myapi';
// prettier-ignore
exec('git', ['clone', 'https://github.com/heanzyzabala/create-express-api', name])
  .then(() => {
		return exec('rm', ['-rf', `${name}/.git`])
  })
	.then(() => {
		return exec('rm', ['-rf', `${name}/bin`])
	})
	.then(() => {
		return exec('npm', ['install'], { cwd: `${process.cwd()}/${name}`})
	})
	.then(() => {
		console.info('Done! 🎉');
		console.info('https://github.com/heanzyzabala/create-express-api');
	})

function exec(cmd, args, opts) {
	const s = spawn(cmd, args, opts);
	return new Promise((resolve) => {
		s.stdout.on('data', (data) => console.log(data.toString()));
		s.stderr.on('data', (data) => console.error(data.toString()));
		s.on('close', () => resolve());
	});
}
