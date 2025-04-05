import { useEffect } from "react"

const Blogs = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  
  }, [])
  

  return (
    <div className='h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100'>Blogs</div>
  )
}

export default Blogs