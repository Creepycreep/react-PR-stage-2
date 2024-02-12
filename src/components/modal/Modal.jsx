import styles from './Modal.module.css'
import ModalOverlay from '../modalOverlay/ModalOverlay';

import { createPortal } from "react-dom"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"

const Modal = ({ children, setVisibility, title = '', isOverlay = true }) => {
  return (
    createPortal(
      <>
        <div className={`${styles.modal} p-10 pb-15`} >
          <div className={styles.modalHeader}>
            {title.length ? <h2 className="text text_type_main-large">{title}</h2> : null}

            <button onClick={() => setVisibility(false)} aria-label="Close">
              <CloseIcon type="primary" />
            </button>
          </div>

          <div className={styles.modalContent}>
            {children}
          </div>
        </div>

        {isOverlay ? <ModalOverlay onClick={setVisibility} onClose={() => setVisibility(false)} /> : null}
      </>

      , document.getElementById('modal'))
  )
}

export default Modal