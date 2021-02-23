import styles from '../styles/components/Profile.module.css'

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://www.github.com/wallyngson.png" alt="Wallyngson Guedes"/>

      <div>
        <strong>Wallyngson Guedes</strong>
        <p>
          <img src='icons/level.svg' alt="level up"/>
          Level 1
        </p>
      </div>
    </div>
  )
}