import React, { Component } from "react";
import Service from "../../services/service.service";

export default class TambahBahanKeluar extends Component {
  constructor(props) {
    super(props);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAvailability = this.onChangeAvailability.bind(this);
    this.saveService = this.saveService.bind(this);
    this.newService = this.newService.bind(this);

    this.state = {
      service_no: "",
      service_name: "",
      description: "",
      availability: true,

      submitted: false,
    };
  }

  onChangeNumber(e) {
    this.setState({
      service_no: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      service_name: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeAvailability(e) {
    this.setState({
      availability: e.target.value,
    });
  }

  saveService() {
    Service.create(
      this.state.service_no,
      this.state.service_name,
      this.state.description,
      this.state.availability
    )
      .then((response) => {
        this.setState({
          service_no: response.data.service_no,
          service_name: response.data.service_name,
          description: response.data.description,
          availability: response.data.availability,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newService() {
    this.setState({
      service_no: "",
      service_name: "",
      description: "",
      availability: true,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form p-4 border rounded">
        <h5 className="mb-3">Tambah Data Bahan Masuk</h5>
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
