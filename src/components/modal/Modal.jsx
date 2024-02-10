import styles from './Modal.module.css'

import { createPortal } from "react-dom"
import { useState } from 'react';

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"

const Modal = ({ children }) => {
  const [visibility, setVisibility] = useState(true);

  return (
    createPortal(
      <div className={styles.modal + ' p-10'} style={visibility ? { display: 'flex' } : { display: 'none' }}>
        <div className={styles.modalHeader}>
          <h2 className="text text_type_main-large">Детали ингредиента</h2>

          <button onClick={() => setVisibility(false)}>
            <CloseIcon type="primary" />
          </button>
        </div>

        <div className={styles.modalContent}>

        </div>
      </div>
      , document.getElementById('modal'))
  )
}

export default Modal