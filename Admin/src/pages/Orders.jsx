import React, { useEffect, useState } from "react";
import axios from "axios";
import backendurl, { currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

export default function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/order/list", {
        headers: { token },
      });
      console.log(res);
      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const StatusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const res = await axios.post(
        backendurl + "/api/order/status",
        { orderId, status: newStatus },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("Order status updated");
        // Optimistically update order status in state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Orders Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_2fr] lg:grid-cols-[0.5fr_2fr_2fr] gap-3 items-start border-2 border-gray-300 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="Order Icon" />

            <div>
              {order?.items?.map((item, itemIndex) => (
                <p className="py-0.5" key={itemIndex}>
                  {item.name} x {item.quantity} <span>{item.size || ""}</span>
                </p>
              ))}
            </div>

            <div>
              <p className="mt-3 mb-2 font-medium">
                {order.address?.firstName + " " + order.address?.lastName}
              </p>
              <div>
                <p>{order.address?.street},</p>
                <p>
                  {order.address?.city}, {order.address?.state},{" "}
                  {order.address?.country}, {order.address?.zipcode}
                </p>
              </div>
              <p>{order.address?.phone}</p>
            </div>

            <div>
              <p className="text-sm sm:text-[15px]">
                Items: {order.items.length}
              </p>
              <p className="mt-3">Payment Method: {order.paymentMethod}</p>
              <p className="text-sm sm:text-[15px]">
                Payment: {order.payment ? "Done" : "Pending"}
              </p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <p className="text-sm sm:text-[15px] font-semibold">
              {currency} {order.amount}
            </p>

            <select
              onChange={(event) => StatusHandler(event, order._id)}
              value={order.status}
              className="p-2 border rounded text-sm bg-white shadow-sm cursor-pointer"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
