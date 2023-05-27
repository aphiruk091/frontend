import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ShoppingCard = () => {
  const [show, setShow] = useState([]);
  const [id, setId] = useState(0);
  const [product, setProduct] = useState("");
  const [inventory, setInventory] = useState(0);
 

  async function Order() {
    try {
      const result = await axios.get(
        "https://localhost:7291/Api/Order/GetOrder"
      );
      setShow(result.data);
      console.log(result.data);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    Order();
    
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (confirmDelete) {
        await axios.delete(`https://localhost:7291/Api/Order/${id}`);
        alert("Delete Order successfully");
        Order();
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleCheckout = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to Check Out Order ?"
      );
      if (confirmDelete) {
        await Promise.all(
          show.map(function fn(ord) {

            const { id, order_id, product_id, qty } = ord;
            const { price,inventory} = ord.product;
            Get_stock(product_id);

           axios.put(`https://localhost:7291/Api/Order/${id}`, {
              id,
              order_id,
              product_id,
              qty,
              status: "Y",
            });
           

          })
        );
        alert("Check Out Order successfully ");
        Order();
      }
    } catch (err) {
      alert(err);
    }
  };
async function Get_stock(product_id) {
    try {
        
      const result = await axios.get(`https://localhost:7291/Api/Stock/${product_id}`
      );
      setId(result.data.id);
      setProduct(result.data.product_id);
      setInventory(result.data.inventory);
      console.log(result.data);
    } catch (err) {
      alert(err);
    }
  }
  return (
    <>
      <div className="container">
        <div className="row py-5">
          <h4 className="mt-1">Shopping Card</h4>
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link
              className="btn btn-danger position-relative"
              onClick={() => handleCheckout()}
              relative="path"
            >
              Check Out
            </Link>
          </div>
          <div className="col-md-12">
            <div className="card bg-light mt-3">
              <div className="col-md-12 py-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Order Id</th>
                      <th scope="col">Product Id</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Amount</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  {show.map(function fn(ord) {
                    return (
                      <tbody>
                        <tr key={ord.id}>
                          <td>{ord.order_id}</td>
                          <td>{ord.product_id}</td>
                          <td>{ord.product.product_Name}</td>
                          <td>{ord.qty}</td>
                          <td>{ord.product.price * ord.qty}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleDelete(ord.id)}
                              class="btn btn-success"
                            >
                              Delete
                            </button>
                          </td>
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

export default ShoppingCard;
