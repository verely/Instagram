import close from '../assets/img/CreatePost/close.svg'

export function ModalCmp({onClose, children}) {
    return (
        <div className="modal-cmp">
          <div className="modal-cmp-content">
            <button className="close-modal-button" onClick={onClose}><img src={close} alt="closeImg" /></button>
            {children}
          </div>
        </div>
    )
}
