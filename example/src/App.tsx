import { useCallback, useRef, useState } from 'react'
import clsx from 'clsx'
import { useGoodGrid, useGridDimensions } from 'good-grid/react'
import { Analytics } from '@vercel/analytics/react'

function getRandomColor() {
	const hue = Math.floor(Math.random() * 360)
	return `hsl(${hue} 60% 60%)`
}

function getRandomGradient() {
	return `linear-gradient(to bottom right, ${getRandomColor()}, ${getRandomColor()})`
}

const ASPECT_RATIOS = ['16:9', '4:3', '2:3', '2:1']
const GAP_UNIT = 4

const DEFAULT_PARTICIPANTS = [{ name: 'You', color: getRandomGradient() }]
const DEFAULT_ASPECT_RATIO = '16:9'
const DEFAULT_GAP = GAP_UNIT * 2

for (let i = 0; i < 5 - 1; i++) {
	DEFAULT_PARTICIPANTS.push({
		name: 'User ' + (i + 1),
		color: getRandomGradient(),
	})
}

export default function App() {
	const $grid = useRef<HTMLDivElement>(null)
	const dimensions = useGridDimensions($grid)

	const [participants, setParticipants] = useState(DEFAULT_PARTICIPANTS)
	const [aspectRatio, setAspectRatio] = useState(DEFAULT_ASPECT_RATIO)
	const [gap, setGap] = useState(DEFAULT_GAP)

	const { width, height, getPosition } = useGoodGrid({
		dimensions,
		count: participants.length,
		aspectRatio,
		gap,
	})

	const onAdd = useCallback(() => {
		setParticipants((p) => [
			...p,
			{
				name: 'User ' + p.length,
				color: getRandomGradient(),
			},
		])
	}, [])

	const onRemove = useCallback(() => {
		setParticipants((p) => (p.length > 1 ? p.slice(0, -1) : p))
	}, [])

	const onIncrementGap = useCallback(() => {
		setGap((g) => g + GAP_UNIT)
	}, [])

	const onDecrementGap = useCallback(() => {
		setGap((g) => (g > 0 ? g - GAP_UNIT : g))
	}, [])

	return (
		<div className="flex h-full w-full flex-col">
			{import.meta.env.PROD && <Analytics />}

			<header className="flex flex-col items-center justify-center gap-4 bg-white px-4 py-3 pb-1 md:py-6 md:pb-2">
				<h1 className="text-gradient text-center text-3xl font-black tracking-tight">good-grid</h1>
				<p className="max-w-lg text-center text-sm text-zinc-600">
					Easily implement a responsive grid of videos/photos/anything.
				</p>
			</header>

			<div className="flex select-none flex-col items-center justify-center divide-y divide-zinc-200 border-b bg-white px-4 pb-2 md:flex-row md:divide-x md:divide-y-0">
				<div className="flex flex-col items-center gap-1 p-4 py-2 lg:py-4">
					<h2 className="text-xs text-zinc-500">Participants</h2>

					<div className="flex items-center gap-2 font-semibold text-purple-600">
						<button
							onClick={onRemove}
							className="h-8 w-8 rounded-md border border-purple-600 text-xl hover:bg-purple-200"
							aria-label="Remove last participant"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="h-4 w-4"
							>
								<path d="M10.375 2.25a4.125 4.125 0 100 8.25 4.125 4.125 0 000-8.25zM10.375 12a7.125 7.125 0 00-7.124 7.247.75.75 0 00.363.63 13.067 13.067 0 006.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 00.364-.63l.001-.12v-.002A7.125 7.125 0 0010.375 12zM16 9.75a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6z" />
							</svg>
						</button>

						<div
							className="tabular-nums"
							aria-label={`Currently participant count is ${participants.length}`}
							tabIndex={0}
						>
							{participants.length}
						</div>

						<button
							onClick={onAdd}
							className="h-8 w-8 rounded-md border border-purple-600 text-xl hover:bg-purple-200"
							aria-label="Add a participant"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="h-4 w-4"
							>
								<path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
							</svg>
						</button>
					</div>
				</div>

				<div className="flex flex-col items-center gap-1 p-4 py-2 lg:py-4">
					<h2 className="text-xs text-zinc-500">Aspect Ratio</h2>

					<div className="flex items-center gap-1.5 text-pink-600" role="tablist">
						{ASPECT_RATIOS.map((ratio) => (
							<button
								onClick={() => setAspectRatio(ratio)}
								className={clsx(
									'h-8 rounded-md border border-pink-600 px-2',
									aspectRatio === ratio ? 'bg-pink-600 text-white' : 'hover:bg-pink-100'
								)}
								key={ratio}
								aria-label={`Set aspect ratio to ${ratio}`}
								role="tab"
								aria-selected={true}
							>
								{ratio}
							</button>
						))}
					</div>
				</div>

				<div className="flex flex-col items-center gap-1 p-4 py-2 lg:py-4">
					<h2 className="text-xs text-zinc-500">Gap</h2>

					<div className="flex items-center gap-2 text-teal-600">
						<button
							className="h-8 rounded-md border border-teal-600 px-2 hover:bg-teal-100"
							onClick={onDecrementGap}
							aria-label={`Decrement gap by ${GAP_UNIT}`}
						>
							{`-${GAP_UNIT}`}
						</button>
						<div aria-label={`Current gap is ${gap} pixels`} tabIndex={0}>
							<span className="font-black tabular-nums">{gap}</span>
							px
						</div>
						<button
							className="h-8 rounded-md border border-teal-600 px-2 hover:bg-teal-100"
							onClick={onIncrementGap}
							aria-label={`Increment gap by ${GAP_UNIT}`}
						>
							{`+${GAP_UNIT}`}
						</button>
					</div>
				</div>
			</div>

			{/* The actual grid */}
			<div className="group relative z-10 flex-grow overflow-hidden bg-zinc-100" ref={$grid}>
				{participants.map((participant, index) => {
					const { top, left } = getPosition(index)

					return (
						<div
							style={{
								position: 'absolute',
								width,
								height,
								top,
								left,
								background: participant.color,
							}}
							className={clsx(
								'relative flex place-items-center justify-center rounded-2xl shadow-xl',
								// limit transition only upto 50 participants as it becomes laggy
								participants.length < 50 && 'transition-all'
							)}
							key={participant.name}
						>
							<div
								className={clsx(
									'text-white lg:text-3xl',
									participants.length > 14 ? 'text-sm' : 'md:text-xl'
								)}
							>
								{participant.name}
							</div>
							<span className="absolute bottom-1.5 right-1.5 text-sm text-white/40 lg:bottom-3 lg:right-3 lg:text-xl">
								{aspectRatio}
							</span>
						</div>
					)
				})}
			</div>
		</div>
	)
}
