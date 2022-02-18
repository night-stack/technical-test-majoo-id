import React, { useEffect, useState } from "react";
import Header from "../Header";
import { HttpHelper } from "../../utils";
import { Icon } from "react-materialize";
import ModalForm from "../Form/modalForm";
import AddForm from "../Form";
import moment from "moment";
import "./style.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [oneData, setOneData] = useState(null);
  const [addMode, setAddMode] = useState(false);
  const [detailMode, setDetailMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await HttpHelper.getData(
        `https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list`,
        {}
      );
      if (response) {
        setData(response);
      }
    };
    fetchData();
  }, []);

  const addData = (formData) => {
    const currentId = data[data.length - 1].id;
    const newData = {
      id: currentId + 1,
      title: formData.title,
      description: formData.description,
      status: formData.status,
      createdAt: moment(formData.createdAt).format("yyyy-MM-DD, HH:mm"),
    };
    data.push(newData);
  };

  const editData = (formData) => {
    const arr = [...data];
    const index = arr.findIndex((val) => val.id === formData.id);
    arr[index].title = formData.title;
    arr[index].description = formData.description;
    arr[index].status = Number(formData.status);
    setData(arr);
    setOneData(null);
  };

  const deleteData = (formData) => {
    const arr = [...data];
    const index = arr.findIndex((val) => val.id === formData.id);
    if (index) {
      arr.splice(index, 1);
      setData(arr);
    }
    setOneData(null);
  };

  const onDetail = (val) => {
    setOneData(val);
    setDetailMode(!detailMode);
  };

  return (
    <div>
      <Header />
      <div className="mobile-wrapper" style={{ paddingBottom: 100 }}>
        <div className="wrapper">
          <div className="title">
            List Data
            <button
              type="button"
              className="add-btn"
              onClick={() => setAddMode(!addMode)}
            >
              <Icon style={{ marginRight: 6 }}>add</Icon>
              Tambah Data
            </button>
          </div>
          {addMode && (
            <AddForm addData={addData} onCancel={() => setAddMode(!addMode)} />
          )}

          <div style={{ display: "flex", width: "100%" }}>
            <table style={{ width: "45%", marginRight: "10%" }}>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Cretaed At</th>
              </tr>

              {data?.length > 0 &&
                data
                  ?.sort(
                    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                  )
                  // eslint-disable-next-line array-callback-return
                  .map((val) => {
                    if (val.status === 0) {
                      return (
                        <tr
                          key={val.id}
                          style={{ cursor: "pointer" }}
                          onClick={() => onDetail(val)}
                        >
                          <td>{val.id}</td>
                          <td>{val.title}</td>
                          <td>{val.description}</td>
                          <td>{val.status}</td>
                          <td>{val.createdAt}</td>
                        </tr>
                      );
                    }
                  })}
            </table>

            <table style={{ width: "45%" }}>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Cretaed At</th>
              </tr>

              {data?.length > 0 &&
                data
                  ?.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                  )
                  // eslint-disable-next-line array-callback-return
                  .map((val) => {
                    if (val.status === 1) {
                      return (
                        <tr
                          key={val.id}
                          style={{ cursor: "pointer" }}
                          onClick={() => onDetail(val)}
                        >
                          <td>{val.id}</td>
                          <td>{val.title}</td>
                          <td>{val.description}</td>
                          <td>{val.status}</td>
                          <td>{val.createdAt}</td>
                        </tr>
                      );
                    }
                  })}
            </table>
          </div>
        </div>
      </div>

      <ModalForm
        data={oneData}
        open={detailMode}
        handleModal={setDetailMode}
        editData={editData}
        deleteData={deleteData}
      />
    </div>
  );
};

export default Home;
