import styled from "styled-components";
import plus from "../../assets/plus.svg";

export const InputBox = styled.div`
    width: 100%;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    display: flex;
    /* height: 40px; */
    box-sizing: border-box;
    padding: 11px 12px;
    background-color: rgba(217, 217, 217, 0.15);
    border-radius: 8px;
    border: 1px solid transparent; 
    &:hover {
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    &:has(input:focus) {
        /* outline: none;  */
        border: 1px solid #547CFB; 
    }
`;

export const Input = styled.input`
    all: unset;
    border: none;
    background: none;
    width: 100%;
    color: #fff;
   
`;

export const InputIcon = styled.img`
    min-height: 22px;
    min-width: 22px;
    &:hover{
        cursor: pointer;
    }
`;

const InputComponent = ({setIcon, handleSomeEvent}) => {
    return (
        <>
            <InputBox tabIndex="0">
                <Input onChange={handleSomeEvent}></Input>
                {setIcon && 
                    <InputIcon
                        src={plus}
                        onClick={() => console.log("plus")}
                    ></InputIcon>
                }
            </InputBox>
        </>
    );
};

export default InputComponent;
