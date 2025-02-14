<p align="center">
  <img src="https://raw.githubusercontent.com/vaibhavshn/good-grid/HEAD/.github/logo.svg" aria-label="Good Grid Logo" />
</p>

<p align="center">
  A zero-dependency, lightweight and performant library to make responsive grids of videos/photos/anything.
</p>

<p align="center">
  <a href="https://good-grid.vercel.app">View Demo</a> &bull; <a href="https://vaibhavshn.in/blog/making-good-grid">Blog Post</a>
</p>

---

## Installation

```sh
npm install good-grid
```

## Usage

Here is how you can use the core APIs to size and position the grid elements:

```js
// get dimensions of the parent element and pass it to `createGrid`
const { width, height, getPosition } = createGrid({
  dimensions,
  count: participants.length,
  aspectRatio: '16:9',
  gap: 10,
})

const elements = document.querySelectorAll('.participant-tile')

elements.forEach((element, index) => {
  // get position of element at the specified index
  const { top, left } = getPosition(index)

  element.style.width = width
  element.style.height = height
  element.style.top = top
  element.style.left = left
})
```

### React

A minimal example of the API usage in React.

```jsx
import { useGridDimensions, useGoodGrid } from 'good-grid/react'

function App() {
  const $el = useRef()

  // hook that listens to resize of the element
  // and returns it's dimensions
  const dimensions = useGridDimensions($el)

  const { width, height, getPosition } = useGoodGrid({
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
