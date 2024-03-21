import styled from "styled-components";
import { Group } from "./components/style.js";
import { useForm } from "react-hook-form"
import { redirect } from "react-router-dom";
import { InputBox } from "./components/input/InputComponent";
import { Input } from "./components/input/InputComponent";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const RegisterBox = styled.div`
    width: 280px;
    margin: 0 auto;
`
const ButtonRegister = styled.div`
    font-size: 14px;
    color: #000;
    background-color: #fff;
    border-radius: 8px;
    line-height: 18px;
    height: 40px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    &:hover{
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.8);
    }
`

const SignUp = () => {
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('token')
    async function handleForm() {
        await fetch(`https://ansaratracker.ru/newapi/signup?username=${watch().name}&password=${watch().password}`)
            .then(response => response.json())
        await fetch(`https://ansaratracker.ru/newapi/authorize?username=${watch().name}&password=${watch().password}`)
            .then(response => response.json())
            .then(res => {
                console.log(res)
                if(res.error){
                    redirect("/")
                    toast('ой ой кажется что-то пошло не так', {duration: 2000});
                } else {
                    sessionStorage.setItem('name', res.username);
                    sessionStorage.setItem('token', res.token)
                    // document.cookie = res.token
                    redirect("/main")
                }
            })
            .catch(e => {
                // console.log(e)
            })
            
    }
    const { register, watch, handleSubmit} = useForm()
    const redirect = useNavigate()
    return(
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh"}}>
            <RegisterBox>
                <Group gap={20}>
                    <InputBox>
                        <Input {...register("name")}></Input>
                    </InputBox>
                    <InputBox>
                        <Input {...register("password")}></Input>
                    </InputBox>
                    <ButtonRegister onClick={() => handleForm()}>Войти</ButtonRegister>
                </Group>
            </RegisterBox>
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
    )
}
export default SignUp;

//Alex Ivanov