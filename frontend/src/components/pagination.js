import React,{Fragment, useState} from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Pagination = ({setQueryPage, queryPage, pageData}) => {
    const { currentPage, pageCount, hasPreviousPage, hasNextPage } = pageData
    const paginationSize = 5
    const history = useHistory()

    const switchPage = (page) => {
        const searchParams = new URLSearchParams()
        searchParams.append("page", page)
        setQueryPage(page)
        history.push({ search: searchParams.toString() })
    }

    return (
        <Container>
            <ButtonContainer>
                <div>
                    <button className={hasPreviousPage ? "" : "disable-button"} onClick={() => switchPage(queryPage-1)}>
                        <FontAwesomeIcon icon={['fas', 'chevron-left']} />
                    </button>
                </div>
                {
                    currentPage > 3 ? (
                        <Fragment>
                            <div>
                                <button className={currentPage === currentPage-2 ? "active" : ""} onClick={() => switchPage(queryPage-2)} key={currentPage-2}>
                                    {currentPage-2}
                                </button>
                            </div>
                            <div>
                                <button className={currentPage === currentPage-1 ? "active" : ""} onClick={() => switchPage(queryPage-1)} key={currentPage-1}>
                                    {currentPage-1}
                                </button>
                            </div>
                        {Array(3).fill().map((_, index) => { 
                            if(currentPage > 3 &&  currentPage+index <= pageCount){
                             return(
                                 <div>
                                    <button className={currentPage === currentPage+index ? "active" : ""} onClick={() => {switchPage(queryPage+index)}} key={index}>
                                        {currentPage+index}
                                    </button>
                                 </div>
                              )
                            }
                         })
                        }                        
                        </Fragment>
                    ) : 
                    Array(pageCount >= 5 ? 5 : pageCount).fill().map((_, index) => { 
                         return(
                             <div>
                                  <button className={currentPage === index+1 ? "active" : ""} onClick={() => switchPage(index+1)} key={index}>
                                      {index+1}
                                  </button>
                             </div>
                          )
                     }) 
                }
                <div>
                    <button className={hasNextPage ? "" : "disable-button"} onClick={() => switchPage(queryPage+1)}>
                        <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                    </button>
                </div>
            </ButtonContainer>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;

    display: flex;
    justify-content:center;
    align-items: center;
`
const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 390px;
    div{
        flex: 1;
        button{
            width: 90%;
            height: 40px;
            font-size: 1.075rem;
            border-radius: 10px;
            background: #C0C0C0;
            border: none;
            font-weight: 400;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
        &.disable-button{
            opacity: 0.5;
            pointer-events: none;
        }
        &.active{
            color: #FFF;
            background-image: linear-gradient(120deg, #5128e6 , #2891e6);
        }
    }
    }
`

export default Pagination;