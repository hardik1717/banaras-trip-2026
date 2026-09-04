import { useEffect, useState } from "react";

import Hero from "./components/Hero";
import Itinerary from "./pages/Itinerary";
import Expenses from "./pages/Expenses";
import TrainJourney from "./components/TrainJourney";
import TripFinance from "./components/TripFinance";
import Navigation from "./components/Navigation";
import RouteMap from "./components/RouteMap";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Quiz from "./pages/Quiz";


const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx13H3QlqThrXVPvBRVGh-u8e6ovEawk75UcXF3c9MDlhmohUJHqLs5SZmXSNyhAQosjQ/exec";


function App() {

  const [user, setUser] =
    useState(null);


  const [quizCompleted, setQuizCompleted] =
    useState(false);


  const [checkingQuiz, setCheckingQuiz] =
    useState(false);


  const [showSignup, setShowSignup] =
    useState(false);


  // =====================================================
  // LOAD SAVED USER
  // =====================================================

  useEffect(() => {

    const savedUser =
      localStorage.getItem(
        "banaras_user"
      );


    if (savedUser) {

      try {

        setUser(
          JSON.parse(savedUser)
        );

      } catch (error) {

        console.error(
          "Invalid saved user:",
          error
        );

        localStorage.removeItem(
          "banaras_user"
        );

      }

    }

  }, []);


  // =====================================================
  // CHECK QUIZ STATUS FOR CURRENT MEMBER
  // =====================================================

  useEffect(() => {

    if (!user) {

      setQuizCompleted(false);

      return;

    }


    const checkQuizStatus =
      async () => {

        try {

          setCheckingQuiz(true);


          const response =
            await fetch(
              GOOGLE_SCRIPT_URL
            );


          if (!response.ok) {

            throw new Error(
              "Unable to load trip data."
            );

          }


          const data =
            await response.json();


          const quizResponses =
            data["Quiz Responses"] || [];


          // ---------------------------------------------
          // GET CURRENT MEMBER ID
          // ---------------------------------------------

          const memberId =
            String(
              user?.ID ||
              user?.Id ||
              user?.["Member ID"] ||
              ""
            ).trim();


          if (!memberId) {

            console.warn(
              "No Member ID found for logged-in user."
            );

            setQuizCompleted(false);

            return;

          }


          // ---------------------------------------------
          // CHECK THIS MEMBER ONLY
          // ---------------------------------------------

          const alreadyCompleted =
            quizResponses.some(
              (response) => {

                const responseMemberId =
                  String(
                    response?.["Member ID"] ||
                    response?.memberId ||
                    ""
                  ).trim();


                return (
                  responseMemberId ===
                  memberId
                );

              }
            );


          console.log(
            "Quiz status:",
            {
              memberId,
              alreadyCompleted,
            }
          );


          setQuizCompleted(
            alreadyCompleted
          );

        } catch (error) {

          console.error(
            "Quiz status check failed:",
            error
          );


          // If we cannot check Google Sheets,
          // show the quiz instead of incorrectly
          // allowing access without completing it.

          setQuizCompleted(false);

        } finally {

          setCheckingQuiz(false);

        }

      };


    checkQuizStatus();

  }, [user]);


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    localStorage.removeItem(
      "banaras_user"
    );


    // Remove the old global quiz flag.
    // Quiz completion is now stored in Google Sheets
    // per member.

    localStorage.removeItem(
      "banaras_quiz_completed"
    );


    setQuizCompleted(false);

    setUser(null);

  };


  // =====================================================
  // LOGIN SCREEN
  // =====================================================

  if (!user) {

    if (showSignup) {

      return (

        <Signup

          onSignup={(newUser) => {

            setUser(newUser);


            localStorage.setItem(
              "banaras_user",
              JSON.stringify(newUser)
            );


            setShowSignup(false);

          }}


          onLogin={() => {

            setShowSignup(false);

          }}

        />

      );

    }


    return (

      <Login

        onLogin={(loggedInUser) => {

          setUser(
            loggedInUser
          );

        }}


        onCreateAccount={() => {

          setShowSignup(true);

        }}

      />

    );

  }


  // =====================================================
  // CHECKING QUIZ
  // =====================================================

  if (checkingQuiz) {

    return (

      <div className="auth-page">

        <div className="auth-card">

          <div className="auth-logo">

            <span>BH</span>

          </div>


          <div className="auth-header">

            <span className="section-label">

              BANARAS 2026

            </span>


            <h1>

              Checking your trip status...

            </h1>


            <p className="auth-subtitle">

              Just a moment 👋

            </p>

          </div>

        </div>

      </div>

    );

  }


  // =====================================================
  // QUIZ
  // =====================================================

  if (!quizCompleted) {

    return (

      <Quiz

        user={user}

        onComplete={() => {

          setQuizCompleted(true);

        }}

      />

    );

  }


  // =====================================================
  // MAIN WEBSITE
  // =====================================================

  return (

    <>

      <Navigation
        onLogout={handleLogout}
      />


      <div id="home">

        <Hero />

      </div>


      <RouteMap />


      <TripFinance />


      <TrainJourney />


      <Itinerary />


      <Expenses />

    </>

  );

}


export default App;