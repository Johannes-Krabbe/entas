import React, { useRef, useState, useEffect } from 'react'
import AnimateHeight, { Height } from 'react-animate-height'

interface AutoHeightProps {
    children: React.ReactNode
    duration?: number
}

const AutoHeight = ({ children, ...props }: AutoHeightProps) => {
    const [height, setHeight] = useState<Height>('auto')
    const contentDiv = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const element = contentDiv.current as HTMLDivElement

        const resizeObserver = new ResizeObserver(() => {
            setHeight(element.clientHeight)
        })

        resizeObserver.observe(element)

        return () => resizeObserver.disconnect()
    }, [])

    return (
        <div>
            <AnimateHeight
                {...props}
                height={height}
                contentClassName="auto-content"
                contentRef={contentDiv}
                disableDisplayNone
            >
                {children}
            </AnimateHeight>
        </div>
    )
}

export default AutoHeight
