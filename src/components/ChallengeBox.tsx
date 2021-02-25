import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
  
  const hasActiveChallenge = true
  
  return (
    <div className={styles.challengeBoxContainer}>
      { hasActiveChallenge ? (
        <div className={styles.challengerActive}>
          <header>Ganhe 410xp</header>

          <main>
            <img src="icons/body.svg" alt="body"/>
            <strong>Novo desafio</strong>
            <p>Levante e faça 10 poli-chinelos.</p>
          </main>

          <footer>
            <button 
              type="button"
              className={styles.challengeSuceededButton}>Completei</button>
            <button 
              type="button"
              className={styles.challengeFailButton}>Falhei</button>
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
      ) }

    </div>
  ) 
}