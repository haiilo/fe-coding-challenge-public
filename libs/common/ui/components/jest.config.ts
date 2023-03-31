export default {
	coverageDirectory: '../../../../coverage/libs/common/ui/components',
	displayName: 'common-ui-components',
	preset: '../../../../jest.preset.js',
	setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
	snapshotSerializers: [
		'jest-preset-angular/build/serializers/html-comment',
		'jest-preset-angular/build/serializers/ng-snapshot',
		'jest-preset-angular/build/serializers/no-ng-attributes',
	],
	transform: {
		'^.+\\.(ts|mjs|js|html)$': [
			'jest-preset-angular',
			{
				stringifyContentPathRegex: '\\.(html|svg)$',
				tsconfig: '<rootDir>/tsconfig.spec.json',
			},
		],
	},
	transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};
