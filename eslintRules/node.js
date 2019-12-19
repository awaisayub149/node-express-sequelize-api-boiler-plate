module.exports = {
	env: {
		node: true
	},

	rules: {
		// enforce return after a callback
		'callback-return': 'off',

		// require all requires be top-level
		// https://eslint.org/docs/rules/global-require
		'global-require': 'off',

		// enforces error handling in callbacks (node environment)
		'handle-callback-err': 'off',

		// disallow use of the Buffer() constructor
		// https://eslint.org/docs/rules/no-buffer-constructor
		'no-buffer-constructor': 'error',

		// disallow use of new operator with the require function
		'no-new-require': 'error',

		// disallow process.exit()
		'no-process-exit': 'error',

		// restrict usage of specified node modules
		'no-restricted-modules': 'off',
	}
};
