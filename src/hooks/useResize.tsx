import { useState, useRef, useCallback, useEffect } from 'react'

export const useResize = (myRef:any) => {
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    
    const handleResize = useCallback(() => {
        setWidth(myRef.current.offsetWidth)
        setHeight(myRef.current.offsetHeight)
    }, [myRef])
  
    useEffect(() => {
      window.addEventListener('load', handleResize)
      window.addEventListener('resize', handleResize)
  
      return () => {
        window.removeEventListener('load', handleResize)
        window.removeEventListener('resize', handleResize)
      }
    }, [myRef, handleResize])
  
    return { width, height }
  }