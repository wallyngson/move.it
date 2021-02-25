import { useState, useEffect } from 'react'
import styles from '../styles/components/Countdown.module.css'

let countdownTimeOut: NodeJS.Timeout

export function Countdown () {

  const [time, setTime] = useState(0.1 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinish, setHasFinish] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const [minuteLeft, minuteRigth] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRigth] = String(seconds).padStart(2, '0').split('')

  function resetCountdown() {
    clearTimeout(countdownTimeOut)
    setIsActive(false)
    setTime(0.1 * 60)
  }

  function startCountdown() {
    setIsActive(true)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeOut = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinish(true)
      setIsActive(false)
    }
  }, [isActive, time])

  return (

    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRigth}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRigth}</span>
        </div>   
      </div>

      {hasFinish ? (
        <button 
                disabled
                className={`${styles.countdownButton}`}>
                    Ciclo encerrado
        </button>
      ) : (
        <>
          { isActive ? (
            <button type="button" 
                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                    onClick={resetCountdown}>
                      Sair do ciclo
            </button>
          ) : (
            <button type="button" 
                    className={styles.countdownButton}
                    onClick={startCountdown}>
                      Novo ciclo
            </button>
          )}
        </>
      )}

      
    </div>
  )

}