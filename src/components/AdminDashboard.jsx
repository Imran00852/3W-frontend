import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { server } from "../main";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${server}/users`);
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <center>Admin Dashboard</center>
      <div className="d-flex .justify-content-start flex-wrap gap-3">
        {users.map((user) => (
          <div key={user._id} className="card" style={{ width: "18rem" }}>
            <div
              id={`cardCarousel${user._id}`}
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {user.image.map((imgSrc, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      src={imgSrc}
                      className="d-block w-100 card-img-top"
                      alt={`Image ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#cardCarousel${user._id}`}
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#cardCarousel${user._id}`}
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <div className="card-body">
              <h2 className="card-title">{user.name}</h2>
              <h5 className="card-text">{user.socialMediaHandle}</h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminDashboard;
