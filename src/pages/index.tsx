import React from "react";
import { GetServerSideProps } from 'next';

import { CompletedChallenges } from "../components/CompletedChallenges";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";

import styles from "../styles/pages/Home.module.css";
import Head from 'next/head';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengerCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider 
      level={props.level}  
      currentExperience={props.currentExperience}
      challengerCompleted={props.challengerCompleted}
      >
        <div className={styles.container}>
          <Head>
            <title>Início | move.it</title>
          </Head>
          
          <ExperienceBar />
          
          <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>

        </div>
    </ChallengesProvider>
  );
};


/*  
    Esse metódo precisa ser escrito desta forma e ela controla
    o Next.js irá mandar para o Front-end em React.js
*/
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengerCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengerCompleted: Number(challengerCompleted),
    }
  }
};