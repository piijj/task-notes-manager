import { spawn } from 'child_process';

// Run vitest with JSON reporter
const vitest = spawn('npx', ['vitest', 'run', '--reporter=json'], {
	cwd: process.cwd(),
	stdio: ['inherit', 'pipe', 'pipe'],
});

let output = '';

vitest.stdout.on('data', (data) => {
	output += data.toString();
});

vitest.stderr.on('data', (data) => {
	// Ignore stderr
});

vitest.on('close', (code) => {
	try {
		const jsonMatch = output.match(/\{[\s\S]*\}/);
		if (!jsonMatch) {
			console.log('FS_SCORE:0%');
			process.exit(0);
		}

		const results = JSON.parse(jsonMatch[0]);

		let passed = 0;
		let total = 0;

		if (results.testResults) {
			for (const file of results.testResults) {
				for (const test of file.assertionResults || []) {
					total++;
					if (test.status === 'passed') {
						passed++;
					}
				}
			}
		}

		if (total === 0 && results.numTotalTests) {
			total = results.numTotalTests;
			passed = results.numPassedTests || 0;
		}

		const percent = total > 0 ? Math.round((passed / total) * 100) : 0;
		console.log(`FS_SCORE:${percent}%`);
		process.exit(0);
	} catch (error) {
		console.log('FS_SCORE:0%');
		process.exit(0);
	}
});

vitest.on('error', () => {
	console.log('FS_SCORE:0%');
	process.exit(0);
});
