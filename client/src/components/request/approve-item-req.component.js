import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import ItemReqService from "../../services/student-item-req.service";

import { Link } from 'react-router-dom';

export default class ApproveItemReq extends Component {
    constructor(props) {
        super(props);
        this.getRequests = this.getRequests.bind(this);
        this.renderTablePending = this.renderTablePending.bind(this);
        this.renderTableReviewed = this.renderTableReviewed.bind(this);

        this.state = {
            studentReq: [],
            staffId: "",
            pending: 0
        };
    }

    componentDidMount() {
        this.setState({
            staffId: AuthService.getCurrentUser().username
        });
        this.getRequests(AuthService.getCurrentUser().username);
    }

    getRequests(staffId) {
        ItemReqService.findByAcId(staffId)
            .then((response) => {
                this.setState({
                    studentReq: response.data,
                });
                console.log(this.state.studentReq);
            })
            .catch((e) => {
                console.log(e);
            });
    }


    renderTablePending() {
        return this.state.studentReq.map((request, index) => {
            if (!request.isReviewed) {
                const { requestId, studentId, item_no, quantity, reason } = request //destructuring
                return (
                    <tr key={requestId}>
                        <td>{studentId}</td>
                        <td>{item_no}</td>
                        <td>{quantity}</td>
                        <td>{reason}</td>
                        <td>{<Link to={"/approve-item-requests/" + requestId}>Review Request</Link>}</td>
                    </tr >
                )
            }
            else { return null; }
        })
    }

    renderTableReviewed() {
        return this.state.studentReq.map((request, index) => {
            if (request.isReviewed) {
                const { requestId, studentId, item_no, quantity, reason } = request //destructuring
                return (
                    <tr key={requestId}>
                        <td>{studentId}</td>
                        <td>{item_no}</td>
                        <td>{quantity}</td>
                        <td>{reason}</td>
                    </tr >
                )
            }
            else { return null; }
        })
    }

    render() {
        return (
            <div className="container">
                <h4>Component Requests</h4>
                <hr />
                <ul className="nav nav-pills mb-3" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="pending-tab" data-toggle="tab" href="#pending" role="tab" aria-controls="pending" aria-selected="true">Pending Requests</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="reviewed-tab" data-toggle="tab" href="#reviewed" role="tab" aria-controls="reviewed" aria-selected="false">Reviewed Requests</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="pending" role="tabpanel" aria-labelledby="pending-tab">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Student</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Reason</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTablePending()}
                            </tbody>
                        </table>
                    </div>
                    <div className="tab-pane fade" id="reviewed" role="tabpanel" aria-labelledby="reviewed-tab">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Student</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableReviewed()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}