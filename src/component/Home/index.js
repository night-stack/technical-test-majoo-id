import React, { useEffect, useState } from "react";
import Header from "../Header";
import Cart from "../Cart";
import { DateTimeHelper, NumberHelper } from "../../utils";
import Rating from "react-star-ratings";
import { Icon } from "react-materialize";
import "./style.css";

const datas = [
  {
    id: 1,
    image:
      "https://assets.kulina.id/kulina-assets/web/images/menus-new-user/menu_40_03.jpg",
    name: "Penne - Pasta Chicken Presto",
    catering: "Kulina",
    menu: "Uptown Lunch",
    price: 30000,
    rate: 4.5,
  },
  {
    id: 2,
    image:
      "https://assets.kulina.id/kulina-assets/web/images/menus-new-user/menu_40_04.jpg",
    name: "Spaghetti Bolognese",
    catering: "Kulina",
    menu: "Uptown Lunch",
    price: 35000,
    rate: 4.7,
  },
  {
    id: 3,
    image:
      "https://assets.kulina.id/kulina-assets/web/images/menus-new-user/menu_30_04.jpg",
    name: "Chicken Bolognese Penne sauteed",
    catering: "Kulina",
    menu: "Uptown Lunch",
    price: 30000,
    rate: 4.5,
  },
  {
    id: 4,
    image:
      "https://assets.kulina.id/kulina-assets/web/images/menus-new-user/menu_30_01.jpg",
    name: "Dori Asam Manis dan Capcay Goreng",
    catering: "Kulina",
    menu: "Uptown Lunch",
    price: 28000,
    rate: 5,
  },
];

const Home = () => {
  const [lunch, setLunch] = useState(false);
  const [cart, setCart] = useState([]);
  const [calender, setCalender] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const currentDate = new Date().getDate();
    const weeks = DateTimeHelper.getWeeks();
    const getSelected = weeks.find((val) => {
      return val.date === currentDate;
    });
    setCalender(weeks);
    setSelectedDate(getSelected);
  }, []);

  const selectDate = (val) => {
    setSelectedDate(val);
  };

  const addToCart = (val) => {
    const currentCart = [...cart];
    if (currentCart.length > 0) {
      setCart([...currentCart, val]);
    } else {
      setCart([{ ...val }]);
    }
  };

  const deleteCart = () => {
    setCart([]);
  };

  return (
    <div className="mobile-layout">
      <Header
        calender={calender}
        selectDate={selectDate}
        selectedDate={selectedDate}
      />
      {cart?.length > 0 && <Cart items={cart} deleteCart={deleteCart} />}
      <div className="mobile-wrapper" style={{ paddingBottom: 100 }}>
        <div className="flex w-full" style={{ paddingTop: 150 }}>
          <button
            className={!lunch ? "type-lunch active" : "type-lunch"}
            onClick={() => setLunch(false)}
          >
            Lunch
          </button>

          <button
            className={lunch ? "type-dinner active" : "type-dinner"}
            onClick={() => setLunch(true)}
          >
            Dinner
          </button>
        </div>

        <div className="menu">
          <div className="date-title">
            {`${selectedDate?.day}, ${selectedDate?.date} ${selectedDate?.month} ${selectedDate?.year}`}
          </div>
          {datas?.length > 0 &&
            datas?.map((data) => (
              <div key={data.id} className="card">
                <div
                  className="card-header"
                  style={{ backgroundImage: `url(${data.image})` }}
                ></div>
                <div className="card-body">
                  <div className="flex" style={{ alignItems: "center" }}>
                    <span
                      className="subtitle"
                      style={{
                        display: "inline-block",
                        marginRight: 6,
                      }}
                    >
                      {data.rate}
                    </span>
                    <Rating
                      rating={data.rate}
                      starRatedColor="#f9423a"
                      starDimension="16px"
                      starSpacing="1px"
                    />
                  </div>
                  <div className="wrapper">
                    <span className="title">{data.name}</span>
                    <div className="menu-desc">
                      <span className="catering-desc">{`by ${data.catering}`}</span>
                      {data.menu}
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <span className="date-title">
                    {`Rp ${NumberHelper.getThousandFormat(data.price)}`}
                  </span>
                  <button
                    type="button"
                    className="cart-button"
                    onClick={() => addToCart(data)}
                  >
                    Add
                    <Icon style={{ fontSize: 16 }}>add</Icon>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
