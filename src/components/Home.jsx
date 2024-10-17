import React, { useState } from "react";
import { Link } from "react-router-dom";
import { server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const [name, setName] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [images, setImages] = useState([]);

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("socialMediaHandle", socialMedia);

    images.forEach((image) => {
      formData.append("image", image);
    });
    try {
      const { data } = await axios.post(`${server}/signup`, formData);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <h3 className="p-3">User Submission Form</h3>
      <form
        className="p-3"
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        <div className="mt-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <br />
        <div className="mb-3">
          <label htmlFor="socialMediaHandle" className="form-label">
            Social Media Handle
          </label>
          <input
            type="text"
            id="socialMediaHandle"
            name="socialMediaHandle"
            className="form-control"
            value={socialMedia}
            onChange={(e) => setSocialMedia(e.target.value)}
            required
          />
        </div>
        <br />
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Upload Images:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="form-control"
            accept="image/*"
            multiple
            onChange={handleImages}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <Link
        to={"/login"}
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100px",
          textDecoration: "none",
          width: "fit-content",
          margin: "auto",
        }}
      >
        <button className="btn btn-success">Admin Login</button>
      </Link>
    </>
  );
};

export default Home;
