import { createContext, ReactNode, useEffect, useState } from 'react';
import { LevelUpModal } from '../components/LevelUpModal';
import Cookies from 'js-cookie'; 
// yarn add @types/js-cookie -D, adicionando a tipagem para a lib...
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;  
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  startNewChallenge: () => void;
  levelUp: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({ children, ...rest } : ChallengesProviderProps) {

  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModal, setIsLevelUpModal] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp () {
    setLevel(level + 1);
    setIsLevelUpModal(true);
  };

  function closeLevelUpModal() {
    setIsLevelUpModal(false);
  };

  function startNewChallenge() {
    const ramdonChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[ramdonChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

      // if (Notification.permission === 'granted') {
      //   new Notification('Novo desafio 🎉', {
      //     body: `Valendo ${challenge.amount}xp!`,
      //   });
      // };
  };

  function resetChallenge() {
    setActiveChallenge(null);
  };

  function completeChallenge() {
    if (!activeChallenge) { return; }

    const { amount } = activeChallenge;

    let finalExperience = amount + currentExperience;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    
    setCurrentExperience(finalExperience);
    setChallengesCompleted(challengesCompleted + 1);
    setActiveChallenge(null);
  };

  return (
    <ChallengesContext.Provider 
      value={{ 
        level, 
        currentExperience, 
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        startNewChallenge,
        levelUp,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
    }}>

      {children}

      { isLevelUpModal && <LevelUpModal /> }

    </ChallengesContext.Provider>
  );
};