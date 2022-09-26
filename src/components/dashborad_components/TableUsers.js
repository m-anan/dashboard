import { Table, Pagination, Modal, Button } from "react-bootstrap";
import classes from "./TableUsers.module.css";
import { useState, useEffect } from "react";
import UserItem from "./UserItem";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
const TableUsers = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);
  const fetchUsers = async () => {
    setIsLoading(true);
    const res = await axios.get(
      "https://dashboard-affae-default-rtdb.firebaseio.com/users.json"
    );
    const userData = [];
    for (const key in res.data) {
      userData.push({
        id: key,
        first_name: res.data[key].first_name,
        last_name: res.data[key].last_name,
        email: res.data[key].email,
        avatar: res.data[key].avatar,
      });
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    setUsers(userData);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Get current posts
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  const totalUsers = users.length;
  let max = 1;
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
    max++;
  }
  // Handler for prev and next
  const prevPageHandler = () => {
    if (currentPage - 1 > 0) {
      paginate(currentPage - 1);
    } else {
      return;
    }
  };

  const nextPageHandler = () => {
    if (currentPage + 1 < max) {
      paginate(currentPage + 1);
    } else {
      return;
    }
  };

  const userRemoveHandler = (id) => {
    axios
      .delete(
        `https://dashboard-affae-default-rtdb.firebaseio.com/users/${id}.json`
      )
      .then(() => {
        setTitle("Delete user");
        setMessage("Delete user success.");
        setShow(true);
      })
      .catch((e) => {
        console.log(e);
      });
    setUsers((preusers) => {
      const updateUsers = preusers.filter((user) => user.id !== id);
      return updateUsers;
    });
  };

  const userEditHandler = (id, items) => {
    axios
      .put(
        `https://dashboard-affae-default-rtdb.firebaseio.com/users/${id}.json`,
        items
      )
      .then(() => {
        setTitle("Edit user");
        setMessage("Edit user success.");
        setShow(true);
      })
      .catch((e) => {
        alert(e);
      });
    setUsers((preusers) => {
      const updateUsers = preusers.filter((user) => user.id !== id);
      return [items, ...updateUsers];
    });
  };

  return (
    <div className={classes.table}>
      <Modal show={show} onHide={handleClose} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Table responsive="sm">
        <thead>
          <tr style={{ backgroundColor: "#dcdbdf83" }}>
            <th>#</th>
            <th>Avatar</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Spinner animation="grow" />
          ) : (
            currentUsers.map((user) => (
              <UserItem
                key={user.id}
                item={user}
                userRemoveHandler={userRemoveHandler}
                userEditHandler={userEditHandler}
              ></UserItem>
            ))
          )}
        </tbody>
      </Table>
      {isLoading ? (
        <></>
      ) : (
        <Pagination className={classes.pagination}>
          <div>
            <Pagination.Prev onClick={prevPageHandler}>
              Previous
            </Pagination.Prev>
          </div>
          <div className="d-flex">
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <a
                  href="#"
                  onClick={() => paginate(number)}
                  className="page-link"
                >
                  {number}
                </a>
              </li>
            ))}
          </div>
          <div>
            <Pagination.Next onClick={nextPageHandler}>Next</Pagination.Next>
          </div>
        </Pagination>
      )}
    </div>
  );
};
export default TableUsers;
