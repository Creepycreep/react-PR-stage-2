import styles from './Modal.module.css'
import ModalOverlay from '../modalOverlay/ModalOverlay';

import { createPortal } from "react-dom"
import { useEffect, useState } from 'react';

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"

const Modal = ({ children, isOverlay = true }) => {
  const [visibility, setVisibility] = useState(true);

  const onClose = (e) => {
    console.log('object');
    if (e.keyCode === 27) {
      setVisibility(false)
    }
  }

  return (
    createPortal(
      <>
        <div className={`${styles.modal} ${visibility ? styles.isVisible : ''} p-10`} >
          <div className={styles.modalHeader}>
            <h2 className="text text_type_main-large">Детали ингредиента</h2>

            <button onClick={() => setVisibility(false)}>
              <CloseIcon type="primary" />
            </button>
          </div>

          <div className={styles.modalContent}>
            {children}
          </div>
        </div>

        {isOverlay && visibility ? <ModalOverlay onClick={onClose} /> : null}
      </>

      , document.getElementById('modal'))
  )
}

export default Modal