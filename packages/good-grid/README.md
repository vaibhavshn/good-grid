<p align="center">
  <img src="https://raw.githubusercontent.com/vaibhavshn/good-grid/HEAD/.github/logo.svg" />
</p>

<p align="center">
  A zero-dependency and lightweight library to make responsive grids of videos/photos/anything.
</p>

---

## Installation

```sh
npm install good-grid
```

## Usage

Here's a minimal example of the API usage in React:

```jsx
import { createGrid } from 'good-grid'
import { useGridDimensions } from 'good-grid/react'

function App() {
	const $el = useRef()

	// hook that listens to resize of the element
	// and returns it's dimensions
	const dimensions = useGridDimensions($el)

	const { width, height, getPosition } = createGrid({
		dimensions,
		count: participants.length,
		aspectRatio: '16:9',
		gap: 10,
	})

	return (
		<div className="container" ref={$el}>
			{participants.map((participant, index) => {
				const { top, left } = getPosition(index)

				return (
					<div
						className="grid-item"
						style={{
							width,
							height,
							top,
							left,
							position: 'absolute',
							transition: '0.4s all',
						}}
						key={participant.name}
					>
						{participant.name}
					</div>
				)
			})}
		</div>
	)
}
```
