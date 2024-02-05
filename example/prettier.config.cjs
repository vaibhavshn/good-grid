const rules = require('../package.json').prettier

module.exports = {
	...rules,
	plugins: [require('prettier-plugin-tailwindcss')],
}
