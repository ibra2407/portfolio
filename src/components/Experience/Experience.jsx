import React from "react";
import styles from "./Experience.module.css";
import history from "../../data/history.json";
import { getImageUrl } from "../../utils";

export const Experience = () => {
  return (
    <section className={styles.container} id="experience">
      <h2 className={styles.title}>Work Experiences</h2>
      <ul className={styles.history}>
        {history.map((historyItem, id) => (
          <li key={id} className={styles.historyItem}>
            <img
              src={getImageUrl(historyItem.imageSrc)}
              alt={`${historyItem.organisation} Logo`}
            />
            <div className={styles.historyItemDetails}>
              <h3>{historyItem.role},</h3>
              <h3>{historyItem.organisation}</h3>
              <p>{`${historyItem.startDate} - ${historyItem.endDate}`}</p>
              <ul>
                {historyItem.experiences.map((experience, expId) => (
                  <li key={expId}>{experience}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
