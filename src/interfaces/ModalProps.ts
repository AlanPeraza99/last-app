export interface ModalProps{
    content:any,
    openModal:boolean,
    setOpenModal: (openModal: { value: boolean }) => void;
    width?:string,
    height?:string,
}