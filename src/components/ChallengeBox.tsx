import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  
  const { activeChallenge, resetChallenge, completedChallenge } = useContext(ChallengesContext);
  
  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengerActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="body"/>
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button 
              type="button"
              className={styles.challengeSuceededButton}>Completei</button>
            <button 
              type="button"
              className={styles.challengeFailButton}
              onClick={resetChallenge}>Falhei</button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeBoxNotActive}>
          <strong>Começe um novo ciclo para receber desafios a serem completados</strong>
          <p>
            <img src="icons/level-up.svg" alt="level up"/>
            Avance de levels completando desafios.
          </p>
        </div>
      )};

    </div>
  );
};