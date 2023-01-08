import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ModalBody } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

export const getServerSideProps = async (context) => {
  const { token } = context.req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: true,
      },
    };
  }
  console.log(token, "token ssr");
  return {
    props: {
      isLogin: token ? true : false,
      token: token,
    },
  };
};
const ModalPhoto = ({ token }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [photo, setPhoto] = useState(null);
  console.log(token, "token mdodal");
  const user = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const handleData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);
    console.log(formData, "data dari handle data update");
    axios
      .put(process.env.HOST + `users`, formData, user, {
        "content-type": "multipart/form-data",
      })
      .then((res) => {
        console.log("Update photo succes");
        console.log(res);
        window.location.reload(false);
        Swal.fire("Success", "update photo profile success", "success");
      })
      .catch((err) => {
        console.log("update photo profile failed");
        console.log(err);
        Swal.fire("Warning", "update photo profile failed", "error");
      });
  };
  return (
    <div>
      <div
        className="btn-primary image-edit"
        style={{ marginLeft: "0px" }}
        onClick={handleShow}
      >
        <h5 style={{ marginLeft: "-13px" }}>Edit Photo</h5>
        {/* <img src={Assets.edit} alt="" /> */}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Foto Profile</Modal.Title>
        </Modal.Header>
        <ModalBody>
          <Form>
            <Form.Group className="mb-3">
              <input type="file" name="photo" onChange={handlePhotoChange} />
            </Form.Group>
          </Form>
        </ModalBody>
        <Modal.Footer>
          <button className="btn" onClick={handleClose}>
            Close
          </button>
          <button
            className="btn "
            style={{ backgroundColor: "#5E50A1", color: "white" }}
            onClick={(e) => handleData(e)}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ModalPhoto;
