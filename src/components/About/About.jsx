import React from "react";

import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>
        About Me
        </h2>
      <div className={styles.content}>
        <img
          src={getImageUrl("about/me-white.png")}
          alt="Me sitting with a laptop"
          className={styles.aboutImage}
        />
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="Cursor icon" />
            <div className={styles.aboutItemText}>
              <h3>Data Analyst</h3>
              <p>
                I'm a data analyst with experience performing detailed statistical analysis coupled with creating informative dashboards and reports. Naturally, I am comfortable working with large datasets.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.png")} alt="Server icon" />
            <div className={styles.aboutItemText}>
              <h3>Web/App/Software Developer</h3>
              <p>
                I have experience developing software applications, from websites to automation scripts.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="UI icon" />
            <div className={styles.aboutItemText}>
              <h3>AI/ML Engineer</h3>
              <p>
                I have experience creating Machine Learning and AI models and using them to solve industry problems.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
