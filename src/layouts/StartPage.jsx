import React, { useState } from 'react'
import HeaderStart from '../startComponents/HeaderStart'
import HeroStart from '../startComponents/HeroStart'
import UserAuth from './UserAuth';
import UserAuthModal from './UserAuthModal';
const StartPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
        <HeaderStart openModal={openModal}/>

        <HeroStart/>

        {isModalOpen && (
        <UserAuthModal onClose={closeModal}>
          <UserAuth />
        </UserAuthModal>
      )}


    </>
  )
}

export default StartPage