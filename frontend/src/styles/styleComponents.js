import styled from 'styled-components'

export const Title = styled.div`
    width: 100%;
    height: 50px;
    background-color: white;
    padding: 0px 0 25px 0;
`

export const Catgories = styled.div`
    width: 100%;
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
    padding : 20px 0 50px 0;
    position: relative;
`

export const SpaceBox = styled.div`
    width: 100%;
    height: 100px;
`

export const Box9p = styled.div`
    width: 90%;
    height: 100%;
    margin: 0 5% 0 5%;
`
export const TitleText = styled.h1`
    font-size: 2.5rem;
    margin: 0;
`

export const Button = styled.button`
    padding: 5px 60px 5px 60px;
    border-radius: 20px;
    font-size: 1.2em;
    outline: none;
    cursor: pointer;
    transition: 0.5s;
    outline: none;
`


// For login & register Page

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0 30px;
    div.input{
        position: relative;
        label {
            position: absolute;
            top: 35%;
            left: 5px;
            width: 100%;
            color: rgba(0,0,0, 0.5);
            transition: 0.2s all;
            cursor: text;
            font-size: 1.1rem;
        }
        input{
            width: 100%;
            outline: none;
            margin: 30px 0;
            outline: none;
            border: none;
            font-size: 1rem;
            padding: 5px 0 5px 5px;
            position: relative;
            border-bottom: 2px solid #5128e6;
            :focus~label, :valid~label {
                top: -5px;
                left: 0;
                color: #111;
            }
        }
    }
    div{
        display: flex;
        justify-content: center;
        align-items: center;
        a{
            margin: 20px 0;
            text-decoration: none;
            color: #5128e6;
            text-align: center;
        }
        button{
            height: 50px;
            padding: 0px 50px;
            font-size: 1rem;
            border-radius: 5px;
            border: none;
            margin-right: 25px;
            background-image: linear-gradient(120deg, #5128e6 , #2891e6, #5128e6 , #2891e6);
            background-size: 300% 100%;
            color: #FFF;
            transition: 0.55s;
            :hover{
                background-position: 100% 0;
            }
        }
    }
`

export const MainContainer = styled.div`
    width:100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #EFEFEF;
    transition: 0.25s;
`
export const LoginContainer = styled.div`
    background: #FFF;
    padding: 150px 0;
    width: 1000px;
    display: flex;
    flex-wrap: wrap;
    border-radius: 5px;
    align-items: center;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`


//----------------------------------------------------------------------------------------