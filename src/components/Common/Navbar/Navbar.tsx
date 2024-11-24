import Link from "next/link";
import React from "react";
import styles from "./Navbar.module.scss";
import Container from "@/UI-Kit/Container/Container";
import Image from "next/image";
const Navbar = () => {
  return (
    <div className={styles.navWrapper}>
      <Container>
        <nav className={styles.navbar}>
          <Link href="/">
            <Image
              src="/images/logo.svg"
              width={50}
              height={50}
              alt="Picture of the author"
            />
          </Link>

          <ul className={styles.navlinks}>
            <li>
              <Link href="/search">
                <p>Search</p>
              </Link>
            </li>
            <li>
              <Link href="/discover">
                <p>Discover</p>
              </Link>
            </li>
            <li>
              <Link href="/favorite">
                <p>Favorite</p>
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
