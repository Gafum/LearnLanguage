import { MouseEvent, useRef } from "react";
import { IWordData } from "../../../Types/interfaces";
import styles from "./Flashcard.module.scss";
import ImgTag from "../../../UI/CustomImage/CustomImageTag";
import { createClasses } from "../../../Function/createClasses";
import { useAtomValue } from "jotai";
import { settingsDataConst } from "../../../JotaiData/jotaiData";
import useHandleKeyDown from "../../../Hooks/useHandleKeyDown";

interface IFlashCardProps extends IWordData {
   hardWordFunk: (event: MouseEvent) => void;
   isTipCard?: boolean;
   isCurrentCard: boolean;
}

function Flashcards({
   word,
   meaning,
   img,
   rate = 0,
   isCurrentCard = false,
   hardWordFunk,
   isTipCard = false,
}: IFlashCardProps): JSX.Element {
   const cardElement = useRef<HTMLDivElement>(null)

   //Settings Data
   const { flashcards: flashCardSettigs } = useAtomValue(settingsDataConst)
   const whereIsImage = flashCardSettigs.whereIsImage.data;

   useHandleKeyDown({
      callback: (event: KeyboardEvent) => {
         if (event.key == " ") {
            flipCard()
         }
      },
      dependencyList: [flipCard, cardElement, isCurrentCard]
   })


   function flipCard() {
      if (!cardElement.current) return;
      if (!isCurrentCard) return;
      cardElement.current.classList.toggle(styles.flipped);
   }

   function TipCard(): JSX.Element {
      return (
         <div className={styles.tipCard}>
            <h4>Tap to flip this card</h4>
            <ImgTag src="/flip.svg" />
         </div>
      )
   }

   return (
      <div className={styles.flashcard + " flashcard"}>
         <div
            className={createClasses([
               styles.flashcardInner,
               flashCardSettigs.showBack.data ? styles.flipped : ""
            ])}
            ref={cardElement}
            onClick={flipCard}
         >
            <div className={styles.cardFront}>

               <h4>{whereIsImage ? meaning : word}</h4>

               {isTipCard && !flashCardSettigs.showBack.data ? <TipCard /> : <></>}
            </div>
            <div className={styles.cardBack}>
               <ImgTag src={img} />
               <div className={styles.meaning}>
                  <h4>
                     {whereIsImage ? word : meaning}
                  </h4>
                  {isTipCard && flashCardSettigs.showBack.data ? <TipCard /> : <></>}
               </div>
               <div className={
                  createClasses(
                     [styles.favorite, rate > 0 ? styles.added : ""]
                  )}
               >
                  <svg onClick={hardWordFunk}
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                     <path d="M15.9199,11.8203 C15.6599,12.0703 15.5399,12.4393 15.6009,12.7903 L16.4899,17.7103 C16.5609,18.1303 16.3909,18.5493 16.0399,18.7903 C15.6999,19.0403 15.2499,19.0703 14.8699,18.8703 L10.4409,16.5603 C10.2799,16.4803 10.1099,16.4293 9.9409,16.4293 L9.6699,16.4293 C9.5699,16.4393 9.4809,16.4803 9.3999,16.5193 L4.9699,18.8403 C4.7499,18.9503 4.4999,18.9903 4.2599,18.9503 C3.6599,18.8303 3.2709,18.2693 3.3699,17.6793 L4.2599,12.7593 C4.3199,12.4003 4.1999,12.0403 3.9409,11.7803 L0.3299,8.2803 C0.0299,7.9803 -0.0801,7.5493 0.0609,7.1503 C0.1909,6.7593 0.5299,6.4693 0.9499,6.4003 L5.9199,5.6793 C6.2999,5.6393 6.6299,5.4103 6.7999,5.0703 L8.9899,0.5803 C9.0399,0.4803 9.1099,0.3893 9.1909,0.3103 L9.2799,0.2403 C9.3199,0.1893 9.3799,0.1503 9.4409,0.1103 L9.5499,0.0703 L9.7199,0.0003 L10.1409,0.0003 C10.5209,0.0403 10.8509,0.2693 11.0209,0.5993 L13.2399,5.0703 C13.3999,5.4003 13.7099,5.6203 14.0699,5.6793 L19.0399,6.4003 C19.4599,6.4603 19.8109,6.7503 19.9499,7.1503 C20.0799,7.5493 19.9699,7.9903 19.6599,8.2803 L15.9199,11.8203 Z" transform="translate(2 2.5)"></path>
                  </svg>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Flashcards;