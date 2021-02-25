import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';


export function Profile() {
  
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://www.github.com/wallyngson.png" alt="Wallyngson Guedes"/>

      <div>
        <strong>Wallyngson Guedes</strong>
        <p>
          <img src='icons/level.svg' alt="level up"/>
          Level { level }
        </p>
      </div>
    </div>
  );
};