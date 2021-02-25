import { createContext, ReactNode, useEffect, useState } from 'react';
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
  completedChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({ children } : ChallengesProviderProps) {

  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp () {

  };

  function startNewChallenge() {
    const ramdonChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[ramdonChallengeIndex];

    setActiveChallenge(challenge);
  };

  function resetChallenge() {
    setActiveChallenge(null);
  };

  function completedChallenge() {
    const sum = challengesCompleted + 1;
    const sumExperience = currentExperience + activeChallenge.amount;
    setChallengesCompleted(sum);
    setCurrentExperience(sumExperience);
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
        completedChallenge,
    }}>

      {children}

    </ChallengesContext.Provider>
  );
};