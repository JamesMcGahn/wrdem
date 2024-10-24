import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import classes from "../../styles/Nav.module.css";
import { NavBios } from "../../interfaces/ContentDataProps";

type Props = {
  navBios: NavBios[];
};

const MainNav = ({ navBios }: Props) => (
  <Container className={classes.container} fluid>
    <Navbar id={classes.nav} bg="dark" expand="lg" variant="dark">
      <Container id={classes.innerCont}>
        <Link href="/" passHref>
          <Navbar.Brand href="#home">Wood-Ridge Democrats</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            <div className={classes.navLinks}>
              <Link href="/" passHref className={classes.navLinks}>
                <Nav.Link>Home</Nav.Link>
              </Link>
            </div>
            <div className={classes.navLinks}>
              {navBios.map((bio) => {
                const { href, display } = bio;

                return (
                  <Link href={`${href}`} passHref key={href}>
                    <Nav.Link className={classes.navLinks}>
                      {`About ${display.split(" ")[0]}`}
                    </Nav.Link>
                  </Link>
                );
              })}
            </div>
            <div className={classes.navLinks}>
              <Link href="/literature" passHref>
                <Nav.Link>Literature</Nav.Link>
              </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <a
        id={classes.fbLink}
        href="https://www.facebook.com/WRDems"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faSquareFacebook} />
      </a>
    </Navbar>
  </Container>
);

export default MainNav;
