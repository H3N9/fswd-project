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
            :focus~label, :valid~label, :-webkit-autofill~label {
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


export const Input = styled.div`
        position: relative;
        width: 100%;
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
        input, textarea{
            width: 100%;
            outline: none;
            margin: 30px 0;
            outline: none;
            border: none;
            font-size: 1rem;
            padding: 5px 0 5px 5px;
            position: relative;
            border-bottom: 2px solid #5128e6;
            :focus~label, :valid~label, :-webkit-autofill~label{
                top: -5px;
                left: 0;
                color: #111;
            }
        }
        textarea{
            background: #f2f2f2
        }
    
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    padding-bottom: 50px;
    h1{
        margin: 0;
        font-size: clamp(2rem, 5vmin, 2.5rem);
    }
    a, button{
        border: none;
        text-decoration:none;
        color: #FFF;
        background: #2fb12f;
        padding: 10px 20px;
        border-radius: 5px;
        margin-top: 10px;
        font-size: 1.05rem;
    }
`

export const Table = styled.table`
    border-collapse:collapse;  
    width:100%;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    thead{
        background-image: linear-gradient(120deg, #5128e6 , #2891e6);
        color: #FFF;
        margin: 0;
        border: none;
        th{
            padding: 15px 10px;
            &:first-child{
                border-top-left-radius: 10px;
            }
            &:last-child{
                border-top-right-radius: 10px;
            }
        }
    }
    tr{
        &.dim-row{
            background:#F1F1F1;
        }
    }
    td{
        padding: 15px 0;
        font-size: 1.05rem;
        text-align: center;
        
        button{
            margin: 3px;
            padding: 10px 15px;
            border: none;
            &.edit-button{
                background: #ffd000;   
            }
            &.delete-button{
                background: #e02323;   
                color: #FFF;
            }
        }
    }
`