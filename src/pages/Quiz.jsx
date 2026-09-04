import { useEffect, useState } from "react";
import {
  MapPin,
  Users,
  Laugh,
  MessageCircle,
  Clock,
  UserPlus,
  Camera,
  Moon,
  Utensils,
  Music,
  Check,
} from "lucide-react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx13H3QlqThrXVPvBRVGh-u8e6ovEawk75UcXF3c9MDlhmohUJHqLs5SZmXSNyhAQosjQ/exec";


// =====================================================
// GROUP QUESTIONS
// =====================================================

const groupQuestions = [
  {
    id: "funniest",
    icon: Laugh,
    question:
      "Who do you think is the funniest person in the group? 😂",
    multiple: true,
  },
  {
    id: "extrovert",
    icon: MessageCircle,
    question:
      "Who is the most extroverted person in the group?",
    multiple: true,
  },
  {
    id: "laugh",
    icon: Laugh,
    question:
      "Who is most likely to make everyone laugh when things go wrong?",
    multiple: true,
  },
  {
    id: "late",
    icon: Clock,
    question:
      "Who is most likely to be late to the station? 🚆",
    multiple: true,
  },
  {
    id: "fiveMinutes",
    icon: Clock,
    question:
      'Who is most likely to say "5 minutes" and actually take 30 minutes? 😂',
    multiple: true,
  },
  {
    id: "stranger",
    icon: UserPlus,
    question:
      "Who is most likely to become friends with a complete stranger during the trip?",
    multiple: true,
  },
  {
    id: "photos",
    icon: Camera,
    question:
      "Who is most likely to take 100 photos but post only one? 📸",
    multiple: true,
  },
  {
    id: "sleep",
    icon: Moon,
    question:
      "Who is most likely to sleep through an important announcement? 😴",
    multiple: true,
  },
  {
    id: "plan",
    icon: Users,
    question:
      "Who is most likely to convince everyone to change the plan?",
    multiple: true,
  },
  {
    id: "troublemaker",
    icon: Users,
    question:
      "Who do you think will be the biggest troublemaker on this trip? 😈",
    multiple: true,
  },
];


// =====================================================
// TRIP QUESTIONS
// =====================================================

const tripQuestions = [
  {
    id: "excited",
    icon: MapPin,
    question:
      "What's the one thing you're most excited about in Banaras?",
    options: [
      "Temples & spirituality 🛕",
      "Ghats & Ganga 🌊",
      "Food 🍛",
      "Exploring the city 🚶",
      "Everything!",
    ],
  },

  {
    id: "pace",
    icon: Clock,
    question:
      "What's your ideal trip pace?",
    options: [
      "Relaxed — no rushing 😌",
      "Balanced — explore + chill",
      "Packed — I want to see EVERYTHING 🔥",
      "Depends on the group",
    ],
  },

  {
    id: "activity",
    icon: MapPin,
    question:
      "Which activity would you choose first?",
    options: [
      "Ganga boat ride 🚤",
      "Ganga Aarti 🪔",
      "Explore old Banaras streets",
      "Food exploration 🍛",
      "Shopping 🛍️",
    ],
  },

  {
    id: "food",
    icon: Utensils,
    question:
      "What's your food personality on this trip?",
    options: [
      "I want to try everything 🤤",
      "Street food is the priority",
      "Traditional Banarasi food",
      "I'm playing safe",
      "I'll eat whatever the group orders",
    ],
  },

  {
    id: "music",
    icon: Music,
    question:
      "What kind of music should dominate our trip playlist? 🎵",
    options: [
      "Bollywood",
      "Marathi",
      "Devotional",
      "Hollywood",
      "Mix everything",
    ],
  },
];


// =====================================================
// QUIZ COMPONENT
// =====================================================

