import { useEffect, useState } from "react";
import {
  Wallet,
  CheckCircle2,
  Clock3,
  Train,
  Users,
} from "lucide-react";

import { getTripData } from "../services/googleSheetApi";

// -------------------------------------
// FIXED TRIP DETAILS
// -------------------------------------

const TOTAL_PEOPLE = 15;

const TOUR_TOTAL = 120000;
const TOUR_PAID = 37500;

const GOING_TRAIN = 1856;
const RETURN_TRAIN = 1990;

const TRAIN_TOTAL_PER_PERSON =
  GOING_TRAIN + RETURN_TRAIN;

const TOUR_PER_PERSON =
  TOUR_TOTAL / TOTAL_PEOPLE;

const TOTAL_PER_PERSON =
  TOUR_PER_PERSON + TRAIN_TOTAL_PER_PERSON;


// -------------------------------------
// MONEY FORMAT
// -------------------------------------

function money(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
}


// -------------------------------------
// COMPONENT
// -------------------------------------

function TripFinance() {

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // -----------------------------------
  // LOAD GOOGLE SHEET DATA
  // -----------------------------------

  useEffect(() => {

    async function loadPayments() {

      try {

        const data = await getTripData();

        setPayments(data.Payments || []);

      } catch (err) {

        console.error("Payment data error:", err);

        setError("Unable to load payment data.");

      } finally {

        setLoading(false);

      }

    }

    loadPayments();

  }, []);


  // -----------------------------------
  // CALCULATE MEMBER PAYMENT TOTALS
  // -----------------------------------

  const memberPaidTotal = payments.reduce(
    (total, person) =>
      total + Number(person.Paid || 0),
    0
  );


  const memberPendingTotal = payments.reduce(
    (total, person) =>
      total + Number(person.Pending || 0),
    0
  );


  // -----------------------------------
  // AGENT PAYMENT
  // -----------------------------------

  const tourPending =
    TOUR_TOTAL - TOUR_PAID;


  const paidPercentage =
    (TOUR_PAID / TOUR_TOTAL) * 100;


  // -----------------------------------
  // STATUS
  // -----------------------------------

  const getPaymentStatus = (person) => {

    const paid = Number(person.Paid || 0);
    const pending = Number(person.Pending || 0);

    if (pending <= 0) {
      return "PAID";
    }

    if (paid > 0) {
      return "PARTIAL";
    }

    return "PENDING";
  };


  // -----------------------------------
  // UI
  // -----------------------------------

  return (

    <section
      className="trip-finance"
      id="finance"
    >

      <div className="finance-container">


        {/* --------------------------------
            HEADER
        -------------------------------- */}

        <div className="finance-header">

          <span className="section-label">
            TRIP FINANCES
          </span>

          <h2>
            Know where we stand
          </h2>

          <p>
            15 people • Tour + Train expenses
          </p>

        </div>


        {/* --------------------------------
            LOADING / ERROR
        -------------------------------- */}

        {loading && (

          <div className="finance-loading">
            Loading payment data...
          </div>

        )}

        {error && (

          <div className="finance-error">
            {error}
          </div>

        )}


        {/* --------------------------------
            MAIN CARDS
        -------------------------------- */}

        <div className="finance-grid">


          {/* TOTAL TOUR */}

          <div className="finance-card featured">

            <div className="finance-icon">

              <Wallet size={20} />

            </div>

            <span>
              Total Tour Cost
            </span>

            <strong>
              {money(TOUR_TOTAL)}
            </strong>

            <small>
              {money(TOUR_PER_PERSON)} per person
            </small>

          </div>


          {/* PAID */}

          <div className="finance-card">

            <div className="finance-icon paid">

              <CheckCircle2 size={20} />

            </div>

            <span>
              Paid to Agent
            </span>

            <strong>
              {money(TOUR_PAID)}
            </strong>

            <small>
              {paidPercentage.toFixed(1)}% paid
            </small>

          </div>


          {/* PENDING */}

          <div className="finance-card">

            <div className="finance-icon pending">

              <Clock3 size={20} />

            </div>

            <span>
              Pending to Agent
            </span>

            <strong>
              {money(tourPending)}
            </strong>

            <small>
              Remaining tour payment
            </small>

          </div>

        </div>


        {/* --------------------------------
            AGENT PAYMENT PROGRESS
        -------------------------------- */}

        <div className="payment-progress">

          <div className="progress-top">

            <span>
              Agent payment progress
            </span>

            <strong>
              {paidPercentage.toFixed(1)}%
            </strong>

          </div>


          <div className="progress-bar">

            <div
              style={{
                width: `${paidPercentage}%`,
              }}
            />

          </div>


          <div className="progress-bottom">

            <span>
              {money(TOUR_PAID)} paid
            </span>

            <span>
              {money(tourPending)} remaining
            </span>

          </div>

        </div>


        {/* --------------------------------
            MEMBER PAYMENT SUMMARY
        -------------------------------- */}

        <div className="per-person-card">

          <div className="per-person-header">

            <div>

              <Users size={21} />

              <div>

                <span>
                  Your trip contribution
                </span>

                <small>
                  Equal distribution across{" "}
                  {TOTAL_PEOPLE} people
                </small>

              </div>

            </div>


            <strong>
              {money(TOTAL_PER_PERSON)}
            </strong>

          </div>


          <div className="cost-breakdown">

            <div>

              <span>
                Tour
              </span>

              <strong>
                {money(TOUR_PER_PERSON)}
              </strong>

            </div>


            <div>

              <span>
                Mumbai → Ayodhya
              </span>

              <strong>
                {money(GOING_TRAIN)}
              </strong>

            </div>


            <div>

              <span>
                Varanasi → Mumbai
              </span>

              <strong>
                {money(RETURN_TRAIN)}
              </strong>

            </div>


            <div className="total-row">

              <span>
                Total per person
              </span>

              <strong>
                {money(TOTAL_PER_PERSON)}
              </strong>

            </div>

          </div>

        </div>


        {/* --------------------------------
            MEMBER PAYMENT STATUS
        -------------------------------- */}

        <div className="train-cost-card">

          <div className="train-cost-title">

            <div className="finance-icon">

              <Users size={20} />

            </div>

            <div>

              <h3>
                Member Payments
              </h3>

              <p>
                Live from Google Sheets
              </p>

            </div>

          </div>


          {/* SUMMARY */}

          <div className="train-cost-row">

            <div>

              <span>
                Total collected from members
              </span>

              <small>
                Based on Payments sheet
              </small>

            </div>

            <strong>
              {money(memberPaidTotal)}
            </strong>

          </div>


          <div className="train-cost-row">

            <div>

              <span>
                Total member pending
              </span>

              <small>
                Based on Payments sheet
              </small>

            </div>

            <strong>
              {money(memberPendingTotal)}
            </strong>

          </div>


          {/* MEMBER LIST */}

          <div className="member-payment-list">

            {payments.map((person) => {

              const status =
                getPaymentStatus(person);

              return (

                <div
                  className="train-cost-row"
                  key={person["Member ID"] || person.Name}
                >

                  <div>

                    <span>
                      {person.Name}
                    </span>

                    <small>
                      Paid {money(person.Paid)}
                      {" • "}
                      Pending {money(person.Pending)}
                    </small>

                  </div>


                  <strong>

                    <span
                      className={`schedule-status ${
                        status === "PAID"
                          ? "paid-status"
                          : status === "PARTIAL"
                          ? "partial-status"
                          : "pending-status"
                      }`}
                    >
                      {status}
                    </span>

                  </strong>

                </div>

              );

            })}

          </div>

        </div>


        {/* --------------------------------
            TRAIN TICKETS
        -------------------------------- */}

        <div className="train-cost-card">

          <div className="train-cost-title">

            <div className="finance-icon">

              <Train size={20} />

            </div>

            <div>

              <h3>
                Train Tickets
              </h3>

              <p>
                Per person
              </p>

            </div>

          </div>


          <div className="train-cost-row">

            <div>

              <span>
                Mumbai → Ayodhya
              </span>

              <small>
                Going journey
              </small>

            </div>

            <strong>
              {money(GOING_TRAIN)}
            </strong>

          </div>


          <div className="train-cost-row">

            <div>

              <span>
                Varanasi → Mumbai
              </span>

              <small>
                Return journey
              </small>

            </div>

            <strong>
              {money(RETURN_TRAIN)}
            </strong>

          </div>


          <div className="train-total">

            <span>
              Total train cost
            </span>

            <strong>
              {money(TRAIN_TOTAL_PER_PERSON)}
            </strong>

          </div>

        </div>


        {/* --------------------------------
            PAYMENT SCHEDULE
        -------------------------------- */}

        <div className="payment-schedule">

          <h3>
            Agent Payment Schedule
          </h3>


          <div className="schedule-item paid-item">

            <div>

              <strong>
                11 Aug
              </strong>

              <span>
                Token amount
              </span>

            </div>

            <strong>
              {money(10000)}
            </strong>

            <span className="schedule-status">
              PAID
            </span>

          </div>


          <div className="schedule-item">

            <div>

              <strong>
                25 Aug
              </strong>

              <span>
                Second payment
              </span>

            </div>

            <strong>
              {money(27500)}
            </strong>

            <span className="schedule-status">
              PAID
            </span>

          </div>


          <div className="schedule-item">

            <div>

              <strong>
                10 Sep
              </strong>

              <span>
                Third payment
              </span>

            </div>

            <strong>
              {money(27500)}
            </strong>

            <span className="schedule-status pending-status">
              PENDING
            </span>

          </div>


          <div className="schedule-item">

            <div>

              <strong>
                01 Oct
              </strong>

              <span>
                On arrival
              </span>

            </div>

            <strong>
              {money(55000)}
            </strong>

            <span className="schedule-status pending-status">
              PENDING
            </span>

          </div>

        </div>

      </div>

    </section>

  );

}

export default TripFinance;