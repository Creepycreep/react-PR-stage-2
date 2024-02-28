import styles from './Modal.module.css'
import ModalOverlay from '../modalOverlay/ModalOverlay';

import { createPortal } from "react-dom"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"

const Modal = ({ children, setVisibility, title = '', isOverlay = true }: { children: React.ReactNode, setVisibility: React.Dispatch<React.SetStateAction<boolean>>, title?: string, isOverlay?: boolean }) => {

  const portal = document.getElementById('modal')

  return (
    portal ?
      createPortal(
        <>
          <div className={`${styles.modal} p-10 pb-15`} >
            <div className={styles.modalHeader}>
              {title.length && <h2 className="text text_type_main-large">{title}</h2>}

              <button onClick={() => setVisibility(false)} aria-label="Close">
                <CloseIcon type="primary" />
              </button>
            </div>

            <div className={styles.modalContent}>
              {children}
            </div>
          </div>

          {isOverlay && <ModalOverlay onClose={() => setVisibility(false)} />}
        </>

        , portal)
      : null
  )
}

export default Modal