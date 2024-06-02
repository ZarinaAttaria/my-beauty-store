import React, { useEffect, useState } from 'react';
import UserMenu from '../../components/Layout/UserMenu';
import Layoutt from '../../components/Layout/Layoutt';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from "moment";
import "./orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <div className='allPage'>
      <Layoutt title={"Your Orders"}>
        <div className="container-fluid p-3 m-3 dashboard">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className='orderheading'>
                <h1 className='heading1'>All Orders</h1>
              </div>
              {orders?.map((o, i) => (
                <div className="order-card border shadow mb-3" key={i}>
                  <table className="table table-responsive">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="product-list">
                    {o?.products?.map((p, i) => (
                      <div className="product-item card mb-2 p-3 d-flex flex-row" key={p._id}>
                        <div className="product-image col-md-4">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height="100px"
                          />
                        </div>
                        <div className=" col-md-8">
                          <p className="product-name">{p.name}</p>
                          <p className="product-description">{p.description.substring(0, 30)}...</p>
                          <p className="product-price">Price: ${p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layoutt>
    </div>
  );
}

export default Orders;
