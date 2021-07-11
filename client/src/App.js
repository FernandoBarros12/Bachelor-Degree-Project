import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages';
import RegisterMearsurements from './pages/RegisterMearsurements';
import CommunityMearsument   from './pages/Community'
import ViewMeasurement from "./pages/ViewMeasurement"
import More from './pages/More';
import MeasurementPoint from './pages/MeasurementsPoints';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/register_measurement" component={RegisterMearsurements} exact />
        <Route path="/community" component={CommunityMearsument} exact />
        <Route path="/measurement/:id" > <ViewMeasurement /> </Route>
        <Route path="/more" > <More /> </Route>
        <Route path="/measurementsPoints" > <MeasurementPoint /> </Route>
      </Switch>
    </Router>
  );
}

export default App;
