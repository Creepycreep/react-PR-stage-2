import styles from './ModalOverlay.module.css'

const ModalOverlay = ({ onClose, onKeyClose }) => {
  return (
    <div
      tabIndex={0}
      className={styles.overlay}
      onKeyDown={onKeyClose}
      onClick={onClose}>
    </div>
  )
}

export default ModalOverlay