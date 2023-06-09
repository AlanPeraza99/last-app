import Modal from 'react-modal'
import { ModalProps } from '../interfaces/ModalProps'
const ModalTemplate:React.FC <ModalProps>=({
  content,
  openModal,
  setOpenModal,
  width,
  height,
}) => {
  return (
    <Modal
      isOpen={openModal}
      onRequestClose={() => setOpenModal({value: false})}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          width: width?width:'30%',
          height: height?height:'50%',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)'
        },
        overlay: {
          background: 'rgba(0, 0, 0, 0.7)'
        }
      }}
      contentLabel='Example Modal'
    >
      {content}
    </Modal>
  )
}

export default ModalTemplate
