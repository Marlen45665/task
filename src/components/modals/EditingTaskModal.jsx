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
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 11px;
`
const IconData = styled.img`
    
`
const Data = styled.div`
    font-size: 16px;
    color: #fff;
`
const Slice = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({gap}) => gap}px;
`
const CurrTime = styled.div`
    width: 100%;
    font-size: 16px;
    color: #547CFB;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const EditingTaskModal = ({status}) => {
    
    return(
        <>
        <Group gap={26}>
            <InputComponent></InputComponent>
            {status && 
                <>
                    <TimeInterval>
                        <InputComponent></InputComponent>
                        -
                        <InputComponent></InputComponent>
                    </TimeInterval>
                
                    <Slice gap={0}>
                        <DataBox>
                            <IconData src={calendar}></IconData>
                            <Data>2 марта</Data>
                        </DataBox>
                        <CurrTime>1 ч 15 м</CurrTime>
                    </Slice>
                </>
            }
            <Slice gap={20}>
                <ButtonComponent type={"save"}></ButtonComponent>
                <ButtonComponent type={"delete"}></ButtonComponent>
            </Slice>
            
        </Group>
           
        </>
    )
}
export default EditingTaskModal;