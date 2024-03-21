import styled from "styled-components";
import InputComponent from "../input/InputComponent";
import { Group } from "../style";
import ButtonComponent from "../button/ButtonComponent";
import { useNavigate } from "react-router";

const Slice = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({gap}) => gap}px;
`
const EditProfile = ({status}) => {
    const redirect = useNavigate()
    return(
        <>
        <Group gap={26}>
            <InputComponent></InputComponent>
            <InputComponent></InputComponent>
            <Slice gap={20}>
                <ButtonComponent type={"save"}></ButtonComponent>
                <div onClick={() => redirect("/")}>
                    <ButtonComponent type={"logout"}></ButtonComponent>
                </div>
                
            </Slice>
            
        </Group>
           
        </>
    )
}
export default EditProfile;