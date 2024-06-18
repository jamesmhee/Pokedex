import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Notfound = () => {
    const navigate = useNavigate()

    useEffect(()=>{        
        setTimeout(()=>{
            navigate('/') 
        }, 5000)
    }, [])

    return (
        <div className='flex items-center justify-center w-screen h-screen'>
            <h2 className='text-4xl rubik bg-gradient-to-r from-rose-500 via-lime-400 to-yellow-500 text-transparent bg-clip-text'>404 - NOT FOUND PAGE</h2>
        </div>
    )
}

export default Notfound