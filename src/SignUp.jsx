import styled from "styled-components";
import { Group } from "./components/style.js";
import { useForm } from "react-hook-form"
import { redirect } from "react-router-dom";
import { InputBox } from "./components/input/InputComponent";
import { Input } from "./components/input/InputComponent";
import { useNavigate } from "react-router-dom";

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
`

const SignUp = () => {
    async function handleForm() {
        await fetch(`https://ansaratracker.ru/newapi/signup?username=${watch().name}&password=${watch().password}`)
            .then(response => response.json())
        await fetch(`https://ansaratracker.ru/newapi/authorize?username=${watch().name}&password=${watch().password}`)
            .then(response => response.json())
            .then(res => {
                console.log(res)
                document.cookie = res.token
            })
            .catch(e => {
                return
            })
            redirect("/main")
    }
    const { register, watch, handleSubmit} = useForm()
    console.log(watch())
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
        </div>
    )
}
export default SignUp;

//Alex Ivanov