import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Layout = props => {
  const signedIn = localStorage.getItem("token");

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">SAT Meet</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/teams">My Teams</Nav.Link>
          <Nav.Link href="/createteam">Create Teams</Nav.Link>
        </Nav>
        {signedIn ? (
          <Nav.Link href="/" onClick={ () => {
              localStorage.removeItem('token')
          }}>Logout</Nav.Link>
        ) : (
          <Nav.Link href="/login">Sign in</Nav.Link>
        )}
      </Navbar>
      <div
        style={{
          margin: "1rem 1rem 0 1rem"
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default Layout;
