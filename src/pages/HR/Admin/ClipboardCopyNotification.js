import React from 'react'
import { FcCheckmark } from 'react-icons/fc'

function ClipboardCopyNotification() {
  return (
    <>
      <div className='clipboard-notification-div'>
        <p>Copied! <FcCheckmark className='clipboard-notification-icon'/></p>
      </div>
    </>
  )
}

export default ClipboardCopyNotification