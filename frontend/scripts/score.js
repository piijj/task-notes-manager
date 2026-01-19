import { spawn } from 'child_process';

// Run vitest with JSON reporter
const vitest = spawn('npx', ['vitest', 'run', '--reporter=json'], {
	cwd: process.cwd(),
	stdio: ['inherit', 'pipe', 'pipe'],
});

let output = '';
let errorOutput = '';

vitest.stdout.on('data', (data) => {
	output += data.toString();
});

vitest.stderr.on('data', (data) => {
	errorOutput += data.toString();
});

vitest.on('close', (code) => {
	try {
		// Parse JSON output from vitest
		const jsonMatch = output.match(/\{[\s\S]*\}/);
		if (!jsonMatch) {
			console.log('FS_SCORE: 0%');
			process.exit(0);
		}

		const results = JSON.parse(jsonMatch[0]);

		// Calculate passed and total tests
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

		// If no tests found in assertionResults, try numPassedTests/numTotalTests
		if (total === 0 && results.numTotalTests) {
			total = results.numTotalTests;
			passed = results.numPassedTests || 0;
		}

		const percent = total > 0 ? Math.round((passed / total) * 100) : 0;

		// Output in HackerRank required format
		console.log(`FS_SCORE: ${percent}%`);
		process.exit(0);
	} catch (error) {
		// Always output a score, even on error
		console.log('FS_SCORE: 0%');
		process.exit(0);
	}
});

// Handle process errors
vitest.on('error', () => {
	console.log('FS_SCORE: 0%');
	process.exit(0);
});
