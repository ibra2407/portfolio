import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Hi, I'm Ibrahim!</h1>
        <p className={styles.description}>
          I'm a well-rounded data analyst with experience in software engineering and AI/ML applications.
          <br>
          </br>
          <br>
          </br>
          Reach out if you'd like to work with me!
        </p>
        <div className={styles.buttonContainer}>
          <a href="mailto:mehloldex@gmail.com" className={styles.contactBtn}>
            Email
          </a>
          <a href="https://docs.google.com/document/d/1t9ZvH4xpYiK55fCqSmDwELYqckL5Gn1m/edit?usp=sharing&ouid=100531114666453739687&rtpof=true&sd=true" className={styles.contactBtn}>
            Resume
          </a>
        </div>
      </div>
      <img
        src={getImageUrl("hero/me-cat-circle.png")}
        alt="Hero image of me"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
