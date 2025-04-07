import React from 'react'

function toHex(rgbValue: any) {
	const rgbPattern = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/

	const rgbValueIsValid = rgbPattern.test(rgbValue)

	if (!rgbValue || !rgbValueIsValid) return null

	rgbValue = rgbValue.replace(/rgba?\s*\(\s*|\s*\)/g, '')

	const [r, g, b] = rgbValue.split(',').map(Number)

	return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export default toHex