function Quiz({ user, onComplete }) {

  const [members, setMembers] = useState([]);

  const [loadingMembers, setLoadingMembers] =
    useState(true);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] = useState({});

  const [selected, setSelected] = useState(null);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");


  // =====================================================
  // ALL QUESTIONS
  // =====================================================

  const allQuestions = [
    ...groupQuestions,
    ...tripQuestions,
  ];


  const question =
    allQuestions[currentQuestion];


  const isGroupQuestion =
    currentQuestion < groupQuestions.length;


  const Icon =
    question?.icon || Users;


  const progress =
    ((currentQuestion + 1) /
      allQuestions.length) *
    100;


  // =====================================================
  // LOAD MEMBERS FROM GOOGLE SHEET
  // =====================================================

  useEffect(() => {

    const loadMembers = async () => {

      try {

        setLoadingMembers(true);
        setError("");

        const response =
          await fetch(GOOGLE_SCRIPT_URL);

        if (!response.ok) {
          throw new Error(
            "Unable to connect to Google Sheets."
          );
        }

        const data =
          await response.json();

        const sheetMembers =
          data.Members || [];

        setMembers(sheetMembers);

      } catch (error) {

        console.error(
          "Unable to load members:",
          error
        );

        setError(
          "Unable to load group members."
        );

      } finally {

        setLoadingMembers(false);

      }

    };

    loadMembers();

  }, []);


  // =====================================================
  // SELECT ANSWER
  // =====================================================

  const handleSelect = (option) => {

    // -----------------------------------------
    // GROUP QUESTION = MULTI SELECT
    // -----------------------------------------

    if (
      isGroupQuestion &&
      question.multiple
    ) {

      setSelected((previous) => {

        const current =
          Array.isArray(previous)
            ? previous
            : [];

        const exists =
          current.includes(option);

        const updated =
          exists
            ? current.filter(
                (item) => item !== option
              )
            : [...current, option];

        // Save immediately in state
        setAnswers((previousAnswers) => ({
          ...previousAnswers,
          [question.id]: updated,
        }));

        return updated;

      });

      return;
    }


    // -----------------------------------------
    // NORMAL SINGLE SELECT
    // -----------------------------------------

    setSelected(option);

    setAnswers((previous) => ({
      ...previous,
      [question.id]: option,
    }));

  };


  // =====================================================
  // NEXT / COMPLETE QUIZ
  // =====================================================

  const handleNext = async () => {

    // =================================================
    // IMPORTANT:
    // SAVE CURRENT ANSWER BEFORE MOVING FORWARD
    // =================================================

    const updatedAnswers = {
      ...answers,
      [question.id]: selected,
    };


    setAnswers(updatedAnswers);


    // =================================================
    // VALIDATE ANSWER
    // =================================================

    if (
      !selected ||
      (
        Array.isArray(selected) &&
        selected.length === 0
      )
    ) {

      setError(
        "Please select at least one answer."
      );

      return;

    }


    setError("");


    // =================================================
    // FINAL QUESTION
    // =================================================

    if (
      currentQuestion ===
      allQuestions.length - 1
    ) {

      try {

        setSaving(true);


        const formData =
          new URLSearchParams();


        // ---------------------------------------------
        // ACTION
        // ---------------------------------------------

        formData.append(
          "action",
          "saveQuiz"
        );


        // ---------------------------------------------
        // MEMBER ID
        // ---------------------------------------------

        const memberId =
          user?.ID ||
          user?.Id ||
          user?.["Member ID"] ||
          "";


        formData.append(
          "memberId",
          String(memberId)
        );


        // ---------------------------------------------
        // NAME
        // ---------------------------------------------

        const name =
          user?.Name ||
          user?.name ||
          "";


        formData.append(
          "name",
          String(name)
        );


        // ---------------------------------------------
        // Q1 - Q15
        // ---------------------------------------------

        allQuestions.forEach(
          (quizQuestion, index) => {

            const answer =
              updatedAnswers[
                quizQuestion.id
              ];


            let value = "";


            if (Array.isArray(answer)) {

              value =
                answer.join(", ");

            } else {

              value =
                answer || "";

            }


            formData.append(
              `Q${index + 1}`,
              value
            );

          }
        );


        // =================================================
        // SEND TO GOOGLE APPS SCRIPT
        // =================================================

        console.log(
          "Sending quiz data:",
          Object.fromEntries(formData)
        );


        const response =
          await fetch(
            GOOGLE_SCRIPT_URL,
            {
              method: "POST",
              body: formData,
            }
          );


        if (!response.ok) {

          throw new Error(
            "Google Apps Script request failed."
          );

        }


        const result =
          await response.json();


        console.log(
          "Google Sheets response:",
          result
        );


        // =================================================
        // CHECK RESPONSE
        // =================================================

        if (!result.success) {

          throw new Error(
            result.message ||
            "Unable to save quiz."
          );

        }


        // =================================================
        // SUCCESS
        // =================================================

        console.log(
          "Quiz saved successfully."
        );


        if (onComplete) {

          onComplete(
            updatedAnswers
          );

        }

      } catch (error) {

        console.error(
          "Quiz save error:",
          error
        );


        setError(
          error.message ||
          "Unable to save your quiz responses."
        );

      } finally {

        setSaving(false);

      }


      return;

    }


    // =================================================
    // NEXT QUESTION
    // =================================================

    const nextQuestion =
      allQuestions[
        currentQuestion + 1
      ];


    setCurrentQuestion(
      (previous) =>
        previous + 1
    );


    // Restore previously selected answer
    setSelected(
      updatedAnswers[
        nextQuestion.id
      ] || null
    );

  };


  // =====================================================
  // LOADING MEMBERS
  // =====================================================

  if (loadingMembers) {

    return (

      <div className="auth-page">

        <div className="auth-card quiz-card">

          <div className="auth-logo">
            <span>BH</span>
          </div>


          <div className="auth-header">

            <span className="section-label">
              BANARAS 2026
            </span>


            <h1>
              Getting the group ready...
            </h1>


            <p className="auth-subtitle">
              Loading your travel crew 👥
            </p>

          </div>

        </div>

      </div>

    );

  }


  // =====================================================
  // QUIZ UI
  // =====================================================

  return (

    <div className="auth-page">

      <div className="auth-card quiz-card">


        {/* LOGO */}

        <div className="auth-logo">

          <span>BH</span>

        </div>


        {/* PROGRESS */}

        <div className="quiz-progress">

          <div className="quiz-progress-top">

            <span>

              {isGroupQuestion
                ? "GET TO KNOW THE GROUP"
                : "YOUR TRIP PREFERENCES"}

            </span>


            <span>

              {currentQuestion + 1}
              {" / "}
              {allQuestions.length}

            </span>

          </div>


          <div className="quiz-progress-bar">

            <div
              style={{
                width:
                  `${progress}%`,
              }}
            />

          </div>

        </div>


        {/* HEADER */}

        <div className="auth-header">

          <div className="quiz-icon">

            <Icon size={24} />

          </div>


          <span className="section-label">

            {isGroupQuestion
              ? "GROUP QUIZ"
              : "TRIP QUIZ"}

          </span>


          <h1>

            {question.question}

          </h1>


          <p className="auth-subtitle">

            {isGroupQuestion

              ? question.multiple
                ? "Choose one or more people from the group."
                : "Choose one person from the group."

              : "Tell us what you prefer."}

          </p>

        </div>


        {/* ERROR */}

        {error && (

          <div className="auth-error">

            {error}

          </div>

        )}


        {/* OPTIONS */}

        <div className="quiz-options">


          {/* GROUP QUESTIONS */}

          {isGroupQuestion

            ? members.map(
                (member) => {

                  const name =
                    member.Name ||
                    member.name ||
                    "Unknown member";


                  const memberId =
                    member.ID ||
                    member.Id ||
                    member["Member ID"] ||
                    name;


                  const isSelected =
                    Array.isArray(selected)
                      ? selected.includes(name)
                      : selected === name;


                  return (

                    <button

                      key={memberId}

                      type="button"

                      className={
                        `quiz-option ${
                          isSelected
                            ? "selected"
                            : ""
                        }`
                      }

                      onClick={() =>
                        handleSelect(name)
                      }

                    >

                      <span>
                        {name}
                      </span>


                      {isSelected && (

                        <Check size={18} />

                      )}

                    </button>

                  );

                }
              )


            // =================================================
            // TRIP QUESTIONS
            // =================================================

            : question.options.map(
                (option) => {

                  const isSelected =
                    selected === option;


                  return (

                    <button

                      key={option}

                      type="button"

                      className={
                        `quiz-option ${
                          isSelected
                            ? "selected"
                            : ""
                        }`
                      }

                      onClick={() =>
                        handleSelect(option)
                      }

                    >

                      <span>
                        {option}
                      </span>


                      {isSelected && (

                        <Check size={18} />

                      )}

                    </button>

                  );

                }
              )}

        </div>


        {/* CONTINUE */}

        <button

          type="button"

          className="auth-button"

          disabled={
            saving ||
            !selected ||
            (
              Array.isArray(selected) &&
              selected.length === 0
            )
          }

          onClick={handleNext}

        >

          {saving

            ? "Saving..."

            : currentQuestion ===
              allQuestions.length - 1

              ? "Complete Quiz"

              : "Continue"}

        </button>


        {/* USER */}

        {user?.Name && (

          <p className="quiz-welcome">

            Welcome, {user.Name} 👋

          </p>

        )}

      </div>

    </div>

  );

}


export default Quiz;