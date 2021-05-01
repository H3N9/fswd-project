import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import logo from '../images/logo.png'
import whiteLogo from '../images/logo-white.webp'
import {Form, MainContainer, LoginContainer, Input, LogoContainer} from '../styles/styleComponents'

import "bootstrap/dist/css/bootstrap.min.css"
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
                {/* <div className="row">
                    <div className="col-sm-5">
                        <h1> Username</h1>
                    </div>

                </div> */}
                {/* <div className="row">
                    <div className="col-sm-3">
                        <div className="text-center">
                            <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="avatar img-circle img-thumbnail"
                                alt="avatar" />
                            <h6>Upload a your photo</h6>
                            <input type="file" className="text-center center-block file-upload" />
                        </div>
                        <br></br>
                    </div>
                </div> */}
                <div className="col-sm-9">
                   <h2>My profile</h2>
                    <div className="tab-content">
                        <div className="tab-pane active" id="home">
                            <hr></hr>
                            <form className="form" action="##" method="post" id="profile" >
                                <div className="form-group">
                                    <div className="col-xs-6">
                                        <label for="first_name">
                                            <h4>First name</h4>
                                        </label>
                                        <input type="text" className="form-control" name="first_name" id="first_name" placeholder="first name" title="enter your first name if any." />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-xs-6">
                                        <label for="last_name">
                                            <h4>Last name</h4>
                                        </label>
                                        <input type="text" className="form-control" name="last_name" id="last_name" placeholder="last name" title="enter your last name if any." />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-xs-6">
                                        <label for="password">
                                            <h4>old Password</h4>
                                        </label>
                                        <input type="password" className="form-control" name="password" id="password"
                                            placeholder="password" title="enter your password." />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-xs-6">
                                        <label for="confirm password">
                                            <h4>new Password</h4>
                                        </label>
                                        <input type="password" className="form-control" name="c_password" id="c_password"
                                            placeholder="confirm password" title="enter your password again." />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-xs-6">
                                        <label for="confirm password">
                                            <h4>Confirm new Password</h4>
                                        </label>
                                        <input type="password" className="form-control" name="c_password" id="c_password"
                                            placeholder="confirm password" title="enter your password again." />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-xs-12">
                                        <br></br>
                                        <button className="btn btn-lg btn-success" type="submit"><i className="glyphicon glyphicon-ok-sign"></i> Save</button>
                                        <button className="btn btn-lg" type="reset"><i className="glyphicon glyphicon-repeat"></i>Reset</button>
                                    </div>
                                </div>
                            </form>
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
