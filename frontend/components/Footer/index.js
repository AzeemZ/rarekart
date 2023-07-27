import Link from "next/link";

import FacebookLogo from "../../public/icons/FacebookLogo";
import InstagramLogo from "../../public/icons/InstagramLogo";
import Button from "../Buttons/Button";
import Input from "../Input";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <div className={styles.footerContainer}>
        <div className={`app-max-width app-x-padding ${styles.footerContents}`}>
          <div>
            <h3 className={styles.footerHead}>Company</h3>
            <div className={styles.column}>
              <a href="">About Us</a>
              <a href="">Contact Us</a>
              <a href="">Store Location</a>
              <a href="">Careers</a>
            </div>
          </div>
          <div>
            <h3 className={styles.footerHead}>Help</h3>
            <div className={styles.column}>
              <a href="">Order Tracking</a>
              <a href="">FAQs</a>
              <a href="">Privacy Policy</a>
              <a href="">Terms & Conditions</a>
            </div>
          </div>
          <div>
            <h3 className={styles.footerHead}>Store</h3>
            <div className={styles.column}>
              <Link href={"/"}>Women</Link>
              <Link href={"/"}>Men</Link>
              <Link href={"/"}>Bags</Link>
            </div>
          </div>
          <div>
            <h3 className={styles.footerHead}>Keep in Touch</h3>
            <div className={styles.column}>
              <span>
                No(7), Ground Floor,
                <br />
                Lower Mall Road,
                <br />
                Lahore, Pakistan
              </span>
              <span>+92 3XX XXXXXXX</span>
              <span>
                Open All Days <br />- 9:00 AM ~ 11:00 PM
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center pb-16">
        <h4 className="text-3xl mb-4">Newsletter</h4>
        <span className="px-6 text-center">Newsletter Desc</span>
        <div className="mt-5 px-6 flex w-full sm:w-auto flex-col sm:flex-row">
          <Input
            label="Newsletter Input Box"
            name="email"
            type="email"
            extraClass=" w-full sm:w-auto"
          />{" "}
          <Button
            size="lg"
            value={"Send"}
            extraClass="ml-0 mt-4 sm:mt-0 tracking-widest sm:tracking-normal sm:mt-0 sm:ml-4 w-auto w-full sm:w-auto"
          />
        </div>
      </div>
      <div className={styles.bottomFooter}>
        <div className="app-max-width app-x-padding w-full flex justify-between">
          <span className="">@2023 RareKart. All rights reserved.</span>
          <span className="flex items-center">
            <span className="hidden sm:block">Follow us on Social Media:</span>{" "}
            <a href="https://www.facebook.com/" aria-label="Facebook Page">
              <FacebookLogo />
            </a>
            <a href="https://www.instagram.com/" aria-label="Instagram Account">
              <InstagramLogo />
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
