import React, { Component } from "react";
import Service from "../../services/service.service";
import AuthService from "../../services/auth.service";

import { Link } from "react-router-dom";

export default class TambahBahanKeluarComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveServices = this.retrieveServices.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveService = this.setActiveService.bind(this);
    // this.removeAllServices = this.removeAllServices.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      service: [],
      currentService: null,
      currentIndex: -1,
      searchName: "",
      showNonacBoard: false,
      showAdminBoard: false,
    };
  }

  componentDidMount() {
    this.retrieveServices();
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        showNonacBoard: user.roles.includes("ROLE_NON-ACADEMIC"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,
    });
  }

  retrieveServices() {
    Service.getall()
      .then((response) => {
        this.setState({
          service: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveServices();
    this.setState({
      currentService: null,
      currentIndex: -1,
    });
  }

  setActiveService(service, index) {
    this.setState({
      currentService: service,
      currentIndex: index,
    });
  }

  // removeAllServices() {
  //     ServiceDataService.deleteAll()
  //         .then(response => {
  //             console.log(response.data);
  //             this.refreshList();
  //         })
  //         .catch(e => {
  //             console.log(e);
  //         });
  // }

  searchName() {
    Service.findByName(this.state.searchName)
      .then((response) => {
        this.setState({
          service: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const {
      searchName,
      service,
      currentService,
      currentIndex,
      showAdminBoard,
      showNonacBoard
    } = this.state;

    return (
      <div className="submit-form p-4 border rounded">
        <h5 className="mb-3">Tambah Data Bahan Keluar</h5>
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newItem}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="item_name">Nomor Bahan</label>
              <input
                type="text"
                className="form-control"
                id="item_no"
                required
                value={this.state.item_no}
                onChange={this.onChangeNumber}
                name="item_no"
              />
            </div>

            <div className="form-group">
              <label htmlFor="item_name">Nama Bahan</label>
              <input
                type="text"
                className="form-control"
                id="item_name"
                required
                value={this.state.item_name}
                onChange={this.onChangeName}
                name="item_name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="item_name">Jumlah</label>
              <input
                type="number"
                className="form-control"
                item_no="quantity"
                required
                value={this.state.quantity}
                onChange={this.onChangeQuantity}
                name="quantity"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Deskripsi</label>
              <textarea
                rows="5"
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveItem} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
