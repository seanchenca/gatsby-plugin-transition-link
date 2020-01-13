import React from 'react'
import TransitionLink from '../'
import { TimelineMax } from 'gsap'

const fade = ({ exit: { length }, node, direction }) => {
	const duration = direction === 'out' ? length + length / 4 : length
	const opacity = direction === 'in' ? 1 : 0
	const scrollTop =
		(document.scrollingElement && document.scrollingElement.scrollTop) ||
		document.body.scrollTop ||
		window.pageYOffset

	const holdPosition =
		direction === 'out'
			? {
					overflowY: 'hidden',
					height: '100vh',
					scrollTop: scrollTop,
			  }
			: {}

	return new TimelineMax()
		.set(node, holdPosition)
		.fromTo(node, duration, { opacity: !opacity }, { opacity: opacity })
}

export default function Fade({
	exit,
	entry,
	fade: removedProp,
	duration,
	...props
}) {
	const length = duration || 0.8

	return (
		<TransitionLink
			exit={{
				length: length,
				zIndex: exit.zIndex || 'unset',
				trigger: ({ exit, node }) =>
					fade({ exit, node, direction: 'out' }),
			}}
			entry={{
				length: length,
				zIndex: entry.zIndex || 'unset',
				trigger: ({ exit, node }) =>
					fade({ exit, node, direction: 'in' }),
			}}
			{...props}>
			{props.children}
		</TransitionLink>
	)
}
