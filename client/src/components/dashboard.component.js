import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import ProfileService from "../services/profile.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);
    this.getUserProfile = this.getUserProfile.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      currentProfile: {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_no: "",
        address: "",
        department: "",
      },
      jumlahItem: [],
      showStudentBoard: "User",
      showAcademicBoard: "User",
      showNonacBoard: "User",
      showAdminBoard: "User",
    };
  }

  componentDidMount() {
    this.getUserProfile(this.state.currentUser.username);
    this.setState({
      showStudentBoard: this.state.currentUser.roles.includes("ROLE_STUDENT"),
      showAcademicBoard: this.state.currentUser.roles.includes("ROLE_ACADEMIC"),
      showNonacBoard:
        this.state.currentUser.roles.includes("ROLE_NON-ACADEMIC"),
      showAdminBoard: this.state.currentUser.roles.includes("ROLE_ADMIN"),
    });
    console.log(this.state.currentUser);

    fetch("http://localhost:5000/api/item/getall")
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          jumlahItem: response,
        })
      );
  }

  getUserProfile(username) {
    ProfileService.get(username)
      .then((response) => {
        this.setState({
          currentProfile: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const {
      showStudentBoard,
      showAcademicBoard,
      showNonacBoard,
      showAdminBoard,
      currentProfile,
    } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          {/* main */}
          <div className="col-12">
            <div className="row">
              <div className="col-12">
                <div>
                  <div className="card-body">
                    <div className="mb-4">
                      <h3 className="card-title display-4">
                        Selamat Datang{" "}
                        {this.state.currentProfile.first_name +
                          " " +
                          this.state.currentProfile.last_name}
                      </h3>
                      <p className="card-text">
                        Berikut ini merupakan tampilan Dashboard yang
                        menampilkan seluruh data pemilik Mebel di Desa Sumberejo
                        Kabupaten Lumajang.
                      </p>
                    </div>
                    <hr />
                    <div className="my-4">
                      {showStudentBoard && (
                        <div className="row">
                          <div className="col-4 col-sm-4 mb-3">
                            <div
                              className="card"
                              style={{
                                border: "2px solid blue",
                                height: "100%",
                              }}
                            >
                              <div
                                className="card-body"
                                style={{ color: "black" }}
                              >
                                <div className="card-title">
                                  <div className="row">
                                    <div className="col-5 col-sm-12 col-lg-5">
                                      <i className="fas fa-users fa-5x"></i>
                                    </div>
                                    <div className="col-7 col-sm-12 col-lg-7">
                                      <h4 className="display-4">54</h4>
                                      <p> Detail Stok Bahan</p>
                                    </div>
                                  </div>
                                </div>
                                <hr />
                                <a
                                  href="#"
                                  className="btn btn-outline-primary btn-sm"
                                >
                                  Lihat Detail
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="col-4 col-sm-4 mb-3">
                            <div
                              className="card"
                              style={{
                                border: "2px solid green",
                                height: "100%",
                              }}
                            >
                              <div
                                className="card-body"
                                style={{ color: "black" }}
                              >
                                <div className="card-title">
                                  <div className="row">
                                    <div className="col-5 col-sm-12 col-lg-5">
                                      <i className="fas fa-download fa-5x"></i>
                                    </div>
                                    <div className="col-7 col-sm-12 col-lg-7">
                                      <h4 className="display-4">
                                        {this.state.jumlahItem.length}
                                      </h4>
                                      <p>Bahan Masuk</p>
                                    </div>
                                  </div>
                                </div>
                                <hr />
                                <a
                                  href="#"
                                  className="btn btn-outline-primary btn-sm"
                                >
                                  Request Laporan
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="col-4 col-sm-4 mb-3">
                            <div
                              className="card"
                              style={{
                                border: "2px solid #ff3939",
                                height: "100%",
                              }}
                            >
                              <div
                                className="card-body"
                                style={{ color: "black" }}
                              >
                                <div className="card-title">
                                  <div className="row">
                                    <div className="col-5 col-sm-12 col-lg-5">
                                      <i className="fas fa-upload fa-5x"></i>
                                    </div>
                                    <div className="col-7 col-sm-12 col-lg-7">
                                      <h4 className="display-4">5</h4>
                                      <p>Bahan Keluar</p>
                                    </div>
                                  </div>
                                </div>
                                <hr />
                                <a
                                  href="#"
                                  className="btn btn-outline-primary btn-sm"
                                >
                                  Request Laporan
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {showAcademicBoard && <div>p</div>}
                      {showNonacBoard && <div>p</div>}
                      {showAdminBoard && (
                        <div>
                          <div className="row">
                            <div className="col-12 col-sm-4 mb-3">
                              <div
                                className="card"
                                style={{
                                  borderColor: "#730071",
                                  height: "100%",
                                }}
                              >
                                <div
                                  className="card-body"
                                  style={{ color: "#730071" }}
                                >
                                  <div className="card-title">
                                    <div className="row">
                                      <div className="col-5 col-sm-12 col-lg-5">
                                        <i className="fas fa-users fa-5x"></i>
                                      </div>
                                      <div className="col-7 col-sm-12 col-lg-7">
                                        <h4 className="display-4">54</h4>
                                        <p className="text-muted">
                                          {" "}
                                          Total Users
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <hr />
                                  <a
                                    href="#"
                                    className="btn btn-outline-primary btn-sm"
                                  >
                                    View More
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
