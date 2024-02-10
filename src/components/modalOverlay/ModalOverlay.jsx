import styles from './ModalOverlay.module.css'

const ModalOverlay = ({ onClick }) => {
  return (
    <div
      tabIndex={0}
      className={styles.overlay}
      onKeyDown={onClick}></div>
  )
}

export default ModalOverlay