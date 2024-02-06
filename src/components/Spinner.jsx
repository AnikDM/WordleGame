import { CircularProgress } from '@mui/material'

const Spinner = () => {
  return (
    <div className='w-full absolute top-0 left-0 h-screen z-10 bg-slate-50 flex justify-center items-center'><CircularProgress color="inherit" /></div>
  )
}

export default Spinner