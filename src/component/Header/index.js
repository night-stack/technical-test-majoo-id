import React, { useState } from "react";
import ModalBottom from "../Modal";
import { Icon } from "react-materialize";
import styles from "./style.module.css";
import Slider from "react-slick";

import "./style.css";

const datas = [
  {
    id: 1,
    name: "Kulina",
    street: "Jalan Tulodong Atas 28, Senayan, Kebayoran Barat",
  },
  {
    id: 2,
    name: "Pancoran Riverside Appartment",
    street: "Jalan Tulodong Atas 28, Senayan, Kebayoran Barat",
  },
  {
    id: 3,
    name: "Jalan Tulodong Atas 18",
    street: "Jalan Tulodong Atas 28, Senayan, Kebayoran Barat",
  },
  {
    id: 4,
    name: "Block71 Jakarta",
    street: "Jalan Tulodong Atas 28, Senayan, Kebayoran Barat",
  },
];

const Header = ({ calender, selectDate, selectedDate }) => {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const filteredItems =
    datas?.length > 0
      ? datas.filter((item) => item.name && item.name.includes(search))
      : datas;

  console.log(datas);

  const settings = {
    slidesToShow: 6,
    slidesToScroll: 6,
  };

  const onChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  return (
    <div className={styles.headerLayout} style={{ width: 375, maxWidth: 375 }}>
      <div
        className="flex"
        style={{ marginBottom: 16, alignItems: "center", maxWidth: 375 }}
      >
        <Icon style={{ fontSize: 30, marginRight: 20 }}>arrow_back</Icon>
        <div className={styles.address}>
          Alamat Pengantaran
          <button
            type="button"
            className={styles.addressButton}
            onClick={() => setModal(!modal)}
          >
            Tokopedia Tower
            <Icon style={{ fontSize: 32, color: "#f9423a" }}>expand_more</Icon>
          </button>
        </div>
      </div>
      <div className={styles.carouselWrapper}>
        <Slider {...settings} arrows={false}>
          {calender?.length > 0 &&
            calender.map((val) => (
              <button
                key={val.date}
                type="button"
                onClick={() => selectDate(val)}
                disabled={val.day === "Minggu" || val.day === "Sabtu"}
                className={`${
                  val.day !== "Minggu" && val.day !== "Sabtu"
                    ? "date"
                    : "weekend"
                } ${val.date === selectedDate?.date ? "active" : ""}`}
              >
                <div className={styles.dateItem}>
                  <span className={styles.dateCode}>{val.code}</span>
                  {val.date}
                </div>
              </button>
            ))}
        </Slider>
      </div>

      <ModalBottom open={modal} handleModal={setModal}>
        <div className="modal-content-custom">
          <div style={{ fontSize: 24, fontWeight: 700, marginTop: 32 }}>
            Cek makanan yang tersedia di lokasi kamu!
          </div>
          <div className="search">
            <label className="search-form">
              <Icon style={{ fontSize: 20, marginRight: 16, color: "#f9423a" }}>
                location_on
              </Icon>
              <input
                type="text"
                id="search"
                value={search}
                onChange={(e) => onChange(e)}
              />
            </label>
          </div>
          <div className="modal-wrapper">
            {filteredItems?.length > 0 &&
              filteredItems?.map((val) => (
                <div className={styles.list}>
                  <Icon
                    style={{ marginRight: 16, fontSize: 20, paddingBottom: 16 }}
                  >
                    location_on
                  </Icon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      borderBottom: "solid 2px #f1f1f2",
                      fontWeight: 700,
                      fontSize: 16,
                      paddingBottom: 16,
                    }}
                  >
                    {val.name}
                    <div className="truncate">{val.street}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </ModalBottom>
    </div>
  );
};

export default Header;
