import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion/dist/framer-motion';
import { Link, useParams } from 'react-router-dom';
import { API_URL, doApiGet } from '../../services/apiService';
import { ImInfo } from 'react-icons/im';
import AuthClientComp from '../general_comps/authClientComp';
import OldOrderInfoItem from './oldOrderInfoItem';

function OldOrderInfoClient(props) {
  let [ar, setAr] = useState([]);
  let [orderInfo, setOrderInfo] = useState({});
  let [orderDate, setOrderDate] = useState('');
  let params = useParams();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + '/orders/productsInfo/' + params.idOrder;
    let resp = await doApiGet(url);
    // console.log(resp.data);
    // defiendDate
    let date = resp.data.order.date_created.replace('T', ' ');
    date = date.substring(0, date.indexOf(':') + 3);
    setOrderDate(date);
    setOrderInfo(resp.data.order);
    // console.log(resp.data.order);
    setAr(resp.data.products);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      className="container mt-5"
      style={{ minHeight: '85vh' }}>
      <AuthClientComp />
      <section className="shopping-cart">
        <div className="container">
          <div className="content">
            <div className="row">
              <div className="col-md-12 col-lg-8">
                <div className="items">
                  {/* start product */}
                  {ar.length == 0 ? (
                    <h2 className="text-center mt-5">
                      You don't have Orders yet
                      {/* <GrDeliver className="mx-2" /> */}
                    </h2>
                  ) : (
                    ''
                  )}
                  {ar.map((item, i) => {
                    return <OldOrderInfoItem key={item._id} item={item} i={i} />;
                  })}
                  {/* end product */}
                </div>
              </div>
              {/* start Orders Info */}
              <div className="col-md-12 col-lg-4">
                <div className="summary">
                  {orderInfo.total_price ? (
                    <React.Fragment>
                      <h3>
                        Order Info <ImInfo className="mx-2" />
                      </h3>
                      <div className="summary-item">
                        <span className="text">Status of order</span>
                        <span className="price">{orderInfo.status}</span>
                      </div>
                      <div className="summary-item">
                        <span className="text">Date</span>
                        <span className="price">{orderDate}</span>
                      </div>
                      <div className="summary-item">
                        <span className="text">Number of Items</span>
                        <span className="price">{ar.length}</span>
                      </div>
                      <div className="summary-item">
                        <span className="text">Total order price</span>
                        <span className="price">₪ {orderInfo.total_price}</span>
                      </div>
                      <div className="summary-item">
                        <span className="text">Address</span>
                        <span className="price"> {orderInfo.destination.label}</span>
                      </div>
                    </React.Fragment>
                  ) : (
                    <h2 className="text-center">Loading...</h2>
                  )}
                  <div className="summary-item">
                    <Link className="btn btn-outline-info col-12 mt-5" to="/oldOrders/">
                      back to list
                    </Link>
                  </div>
                </div>
              </div>
              {/* end Orders Info */}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default OldOrderInfoClient;
