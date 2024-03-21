import styled from "styled-components";
import InputComponent from "../input/InputComponent";
import { Group } from "../style";
import calendar from "../../assets/calendar.svg"
import ButtonComponent from "../button/ButtonComponent";

const TimeInterval = styled.div`
    width: 50%;
    color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`
const DataBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 11px;
`
const IconData = styled.img`
    
`
const Data = styled.div`
    font-size: 16px;
    color: #fff;
`

const AddTaskModal = () => {
    return(
        <>
        <Group gap={26}>
            <InputComponent></InputComponent>
            <TimeInterval>
                <InputComponent></InputComponent>
                -
                <InputComponent></InputComponent>
            </TimeInterval>
            <DataBox>
                <IconData src={calendar}></IconData>
                <Data>2 марта</Data>
            </DataBox>
            <div style={{width: "50%"}}>
                <ButtonComponent type={"save"}></ButtonComponent>
            </div>
        </Group>
           
        </>
    )
}
export default AddTaskModal;