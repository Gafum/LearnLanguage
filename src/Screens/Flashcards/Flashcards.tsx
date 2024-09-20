import Flashcard from "./Flashcard/Flashcard";
import Slider from "react-slick";
import { MouseEvent, useState } from "react";
import { wordData } from "../../Types_temp/interfaces";
import styles from "./Flashcards.module.scss";
import "./Flashcard/SliderSettings.scss"
import { sliderSettings } from "./SliderSetting";
import useTestData from "../../Hooks/useTestData";



function Flashcards(): JSX.Element {
   const {
      setNewParamInTopicData,
      myIterableList,
      setMyIterableList,
      reduceRate,
   } = useTestData()

   const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)

   function currentElementSetter(index: number) {
      setCurrentCardIndex(index)
      reduceRate(myIterableList[index].id)
   }

   function addHardWord(event: MouseEvent): void {
      event?.stopPropagation()

      // local data
      let localWordList: wordData[] = JSON.parse(JSON.stringify(myIterableList))

      function toggleFavorite(newRate: number, currentCardIndex: number): void {

         setNewParamInTopicData({
            id: myIterableList[currentCardIndex].id,
            param: "rate",
            newData: newRate,
         })

         localWordList.forEach(({ id }, index) => {
            if (id == localWordList[currentCardIndex].id) {
               localWordList[index].rate = newRate;
            }
         })
      }

      //add to favorite or remove from them
      if (myIterableList[currentCardIndex].rate <= 0) {
         toggleFavorite(10, currentCardIndex);

         //create new Element
         let newElement: wordData = myIterableList[currentCardIndex]
         newElement.rate = 1

         if (myIterableList[myIterableList.length - 1].word
            !== newElement.word) {
            localWordList = [...localWordList, newElement]
         }
      } else {
         toggleFavorite(0, currentCardIndex);
      }

      setMyIterableList(localWordList)
   }


   return (
      <div className={styles.flashcardsScreen}>
         <div className={styles.flashcards} >
            <Slider afterChange={currentElementSetter} {...sliderSettings}>
               {myIterableList.map((element: wordData, index) =>
                  <Flashcard
                     {...element}
                     hardWordFunk={addHardWord}
                     key={element.id}
                     {...index == 0 && { isTipCard: true }}
                  />
               )}
            </Slider>
         </div>
      </div >
   );
}

export default Flashcards;