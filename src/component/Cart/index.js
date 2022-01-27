import React from "react";
import { Icon } from "react-materialize";
import styles from "./style.module.css";
import { NumberHelper } from "../../utils";

const Cart = ({ items, deleteCart }) => {
  let total = 0;
  if (items.length > 0) {
    const totalArr = items.map((item) => {
      return item.price;
    });

    total = totalArr.reduce((a, b) => a + b, 0);
  } else {
    total = items.length * items[0].price;
  }
  return (
    <div className={styles.cart}>
      <div className={styles.cartBody}>
        <div className={styles.item}>
          {` ${items?.length} Items | Rp ${NumberHelper.getThousandFormat(
            total
          )}`}
          <span className={styles.itemDesc}>Termasuk ongkos kirim</span>
        </div>
        <button
          type="button"
          className="flex"
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
          onClick={deleteCart}
        >
          <Icon style={{ color: "#fff", fontSize: 32 }}>add_shopping_cart</Icon>
          <Icon style={{ fontSize: 32, color: "#fff" }}>chevron_right</Icon>
        </button>
      </div>
    </div>
  );
};

export default Cart;
