import CustomDialog, { ICustomDialogProps } from "../../../UI/CustomDialog/CustomDialog";
import CustomInput, { useCustomInput } from "../../../UI/CustomInput/CustomInput";

import styles from "../SectionScreen.module.scss";
import { useSetAtom } from "jotai";
import { topicsData } from "../../../jotaiData/jotaiData";
import CustomBtn from "../../../UI/CustomBtn/CustomBtn";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { NumStr, topicData, wordData } from "../../../types/interfaces";
import { findIndexOfELement } from "../../../function/findElementByID";
import { generateUnicID } from "../../../function/GenerateUnicID";

interface IdialogWordDataProps extends Omit<ICustomDialogProps, "title"> {
   sectionId: NumStr;
   itemData: wordData;
}

function DialogCreateNewWord({ show, setShow, sectionId, itemData }: IdialogWordDataProps): JSX.Element {
   const setTopicList = useSetAtom(topicsData)
   const [wordValue, setWordValue] = useCustomInput("")
   const [meaningValue, setMeaningValue] = useCustomInput("")
   const [image, setImage] = useState<string>("")
   const [showDropdown, setshowDropdown] = useState(false);

   useEffect(() => {
      setWordValue(itemData.word)
      setMeaningValue(itemData.meaning)
      setImage(itemData.img ? itemData.img : "")
   }, [itemData])

   function getAllData(event: FormEvent) {
      event.preventDefault();

      if (meaningValue.length == 0 || wordValue.length == 0) return;

      if (itemData.id) {
         editWord({
            id: itemData.id,
            rate: itemData.rate,
            word: wordValue.toString().trim(),
            meaning: meaningValue.toString().trim(),
            img: image
         })
      } else {
         createNewWords({
            id: generateUnicID(),
            rate: 0,
            word: wordValue.toString().trim(),
            meaning: meaningValue.toString().trim(),
            img: image
         })
      }

      setWordValue("")
      setMeaningValue("")
      setImage("")

      setShow(false)
   }

   function editWord(word: wordData) {
      setTopicList((prev) => {
         let sectionIndex = findIndexOfELement(prev, sectionId);
         if (!(sectionIndex + 1)) return prev;

         let localList: topicData[] = JSON.parse(JSON.stringify(prev));


         let wordIndex = findIndexOfELement(localList[sectionIndex].data, word.id)

         if (!(wordIndex + 1)) {
            return prev;
         }

         // ChangeData
         localList[sectionIndex].data[wordIndex] = word;

         return localList;
      })
   }

   function createNewWords(newWord: wordData) {
      setTopicList((prev) => {
         let sectionIndex = findIndexOfELement(prev, sectionId);
         if (!(sectionIndex + 1)) return prev;

         let localList: topicData[] = JSON.parse(JSON.stringify(prev));

         localList[sectionIndex].data.push(newWord);
         return localList;
      })
   }

   function getImage(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      const file = (event.target as HTMLInputElement).files
      if (!file || !file[0]) return;
      setImage(URL.createObjectURL(file[0]));
   }


   return (<>
      <CustomDialog
         show={show}
         setShow={setShow}
         title={itemData.id ? "Edit Word" : "Add new Word"}
      >
         <div className={styles.addWordBlock}>
            <form className={styles.addWordForm} onSubmit={getAllData}>
               <CustomInput
                  hint={"Title"}
                  value={wordValue}
                  setValue={setWordValue}
                  maxLength={50}
               />

               <CustomInput
                  hint={"Meaning"}
                  value={meaningValue}
                  setValue={setMeaningValue}
                  rows={5}
                  maxLength={300}
               />


               <CustomBtn className={styles.addImgBtn} onClick={
                  (e) => {
                     e.stopPropagation()
                     e.preventDefault()
                     setshowDropdown(prev => !prev)
                  }}
               >
                  {image ? "Edit" : "Add"} Image
               </CustomBtn>
               {showDropdown && (
                  <div className={styles.imageSelector}>
                     <div className={styles.imageSelectorInputs}>
                        <input
                           type="file"
                           accept=".jpg, .jpeg, .png"
                           onChange={getImage}
                        />
                        <CustomInput
                           hint="Write link to the image"
                           value={image}
                           setValue={setImage}
                           required={false}
                        />
                     </div>
                     <div className={styles.selectedImg}>
                        {
                           image.length > 0
                              ? <img alt="preview image" src={image} />
                              : <img alt="not found" src="/imageNotFound.svg" />
                        }
                     </div>
                  </div>
               )}

               <CustomBtn>
                  {itemData.id ? "Edit" : "Add"} Word
               </CustomBtn>
            </form>
         </div>
      </CustomDialog>
   </>);
}

export default DialogCreateNewWord;