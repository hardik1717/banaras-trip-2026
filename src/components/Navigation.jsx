import {
    Home,
    Wallet,
    Map,
    Train,
    Receipt,
  } from "lucide-react";
  
  function Navigation() {
    const tabs = [
      {
        label: "Home",
        icon: Home,
        target: "home",
      },
      {
        label: "Finances",
        icon: Wallet,
        target: "finance",
      },
      {
        label: "Itinerary",
        icon: Map,
        target: "itinerary",
      },
      {
        label: "Trains",
        icon: Train,
        target: "train-journey",
      },
      {
        label: "Expenses",
        icon: Receipt,
        target: "expenses",
      },
    ];
  
    const goTo = (target) => {
      document.getElementById(target)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };
  
    return (
      <nav className="top-navigation">
        <div className="navigation-inner">
  
          <div className="navigation-logo">
            <span>BH</span>
            <div>
              <strong>Banaras 2026</strong>
              <small>Our Journey</small>
            </div>
          </div>
  
          <div className="navigation-tabs">
            {tabs.map(({ label, icon: Icon, target }) => (
              <button
                key={target}
                onClick={() => goTo(target)}
              >
                <Icon size={16} strokeWidth={1.8} />
                <span>{label}</span>
              </button>
            ))}
          </div>
  
        </div>
      </nav>
    );
  }
  
  export default Navigation;