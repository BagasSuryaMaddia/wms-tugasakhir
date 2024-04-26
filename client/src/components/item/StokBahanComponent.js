import React, { Component } from "react";
import Service from "../../services/service.service";
import AuthService from "../../services/auth.service";
import ItemDataService from "../../services/item.service";

import { Link } from "react-router-dom";

export default class StokBahanComponent extends Component {
    constructor(props) {
        super(props);
        this.retrieveItems = this.retrieveItems.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveItem = this.setActiveItem.bind(this);
    
        this.state = {
          items: [],
          currentItem: null,
          currentIndex: -1,
          searchName: "",
          showNonacBoard: false,
          showAdminBoard: false,
        };
      }  
    
      componentDidMount() {
        this.retrieveItems();
    
        const user = AuthService.getCurrentUser();
    
        if (user) {
          this.setState({
            showNonacBoard: user.roles.includes("ROLE_NON-ACADEMIC"),
            showAdminBoard: user.roles.includes("ROLE_ADMIN"),
          });
        }
      }
    
      retrieveItems() {
        ItemDataService.getall()
          .then((response) => {
            this.setState({
              items: response.data,
            });
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    
      refreshList() {
        this.retrieveItems();
        this.setState({
          currentItem: null,
          currentIndex: -1,
        });
      }
    
      setActiveItem(item, index) {
        this.setState({
          currentItem: item,
          currentIndex: index,
        });
      }
    
      // removeAllItems() {
      //     ItemDataService.deleteAll()
      //         .then(response => {
      //             console.log(response.data);
      //             this.refreshList();
      //         })
      //         .catch(e => {
      //             console.log(e);
      //         });
      // }
    
    
      render() {
        const {
          items,
          currentIndex,
        } = this.state;
    
        return (
          <div className="container">
            <hr className="mb-5" />
            <div className="row">
              <div className="col-6 list-group w-100 p-4 border rounded">
                <h5 className="mb-3">List Stok Data Bahan</h5>
                {items
                  ? items.map((item, index) => (
                      <button
                        className={
                          "item-component list-group-item d-flex justify-content-between align-items-center list-group-item-action " +
                          (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveItem(item, index)}
                        key={index}
                      >
                        {item.item_name}
                        <span
                          className={
                            "badge badge-pill " +
                            (item.quantity === 0
                              ? "badge-warning"
                              : "badge-primary")
                          }
                        >
                          {item.quantity}
                        </span>
                      </button>
                    ))
                  : null}
              </div>
            </div>
          </div>
        );
      }
}
