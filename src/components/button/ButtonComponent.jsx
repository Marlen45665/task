import styled from "styled-components";
import save from "../../assets/save.svg"

const ButtonBox = styled.div`
    width: 100%;
    height: 40px;
    padding: 12px 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    gap: 11px;
    ${props => {
        switch (props.type) {
            case 'save':
                return `
                    background-color: #fff;
                    color: #000;
                    &:hover{
                        background-color: rgba(255, 255, 255, 0.8);
                    }
                `;
            case 'delete':
                return `
                    border: 1px solid #7A7A7A; 
                    background-color: none;
                    color: #7A7A7A;
                    &:hover{
                        border: 1px solid#fff;
                        color: #fff;
                    }
                `;
            case 'logout':
                return `
                border: 2px solid #7A7A7A; 
                    background-color: none;
                    color: #7A7A7A;
                    &:hover{
                        border: 1px solid#fff;
                        color: #fff;
                    }
                `;
            default:
                return ''; 
        }
    }}
    &:hover{
        cursor: pointer;
    }
`;

const ButtonIcon = styled.img`
    min-height: 16px;
    min-width: 16px;
`;

const ButtonText = styled.div`
    line-height: 16px;
    font-size: 14px;
`;

const text = (type) => {
    switch (type) {
        case 'save':
            return `Сохранить`;
        case 'delete':
            return `Удалить`;
        case 'logout':
            return `Выйти`;
        default:
            return ''; 
    }
}


const ButtonComponent = ({type, icon}) => {
    return (
        <ButtonBox type={type} >
            <ButtonIcon src={save} /> 
            <ButtonText>{text(type)}</ButtonText>
        </ButtonBox>
    );
};

export default ButtonComponent;
