import styled from "styled-components"
import close from "../../assets/close.svg"

export const ModalBox = styled.div`

    min-width: 100%;
    max-width: 340px;
    z-index: 10000;
    border-radius: 8px;
    background-color: #161616;
    padding: 30px;
    box-sizing: border-box;
`
export const ModalTitleBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
`
export const ModalTitle = styled.div`
    color: #fff;
    font-size: 14px;

`
export const ModalClosed = styled.img`
    width: 12px;
    height: 12px;
    &:hover{
        cursor: pointer;
        
        
    }
    > svg{
        fill: #fff;
        width: 32px;
        height: 32px;
    }
`
const Modal = ({children, clos, title}) => {
    return (
        <>
        <ModalBox>
            <ModalTitleBox>
                <ModalTitle>{title}</ModalTitle>
                <div onClick={clos}>
                    <ModalClosed src={close}></ModalClosed>  
                </div>
            </ModalTitleBox>
            {children}
        </ModalBox>
        </>
    )
}
export default Modal