import { useEffect, useState } from "react";
import { wordData } from "../../../Types/interfaces";
import CustomBtn from "../../../UI/CustomBtn/CustomBtn";
import styles from "../TestScreen.module.scss";
import { shuffleArray } from "../../../Function/shufleArray";
import { useAtomValue } from "jotai";
import { settingsDataConst } from "../../../JotaiData/jotaiData";
import ImgTag from "../../../UI/CustomImage/CustomImageTag";
import { createClasses } from "../../../Function/createClasses";



interface IOneTextProps {
   wordData: wordData;
   nextTest: (isRignt: boolean) => void;
   createdList: string[];
}

function OneTest({ wordData, nextTest, createdList }: IOneTextProps): JSX.Element {
   const [isFalseAnswer, setFalseAnswer] = useState(false);
   const [answerArray, setAnswerArray] = useState<string[]>(createdList);


   //Settings Data
   const { tests: testsSettings } = useAtomValue(settingsDataConst)
   const showBack = testsSettings.whatAsk.data;
   const showQuestion = testsSettings.showQuestion.data;

   function checkAnswer(isRight: boolean) {
      if (isFalseAnswer) {
         return nextTest(false)
      }
      if (isRight) {
         nextTest(isRight)
      } else {
         setFalseAnswer(true)
      }
   }

   //Generete answerArray when word Change
   useEffect(
      () => {
         setFalseAnswer(false)
         setAnswerArray(
            shuffleArray(
               [
                  (showBack ? wordData.word : wordData.meaning),
                  ...createdList
               ]
            ).slice(0, 4))
      },
      [wordData])

   return (
      <>

         <div className={styles.questionComponent}>
            {
               showQuestion && <ImgTag src={wordData.img} />
            }
            <h3> {showBack ? wordData.meaning : wordData.word}</h3>
         </div>

         <div className={styles.answerList}>
            {
               answerArray.map((element, index) => {
                  let isRight = (showBack ? wordData.word : wordData.meaning) == element;

                  return (
                     <CustomBtn
                        key={"hiloghraas"[index]}
                        onClick={() => checkAnswer(isRight)}
                        className={
                           createClasses(
                              [
                                 styles.answerBtn,
                                 isFalseAnswer ?
                                    isRight ? styles.greenBtn : styles.redBtn
                                    : ""
                              ]
                           )
                        }
                     >
                        {element}
                     </CustomBtn>
                  )
               })
            }
         </div>

         {
            isFalseAnswer &&
            <CustomBtn
               className={styles.repeateTest}
               onClick={() => nextTest(false)}
            >
               Next
            </CustomBtn>
         }
      </>
   );
}

export default OneTest;