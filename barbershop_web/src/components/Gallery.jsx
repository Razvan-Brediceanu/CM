import React from 'react'

const Gallery = () => {
  return (
    <div id="gallery" className="max-w-[1140px] m-auto w-full p-4 py-16">
      <h2 className="text-center text-gray-700 p-4 text-2xl">Galerie</h2>
      <div className="grid sm:grid-cols-5 gap-4">
        <div className="sm:col-span-3 col-span-2 row-span-2">
          <img className="w-full h-full object-cover transform hover:scale-95 hover:shadow-md transition-transform duration-300 ease-in-out w-full h-full object-cover"  src="https://images.unsplash.com/photo-1514178320695-089eff7b8aa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80" alt="/" />
        </div>
        <div>
          <img className="w-full h-full object-cover transform hover:scale-95 hover:shadow-md transition-transform duration-300 ease-in-out w-full h-full object-cover" src="https://images.unsplash.com/photo-1514178320695-089eff7b8aa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80" alt="/" />
        </div>
        <div>
          <img className="w-full h-full object-cover transform hover:scale-95 hover:shadow-md transition-transform duration-300 ease-in-out w-full h-full object-cover" src="https://images.unsplash.com/photo-1514178320695-089eff7b8aa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80" alt="/" />
        </div>
        <div>
          <img className="w-full h-full object-cover transform hover:scale-95 hover:shadow-md transition-transform duration-300 ease-in-out w-full h-full object-cover" src="https://images.unsplash.com/photo-1514178320695-089eff7b8aa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80" alt="/" />
        </div>
        <div>
          <img className="w-full h-full object-cover transform hover:scale-95 hover:shadow-md transition-transform duration-300 ease-in-out w-full h-full object-cover" src="https://images.unsplash.com/photo-1514178320695-089eff7b8aa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80" alt="/" />
        </div>
      </div>
    </div>
  )
}

export default Gallery