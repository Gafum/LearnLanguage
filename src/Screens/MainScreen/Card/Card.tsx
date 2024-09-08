import { Link } from "react-router-dom";
import { topicData } from "../../../types/interfaces";
import styles from "./Card.module.scss"
import ImgTag from "../../../UI/CustomImage/CustomImageTag";
import React from "react";

interface ICardProps {
   data: topicData;
   editCard: (event: React.MouseEvent) => void
}

function Card({ data, editCard }: ICardProps): JSX.Element {

   return (
      <Link to={`/section/${data.id}`}>
         <div className={styles.card}>
            <ImgTag src={`/${data.icon}.svg`} className={styles.sectionImg} />
            <span>{data.name}</span>
            <button onClick={editCard}>
               <ImgTag src="/edit.svg" className={styles.editBtn} />
            </button>
         </div>

      </Link>
   );
}

export default Card;