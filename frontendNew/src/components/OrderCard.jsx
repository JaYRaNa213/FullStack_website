// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React from "react";
import { useNavigate } from "react-router-dom";
import { userCancelOrder } from "../services/orderService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const statusColors = {
  Pending: "bg-yellow-200 text-yellow-800 dark:bg-yellow-100 dark:text-yellow-900",
  Confirmed: "bg-blue-200 text-blue-800 dark:bg-blue-100 dark:text-blue-900",
  Shipped: "bg-purple-200 text-purple-800 dark:bg-purple-100 dark:text-purple-900",
  Delivered: "bg-green-200 text-green-800 dark:bg-green-100 dark:text-green-900",
  Cancelled: "bg-red-200 text-red-800 dark:bg-red-100 dark:text-red-900",
};

const OrderCard = ({ order, onCancelSuccess }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCancel = async () => {
    if (!window.confirm(t("order.cancel_confirm"))) return;

    try {
      const res = await userCancelOrder(order._id);
      if (res.success) {
        toast.success(t("order.cancel_success"));
        onCancelSuccess?.(); // optional refetch
      } else {
        toast.error(res.message || t("order.cancel_failed"));
      }
    } catch (err) {
      toast.error(t("order.cancel_error"));
      console.error(err);
    }
  };

  return (
    <div className="border p-4 mb-6 rounded-lg shadow bg-white dark:bg-gray-900 dark:border-gray-700">
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={() => navigate(`/order/${order._id}`)}
          className="text-left font-semibold text-lg text-blue-700 dark:text-blue-400 hover:underline"
        >
          🧾 {t("order.order_id")}: {order._id}
        </button>
        <span
          className={`text-sm font-semibold px-3 py-1 rounded-full ${
            statusColors[order.status] || "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
          }`}
        >
          {t(`order.status.${order.status}`)}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {order.products?.map((p, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-3 rounded shadow-sm"
          >
            <img
              src={p.productId?.imageUrl || "/default-product.png"}
              alt={p.productId?.name || "Product"}
              className="w-16 h-16 object-cover rounded border dark:border-gray-600"
            />
            <div>
              <button
                className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                onClick={() => navigate(`/products/${p.productId?._id}`)}
              >
                {p.productId?.name || t("order.unknown_product")}
              </button>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("order.quantity")}: {p.quantity}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("order.price")}: ₹{p.productId?.price?.toFixed(2) || "0.00"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {t("order.ordered_on")}: {new Date(order.createdAt).toLocaleString()}
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-green-700 dark:text-green-400">
            {t("order.total")}: ₹{order.totalAmount?.toFixed(2)}
          </p>
          {order.status === "Pending" && (
            <button
              onClick={handleCancel}
              className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
            >
              {t("order.cancel_btn")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
