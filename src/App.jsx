import Hero from "./components/Hero";
import Itinerary from "./pages/Itinerary";
import Expenses from "./pages/Expenses";
import TrainJourney from "./components/TrainJourney";
import TripFinance from "./components/TripFinance";
import Navigation from "./components/Navigation";
import RouteMap from "./components/RouteMap";


function App() {
  return (
    <>
      <Navigation />

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


