import React from 'react'

const CourseCard = ({ title, description, videoUrl, isUnlocked }) => {
  const cardStyles = {
    border: isUnlocked ? '2px solid #4CAF50' : '2px solid #ccc',
    opacity: isUnlocked ? 1 : 0.5,
    pointerEvents: isUnlocked ? 'auto' : 'none',
  }

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg' style={cardStyles}>
      <h3 className='text-xl font-semibold mb-2'>{title}</h3>
      <p className='text-gray-600 mb-4'>{description}</p>
      {isUnlocked ? (
        // Render video if unlocked
        <iframe
          title={title}
          width='100%'
          height='315'
          src={videoUrl}
          frameBorder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      ) : (
        // Render locked message if not unlocked
        <p className='text-red-500'>
          This video is locked. Subscribe to unlock!
        </p>
      )}
    </div>
  )
}

export default CourseCard
