import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Shopping = () => {
  const [show, setShow] = useState([]);

  async function Show_detail() {
    try {
      const result = await axios.get(
        "https://localhost:7291/Api/Product/GetProduct"
      );
      setShow(result.data);
      console.log(result.data.stock);
    } catch (err) {
      alert(err);
    }
  }
  
  useEffect(() => {
    Show_detail();
  }, []);
  const handleAddOrder = async (product_id) => {
    try {
      await axios.post("https://localhost:7291/Api/Order/AddOrder", {
        order_id: "00001",
        product_id: product_id,
        qty: 1,
        status: "N",
      });
      alert("Add Order Successfully");
    } catch (err) {
      alert(err);
    }
  }
  return (
    <>
      <div className="container">
        <div className="row py-5">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link
              to="/shoppingCard"
              className="btn btn-primary position-relative"
              relative="path"
            >
              Shopping Card
            </Link>
          </div>
          <h4 className="mt-1">Select for shopping</h4>
          <div className="col-md-12">
            <div className="card bg-light mt-3">
              <div className="col-md-12 py-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Product Id</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Stock</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  {show.map(function fn(prd) {
                    return (
                      <tbody>
                        <tr key={prd.id}>
                          <td>{prd.product_id}</td>
                          <td>{prd.product_Name}</td>
                          <td>{prd.price}</td>
                          <td>{prd.stock.inventory}</td>
                          <td>
                            <button type="button" onClick={() => handleAddOrder(prd.product_id)} class="btn btn-success">
                              Buy
                            </button>
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shopping;
