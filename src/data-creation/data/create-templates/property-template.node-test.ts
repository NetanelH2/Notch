import assert from 'node:assert/strict'
import test from 'node:test'

import {createAProperty} from './property-template.ts'

test('createAProperty uses generic starter-kit defaults', () => {
	const property = createAProperty()

	assert.match(property.name, /^starter-kit-property-\d+$/)
	assert.equal(
		property.urlSetConfiguration.discoveryConfiguration.seeds[0]?.url,
		'https://example.com',
	)
	assert.deepEqual(
		property.urlSetConfiguration.discoveryConfiguration.urlPatternFilter
			.allowed,
		['https://example.com'],
	)
})
