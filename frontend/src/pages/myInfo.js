import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { from, useQuery } from '@apollo/client'
import logo from '../images/logo.png'
import whiteLogo from '../images/logo-white.webp'
//import {Form, MainContainer, LoginContainer, Input, LogoContainer} from '../styles/styleComponents'
import { Form } from 'react-bootstrap'

import "../styles/bootstrap.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MyInfo = () => {
    // const { loading, error, data } = useQuery(ORDERS_PAGINATION_QUERY, {variables: {
    //     page: null,
    //     perPage: null,
    //     object: {_operators: {status: {in: ["COMPLETE", "SHIPPED", "CLOSED"]}}},
    //     sort: "STATUS_ASC"
    // }})
    // const orders = data?.ordersWithPagination?.items || []
    return (
        <Container>
            <div className="container bootstrap snippet col">
                <div className="col-sm-9">
                   <h2>My profile</h2>
                    <div className="tab-content">
                        <div className="tab-pane active" id="home">
                            <hr></hr>
                            <Form className="form" action="##" method="post" id="profile">
                                <Form.Group>
                                    <div className="col-xs-6">
                                        <Form.Label for="first_name">
                                            <h4>First name</h4>
                                        </Form.Label>
                                        <Form.Control type="text" name="first_name" id="first_name" placeholder="first name" title="enter your first name if any." />
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <div className="col-xs-6">
                                        <Form.Label for="last_name">
                                            <h4>Last name</h4>
                                        </Form.Label>
                                        <Form.Control type="text" className="form-control" name="last_name" id="last_name" placeholder="last name" title="enter your last name if any." />
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <div className="col-xs-6">
                                        <Form.Label for="password">
                                            <h4>old Password</h4>
                                        </Form.Label>
                                        <Form.Control type="password" className="form-control" name="password" id="password"
                                            placeholder="password" title="enter your password." />
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <div className="col-xs-6" >
                                        <Form.Label for="confirm password">
                                            <h4>new Password</h4>
                                        </Form.Label>
                                        <Form.Control type="password" className="form-control" name="c_password" id="c_password"
                                            placeholder="confirm password" title="enter your password again." />
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <div className="col-xs-6" >
                                        <Form.Label for="confirm password">
                                            <h4>Confirm new Password</h4>
                                        </Form.Label>
                                        <Form.Control type="password" className="form-control" name="c_password" id="c_password"
                                            placeholder="confirm password" title="enter your password again." />
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <div className="col-xs-12">
                                        <br></br>
                                        <button className="btn btn-lg btn-success" type="submit"><i className="glyphicon glyphicon-ok-sign"></i> Save</button>
                                        <button className="btn btn-lg" type="reset"><i className="glyphicon glyphicon-repeat"></i>Reset</button>
                                    </div>
                                </Form.Group>
                            </Form>
                            <hr></hr>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    padding: 100px 5%;
`

export default MyInfo;
