import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Navbar from '../components/Home/Navbar'
import Trusted from '../components/Home/Trusted'
import Category from '../components/Home/Category'
import Footer from '../components/Home/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [searchKey, setSearchKey] = useState('')
 
  const { authModal } = useSelector((state) => state.ui)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchKey) {
      navigate(`/jobs?searchKey=${searchKey}`)
    }
  }

  return (
    <div className={`${authModal && 'h-screen overflow-hidden'}`}>
      <Navbar />
      <header className='h-screen relative bg-[#35c8fb] flex justify-center items-center overflow-hidden'>
        
        <div className='flex flex-col items-center max-w-xl md:max-w-3xl z-10 text-center'>
          <h1 className='text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-8 select-none'>
            Find a Job in a{' '}
            <span className='text-[#312ECB]'>World Leading</span> Company.
          </h1>
          <p className=' md:text-lg font-medium text-[white] max-w-lg mb-16 select-none'>
            We Help you to find the best job to build your future and build a
            better future of digital era.
          </p>
          <form className='flex items-center py-1 pl-3 pr-1 bg-white rounded-lg md:w-1/2 gap-x-2'>
            <FaSearch className='text-2xl text-[#9CA3AF]' />
            <input
              type='text'
              className='placeholder:italic rounded-lg w-full py-2 px-1 font-[Poppins] text-sm !outline-hidden !border-hidden !ring-0'
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder='Job title or keyword . . .'
            />
            <button
              type='submit'
              className='px-6 py-2 font-medium rounded-md bg-blue-700 text-white'
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
        </div>
      </header>
      <Trusted />
      <Category />
      <Footer />
      
    </div>
  )
}

export default Home
