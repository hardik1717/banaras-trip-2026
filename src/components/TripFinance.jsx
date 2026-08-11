import {
    Wallet,
    CheckCircle2,
    Clock3,
    Train,
    Users,
  } from "lucide-react";
  
  const TOTAL_PEOPLE = 15;
  
  const TOUR_TOTAL = 120000;
  const TOUR_PAID = 10000;
  const TOUR_PENDING = TOUR_TOTAL - TOUR_PAID;
  
  const GOING_TRAIN = 1856;
  const RETURN_TRAIN = 1990;
  const TRAIN_TOTAL_PER_PERSON = GOING_TRAIN + RETURN_TRAIN;
  
  const TOUR_PER_PERSON = TOUR_TOTAL / TOTAL_PEOPLE;
  const TOTAL_PER_PERSON =
    TOUR_PER_PERSON + TRAIN_TOTAL_PER_PERSON;
  
  function money(amount) {
    return `₹${amount.toLocaleString("en-IN")}`;
  }
  
  function TripFinance() {
    const paidPercentage = (TOUR_PAID / TOUR_TOTAL) * 100;
  
    return (
      <section className="trip-finance" id="finance">
        <div className="finance-container">
  
          {/* Header */}
  
          <div className="finance-header">
            <span className="section-label">
              TRIP FINANCES
            </span>
  
            <h2>Know where we stand</h2>
  
            <p>
              15 people • Tour + Train expenses
            </p>
          </div>
  
          {/* Main cards */}
  
          <div className="finance-grid">
  
            {/* Total tour */}
  
            <div className="finance-card featured">
              <div className="finance-icon">
                <Wallet size={20} />
              </div>
  
              <span>Total Tour Cost</span>
  
              <strong>
                {money(TOUR_TOTAL)}
              </strong>
  
              <small>
                {money(TOUR_PER_PERSON)} per person
              </small>
            </div>
  
            {/* Paid */}
  
            <div className="finance-card">
              <div className="finance-icon paid">
                <CheckCircle2 size={20} />
              </div>
  
              <span>Paid to Agent</span>
  
              <strong>
                {money(TOUR_PAID)}
              </strong>
  
              <small>
                {paidPercentage.toFixed(1)}% paid
              </small>
            </div>
  
            {/* Pending */}
  
            <div className="finance-card">
              <div className="finance-icon pending">
                <Clock3 size={20} />
              </div>
  
              <span>Pending to Agent</span>
  
              <strong>
                {money(TOUR_PENDING)}
              </strong>
  
              <small>
                Remaining tour payment
              </small>
            </div>
  
          </div>
  
          {/* Progress */}
  
          <div className="payment-progress">
  
            <div className="progress-top">
              <span>Agent payment progress</span>
  
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
              <span>{money(TOUR_PAID)} paid</span>
              <span>{money(TOUR_PENDING)} remaining</span>
            </div>
  
          </div>
  
          {/* Per person */}
  
          <div className="per-person-card">
  
            <div className="per-person-header">
  
              <div>
                <Users size={21} />
  
                <div>
                  <span>Your trip contribution</span>
                  <small>
                    Equal distribution across {TOTAL_PEOPLE} people
                  </small>
                </div>
              </div>
  
              <strong>
                {money(TOTAL_PER_PERSON)}
              </strong>
  
            </div>
  
            <div className="cost-breakdown">
  
              <div>
                <span>Tour</span>
                <strong>
                  {money(TOUR_PER_PERSON)}
                </strong>
              </div>
  
              <div>
                <span>Mumbai → Ayodhya</span>
                <strong>
                  {money(GOING_TRAIN)}
                </strong>
              </div>
  
              <div>
                <span>Varanasi → Mumbai</span>
                <strong>
                  {money(RETURN_TRAIN)}
                </strong>
              </div>
  
              <div className="total-row">
                <span>Total per person</span>
                <strong>
                  {money(TOTAL_PER_PERSON)}
                </strong>
              </div>
  
            </div>
  
          </div>
  
          {/* Train tickets */}
  
          <div className="train-cost-card">
  
            <div className="train-cost-title">
  
              <div className="finance-icon">
                <Train size={20} />
              </div>
  
              <div>
                <h3>Train Tickets</h3>
                <p>Per person</p>
              </div>
  
            </div>
  
            <div className="train-cost-row">
  
              <div>
                <span>Mumbai → Ayodhya</span>
                <small>Going journey</small>
              </div>
  
              <strong>
                {money(GOING_TRAIN)}
              </strong>
  
            </div>
  
            <div className="train-cost-row">
  
              <div>
                <span>Varanasi → Mumbai</span>
                <small>Return journey</small>
              </div>
  
              <strong>
                {money(RETURN_TRAIN)}
              </strong>
  
            </div>
  
            <div className="train-total">
  
              <span>Total train cost</span>
  
              <strong>
                {money(TRAIN_TOTAL_PER_PERSON)}
              </strong>
  
            </div>
  
          </div>
  
          {/* Payment schedule */}
  
          <div className="payment-schedule">
  
            <h3>Agent Payment Schedule</h3>
  
            <div className="schedule-item paid-item">
              <div>
                <strong>11 Aug</strong>
                <span>Token amount</span>
              </div>
  
              <strong>{money(10000)}</strong>
  
              <span className="schedule-status">
                PAID
              </span>
            </div>
  
            <div className="schedule-item">
              <div>
                <strong>25 Aug</strong>
                <span>Second payment</span>
              </div>
  
              <strong>{money(27500)}</strong>
  
              <span className="schedule-status pending-status">
                PENDING
              </span>
            </div>
  
            <div className="schedule-item">
              <div>
                <strong>10 Sep</strong>
                <span>Third payment</span>
              </div>
  
              <strong>{money(27500)}</strong>
  
              <span className="schedule-status pending-status">
                PENDING
              </span>
            </div>
  
            <div className="schedule-item">
              <div>
                <strong>01 Oct</strong>
                <span>On arrival</span>
              </div>
  
              <strong>{money(55000)}</strong>
  
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