import styled from "styled-components";
import InputComponent from "../input/InputComponent";
import { Group } from "../style";
import ButtonComponent from "../button/ButtonComponent";

const Slice = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({gap}) => gap}px;
`
const EditProfile = ({status}) => {
    
    return(
        <>
        <Group gap={26}>
            <InputComponent></InputComponent>
            <InputComponent></InputComponent>
            <Slice gap={20}>
                <ButtonComponent type={"save"}></ButtonComponent>
                <ButtonComponent type={"logout"}></ButtonComponent>
            </Slice>
            
        </Group>
           
        </>
    )
}
export default EditProfile;