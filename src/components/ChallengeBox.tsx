import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
  return (
    <div className={styles.challengeBoxContainer}>
      <div className={styles.challengeBoxNotActive}>
        <strong>Começe um novo ciclo para receber desafios a serem completados</strong>
        <p>
          <img src="icons/level-up.svg" alt="level up"/>
          Avance de levels completando desafios.
        </p>
      </div>

    </div>
  ) 
}