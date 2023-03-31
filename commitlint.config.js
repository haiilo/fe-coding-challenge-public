module.exports = {
	extends: ['@commitlint/config-conventional'],
	prompt: {
		maxSubjectLength: 80,
		messages: {
			body: 'Write a longer description of the change (optional). Use "|" to break new line.\n',
			confirmCommit: 'Proceed with commit? (Y)es, (N)o, (E)dit message, (H)elp',
			footer:
				'Provide any helpful links. Task links are mandatory. Use "|" to break new line.\n',
			subject:
				'Write a short description of the change w\\ task id (if applicable). e.g. "TASK-1234 - Add login"\n',
			type: "Select the type of change that you're committing.",
		},
		minSubjectLength: 1,
		skipQuestions: ['breaking', 'footerPrefix', 'scope'],
		types: [
			{
				emoji: '✨',
				name: '✨ feat:     A new feature',
				value: 'feat',
			},
			{
				emoji: '🐛',
				name: '🐛 fix:      A bug fix',
				value: 'fix',
			},
			{
				emoji: '📝',
				name: '📝 docs:     Documentation only changes',
				value: 'docs',
			},
			{
				emoji: '🎨',
				name: '🎨 style:    Changes that do not affect the meaning of the code',
				value: 'style',
			},
			{
				emoji: '♻️',
				name: '♻️  refactor: A code change that neither fixes a bug nor adds a feature',
				value: 'refactor',
			},
			{
				emoji: '🚀',
				name: '🚀 perf:     A code change that improves performance',
				value: 'perf',
			},
			{
				emoji: '✅',
				name: '✅ test:     Adding missing tests or correcting existing tests',
				value: 'test',
			},
			{
				emoji: '📦',
				name: '📦 build:    Changes that affect the build system or external dependencies',
				value: 'build',
			},
			{
				emoji: '🎡',
				name: '🎡 ci:       Changes to our CI configuration files and scripts',
				value: 'ci',
			},
			{
				emoji: '🔨',
				name: "🔨 chore:    Other changes that don't modify src or test files",
				value: 'chore',
			},
			{
				emoji: '⏪',
				name: '⏪ revert:   Reverts a previous commit',
				value: 'revert',
			},
		],
		upperCaseSubject: true,
		useEmoji: true,
	},
};
