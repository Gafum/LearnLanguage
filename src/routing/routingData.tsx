import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "../Components/Header/Header";
import MainScreen from "../Screens/MainScreen/MainScreen";
import SectionScreen from "../Screens/SectionScreen/SectionScreen";
import Conteiner, { IcontainerProps } from "../Components/Conteiners/Conteiner";
import ErrorComponent from "../Components/Error/ErrorComponent";
import Flashcards from "../Screens/Flashcards/Flashcards";
import TestScreen from "../Screens/TestScreen/TestScreen";
import Settings from "../Screens/Settings/Setting";
import WritingScreen from "../Screens/WritingScreen/WritingScreen";


interface IRouterComponentProps extends Omit<IcontainerProps, 'children'> { }

const router = createBrowserRouter([
   {
      path: "/",
      element: <RouterComponent newPadding={{ b: "60px", }} />,
      errorElement: <ErrorComponent />,
      children: [
         {
            path: "/",
            element: <MainScreen />,
         },
         {
            path: "/settings",
            element: <Settings />,
         },
         {
            path: "/section/:sectionId",
            element: <SectionScreen />,
         },
         {
            path: "/writing/:sectionId",
            element: <WritingScreen />,
         },
      ],
   },
   {
      path: "/",
      element: <RouterComponent newPadding={{ all: 0 }} />,
      errorElement: <ErrorComponent />,
      children: [
         {
            path: "/flashcards/:sectionId",
            element: <Flashcards />,
         },
         {
            path: "/test/:sectionId",
            element: <TestScreen />,
         },

      ],
   },
]);


function RouterComponent(conteinerData?: IRouterComponentProps): JSX.Element {
   return (
      <div>
         <Header></Header>
         <Conteiner {...conteinerData}>
            <Outlet />
         </Conteiner>

      </div>
   );
}

function MainRouter(): JSX.Element {
   return (<RouterProvider router={router} />);
}

export default MainRouter;
