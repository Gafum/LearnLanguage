import React, { useEffect, useRef } from "react";
import { NumStr, wordData } from "../../../Types/interfaces";
import ImgTag from "../../../UI/CustomImage/CustomImageTag";
import styles from "./WordCard.module.scss";

interface IwordCardProps extends wordData {
   editElement: (id: NumStr) => void;
   toggleFavorites: (event: React.MouseEvent, id: NumStr) => void;
}

function WordCard(
   { id, word, meaning, img, rate, editElement, toggleFavorites }
      : IwordCardProps): JSX.Element {
   const descRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      if (descRef.current) {
         if (descRef.current.offsetHeight > 80) {
            descRef.current.classList.add(styles.bigDescription);
            descRef.current.parentElement?.style.setProperty("--desc-height", "0px");
         }
      }
   }, [img, meaning]);

   function editCard() {
      editElement(id);
   }

   return (
      <div className={styles.wordCard} onClick={editCard}>
         <ImgTag src={img} alt={word} className={styles.wordsImg} />
         <div className={styles.wordDescription} ref={descRef}>
            <h4 className={styles.word}>{word}</h4>
            <p className={styles.meaning}>{meaning}</p>
         </div>
         <button className={styles.editBtn}>
            <ImgTag src="/edit.svg" />
         </button>

         <button className={styles.favoriteBtn} onClick={(event) => toggleFavorites(event, id)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
               <path fill={rate > 0 ? "#ffd000" : "#fff"} strokeWidth={2} d="M15.9199,11.8203 C15.6599,12.0703 15.5399,12.4393 15.6009,12.7903 L16.4899,17.7103 C16.5609,18.1303 16.3909,18.5493 16.0399,18.7903 C15.6999,19.0403 15.2499,19.0703 14.8699,18.8703 L10.4409,16.5603 C10.2799,16.4803 10.1099,16.4293 9.9409,16.4293 L9.6699,16.4293 C9.5699,16.4393 9.4809,16.4803 9.3999,16.5193 L4.9699,18.8403 C4.7499,18.9503 4.4999,18.9903 4.2599,18.9503 C3.6599,18.8303 3.2709,18.2693 3.3699,17.6793 L4.2599,12.7593 C4.3199,12.4003 4.1999,12.0403 3.9409,11.7803 L0.3299,8.2803 C0.0299,7.9803 -0.0801,7.5493 0.0609,7.1503 C0.1909,6.7593 0.5299,6.4693 0.9499,6.4003 L5.9199,5.6793 C6.2999,5.6393 6.6299,5.4103 6.7999,5.0703 L8.9899,0.5803 C9.0399,0.4803 9.1099,0.3893 9.1909,0.3103 L9.2799,0.2403 C9.3199,0.1893 9.3799,0.1503 9.4409,0.1103 L9.5499,0.0703 L9.7199,0.0003 L10.1409,0.0003 C10.5209,0.0403 10.8509,0.2693 11.0209,0.5993 L13.2399,5.0703 C13.3999,5.4003 13.7099,5.6203 14.0699,5.6793 L19.0399,6.4003 C19.4599,6.4603 19.8109,6.7503 19.9499,7.1503 C20.0799,7.5493 19.9699,7.9903 19.6599,8.2803 L15.9199,11.8203 Z" transform="translate(2 2.5)"></path>
            </svg>
         </button>

      </div>
   );
}

export default WordCard;