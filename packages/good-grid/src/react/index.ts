import { RefObject, useEffect, useState } from 'react'

/**
 * A React hook to calculate dimensions of an element.
 * @param $el An element ref
 * @returns Dimensions of the element
 */
export function useGridDimensions($el: RefObject<HTMLElement>) {
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

	useEffect(() => {
		if (!$el.current) {
			throw new Error('good-grid: Element reference not set.')
		}

		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { clientWidth: width, clientHeight: height } = entry.target
				setDimensions({ width, height })
			}
		})

		observer.observe($el.current!)

		return () => {
			observer.disconnect()
		}
	}, [])

	return dimensions
}
