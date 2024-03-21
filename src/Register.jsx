import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import { InputBox } from './components/input/InputComponent';
import { Input } from './components/input/InputComponent';
import { InputIcon } from './components/input/InputComponent';
import plus from "./assets/plus.svg";
import play from "./assets/play.svg";
import pause from "./assets/pause.svg";
import { Group } from './components/style';
import EditingTaskModal from './components/modals/EditingTaskModal';
import Popup from 'reactjs-popup';
import AddTaskModal from './components/modals/AddTaskModal';
import toast, { Toaster } from 'react-hot-toast';
import { ModalBox, ModalTitleBox, ModalTitle, ModalClosed } from './components/modals/Modal';
import closed from "./assets/close.svg"


const List = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    &:hover{
        background-color: rgba(255, 255, 255, 0.08);
    }
`
const Title = styled.div`
    color: #fff;
    font-size: 20px;
`
const CurTime = styled.div`
    font-size: 16px;
    color: #547CFB;
`

const formatData = (timestamp) =>{
    if(timestamp == ""){
        return ""
    } else {
        const date = new Date(timestamp * 1000); 
        const hours = date.getHours().toString().padStart(2, '0'); 
        const minutes = date.getMinutes().toString().padStart(2, '0'); 
        return `${hours}:${minutes}`;
    }
}

function time(startTime, endTime) {
    const start = startTime.split(':').map(Number);
    const end = endTime.split(':').map(Number);
    const startMinutes = start[0] * 60 + start[1];
    const endMinutes = end[0] * 60 + end[1];
    let difference = endMinutes - startMinutes;
    if (Math.abs(difference) < 60) {
        return Math.abs(difference) + ' м';
    }
    const hours = Math.floor(difference / 60);
    const minutes = Math.abs(difference) % 60;
    const result = hours + ' ч ' + minutes + ' м';
    return result;
}

function ference(startTime) {
    const start = startTime.split(':').map(Number); 
    const now = new Date(); 
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const startMinutes = start[0] * 60 + start[1];
    const currentMinutes = currentHour * 60 + currentMinute;
    const difference = currentMinutes - startMinutes;
    if (Math.abs(difference) < 1) {
        return true;
    }
    return false;
}

function Register() {
    const [tasks, setTasks] = useState([]);
    const [active, setActive] = useState(false)
    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        fetch(`https://ansaratracker.ru/newapi/Task?token=${document.cookie}`)
            .then(response => response.json())
            .then(res => setTasks(res));
    }, []);

    async function addTask(data){
        if(data.newTask == ""){
            return
        }
        setValue("newTask", "")
        await fetch('https://ansaratracker.ru/newapi/createTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "token": document.cookie,
                "task": data.newTask,
                "started": false
            })
        })
        await fetch(`https://ansaratracker.ru/newapi/Task?token=${document.cookie}`)
            .then(response => response.json())
            .then(res => setTasks(res));
    };

    async function autoAddTask(data){
        if(data.newTask == ""){
            return
        }
        if(active){
            toast('Сначала завершите текущую задачу', {duration: 2000});
            return
        } 
        setActive(true)
        setValue("newTask", "")
        await fetch('https://ansaratracker.ru/newapi/createTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "token": document.cookie,
                "task": data.newTask,
                "started": true
            })
        })

        await fetch(`https://ansaratracker.ru/newapi/Task?token=${document.cookie}`)
            .then(response => response.json())
            .then(res => {
                setTasks(res)
            });
    };

    async function startTask(id) {
        if(active){
            toast('Сначала завершите текущую задачу',  {duration: 2000});
            return
        } 
        setActive(true)
        await fetch(`https://ansaratracker.ru/newapi/startTask?token=${document.cookie}&id=${id}`)

        await fetch(`https://ansaratracker.ru/newapi/Task?token=${document.cookie}`)
            .then(response => response.json())
            .then(res => {
                setTasks(res)
            });
    }

    async function stopTask (id, start) {
        if(ference(start)){
            toast('Задачи длительностью менее 10 секунд не сохраняюся', {duration: 2000});
            return
        }
        setActive(false)
        await fetch(`https://ansaratracker.ru/newapi/stopTask?token=${document.cookie}&id=${id}`)

        await fetch(`https://ansaratracker.ru/newapi/Task?token=${document.cookie}`)
            .then(response => response.json())
            .then(res => setTasks(res));
    }

    async function deleteTask(id) {
        await fetch('https://ansaratracker.ru/newapi/deleteTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "token": document.cookie,
                "id": id
            })
        })
        await fetch(`https://ansaratracker.ru/newapi/Task?token=${document.cookie}`)
            .then(response => response.json())
            .then(res => setTasks(res));
    }
    return (
        <>
            <div style={{maxWidth: "1000px", margin: "0 auto", marginTop:"40px"}}>
                <Group gap={100}>
                <div style={{width: "100%"}}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "15px", marginBottom: "20px"}}>
                        <InputBox tabIndex="0">
                            <Input {...register("newTask")}></Input>
                            <InputIcon
                                src={plus}
                                onClick={handleSubmit(addTask)}
                            ></InputIcon>
                        </InputBox>
                        <InputIcon
                            src={play}
                            onClick={handleSubmit(autoAddTask)}
                        ></InputIcon>
                    </div>
                    {tasks && tasks.map(task => {
                        if(task.fields.ended && task.fields.started){
                            return
                        } else {
                            return(
                            <Popup
                                trigger={
                                    <List key={task.fields.id}>
                                        <div  style={{ color: "#fff" }}>{task.fields.name}</div>
                                        <div style={{ color: "white", width: "60%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}>
                                                <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "42px"}}>{formatData(task.fields.datestart)}</div>
                                                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>-</div>
                                                <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "42px"}}>{"00:00"}</div>
                                            </div>
                                            {
                                                task.fields.started == false ? 
                                                <InputIcon
                                                    src={play}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        startTask(task.pk)
                                                    }}
                                                ></InputIcon> :
                                                <InputIcon
                                                    src={pause}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        stopTask(task.pk, formatData(task.fields.datestart))
                                                    }}
                                                ></InputIcon>
                                            }
                                        </div>
                                    </List>
                                }
                                modal
                                nested
                            >
                                {close => (
                                    <ModalBox>
                                        <ModalTitleBox>
                                            <ModalTitle>Редактирование задачи</ModalTitle>
                                            <div onClick={close}>
                                                <ModalClosed src={closed}></ModalClosed>  
                                            </div>
                                        </ModalTitleBox>
                                        <EditingTaskModal></EditingTaskModal>
                                    </ModalBox>   
                                )}
                            </Popup>
                            )
                        }
                    })}
                </div>
                <div style={{width: "100%"}}>
                    <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px"}}>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}>
                            <Title>Сегодня</Title>
                            <Popup
                                trigger={
                                    <InputIcon
                                        src={plus}
                                        onClick={(e) => {}}
                                    ></InputIcon>
                                }
                                modal
                                nested
                            >
                                {close => (
                                    <ModalBox>
                                        <ModalTitleBox>
                                            <ModalTitle>Добавление выполненной задачи</ModalTitle>
                                            <div onClick={close}>
                                                <ModalClosed src={closed}></ModalClosed>  
                                            </div>
                                        </ModalTitleBox>
                                        <AddTaskModal  clos={close}></AddTaskModal>
                                    </ModalBox> 
                                )}  
                            </Popup>
                        </div>
                        <CurTime>0 ч 0 м</CurTime>
                    </div>
                    {tasks.map(task => {
                        if(task.fields.ended && task.fields.started ){
                            return(
                            <Popup
                                trigger={
                                    <List key={task.fields.id}>
                                        <div  style={{ color: "rgba(255, 255, 255, 0.5)", textDecoration: "line-through" }}>{task.fields.name}</div>
                                        <div style={{ color: "white", width: "60%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}>
                                                <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "42px"}}>{formatData(task.fields.datestart)}</div>
                                                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>-</div>
                                                <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "42px"}}>{formatData(task.fields.dateend)}</div>
                                            </div>
                                            <CurTime>{time(formatData(task.fields.datestart), formatData(task.fields.dateend))}</CurTime>
                                        </div>
                                        {/* <button onClick={() => deleteTask(task.pk)}>удаление задачи</button> */}
                                    </List>
                                }
                                modal
                                nested
                            >
                                {close => (
                                    <ModalBox>
                                        <ModalTitleBox>
                                            <ModalTitle>Редактирование задачи</ModalTitle>
                                            <div onClick={close}>
                                                <ModalClosed src={closed}></ModalClosed>  
                                            </div>
                                        </ModalTitleBox>
                                        <EditingTaskModal status={true} clos={close} id={task.fields.id}></EditingTaskModal>
                                    </ModalBox> 
                                )}  
                            </Popup>
                            )
                        } 
                    })}
                </div>  
                </Group> 
                <Toaster 
                    toastOptions={{
                        style: {
                            padding: '30px',
                            color: "#fff",
                            backgroundColor: '#161616',
                        },
                    }}
                />
            </div>
            
        </>
    );
}
export default Register;
