import { useEffect } from 'react'
import styles from './ModalOverlay.module.css'

const ModalOverlay = ({ onClose }) => {
  const onKeyDown = (e) => {
    if (e.keyCode === 27) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div
      tabIndex={0}
      className={styles.overlay}
      onClick={onClose}>
    </div>
  )
}

export default ModalOverlay