// src/components/ProfileIcon.js
import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const ProfileIcon = () => {
  return (
    <Link to='/profile'>
      <div className='profile-icon'>
        <FontAwesomeIcon icon={faUser} />
      </div>
    </Link>
  )
}

export default ProfileIcon
