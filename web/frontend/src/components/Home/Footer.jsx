import React from 'react'
import Logo from '../../assets/Logo.webp'


const Footer = () => {
  return (
    <footer className='bg-black/90'>
      <div className='max-w-screen-xl px-4 pt-16 pb-6 mx-auto sm:px-6 lg:px-8 lg:pt-24'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          <div>
            <div
              className='flex items-center justify-center sm:justify-start
             gap-x-2 cursor-pointer'
            >
              <img src={Logo} alt='website-logo' />
              <h1 className='text-2xl font-medium text-white font-[Domine]'>
                Smart-rec
              </h1>
            </div>

            <p className='max-w-md mx-auto mt-6 leading-relaxed text-center text-gray-400 sm:max-w-xs sm:mx-0 sm:text-left'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
              consequuntur amet culpa cum itaque neque.
            </p>

            
          </div>

          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 md:grid-cols-3'>
            <div className='text-center sm:text-left'>
              <p className='text-lg font-medium text-white'>About Us</p>

              <nav className='mt-8'>
                <ul className='space-y-4 text-sm'>
                  <li>
                    <a
                      className='text-white transition hover:text-white/75'
                      href='/'
                    >
                      Company History
                    </a>
                  </li>

                  <li>
                    <a
                      className='text-white transition hover:text-white/75'
                      href='/'
                    >
                      Meet the Team
                    </a>
                  </li>

                  <li>
                    <a
                      className='text-white transition hover:text-white/75'
                      href='/'
                    >
                      Employee Handbook
                    </a>
                  </li>

                  <li>
                    <a
                      className='text-white transition hover:text-white/75'
                      href='/'
                    >
                      Careers
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className='text-center sm:text-left'>
              <p className='text-lg font-medium text-white'>Our Services</p>

              <nav className='mt-8'>
                <ul className='space-y-4 text-sm'>
                  <li>
                    <a
                      className='text-white transition hover:text-white/75'
                      href='/'
                    >
                      Web Development
                    </a>
                  </li>

                  <li>
                    <a
                      className='text-white transition hover:text-white/75'
                      href='/'
                    >
                      Web Design
                    </a>
                  </li>

                  <li>
                    <a
                      className='text-white transition hover:text-white/75'
                      href='/'
                    >
                      Marketing
                    </a>
                  </li>

                  <li>
                    <a
                      className='text-white transition hover:text-white/75'
                      href='/'
                    >
                      Google Ads
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className='text-center sm:text-left'>
              <p className='text-lg font-medium text-white'>Contact Us</p>

              
            </div>
          </div>
        </div>

        <div className='pt-6 mt-12 border-t border-gray-800'>
          <div className='text-center sm:flex sm:justify-between sm:text-left'>
            <p className='text-sm text-gray-400'>
              <span className='block sm:inline'>All rights reserved.</span>

              <a
                className='inline-block text-white underline transition hover:text-white/75'
                href='/'
              >
                Terms & Conditions
              </a>

              <span>&middot;</span>

              <a
                className='inline-block text-white underline transition hover:text-white/75'
                href='/'
              >
                Privacy Policy
              </a>
            </p>

            <p className='mt-4 text-sm text-gray-500 sm:order-first sm:mt-0'>
              &copy; 2023 Smart-rec
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
