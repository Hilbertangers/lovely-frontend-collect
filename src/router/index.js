import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import waterWave from '../views/waterWave';
import clickWave from '../views/clickWave';
import piano from '../views/piano';
import rainDrop from '../views/rainDrop';
import clipCover from '../views/clipCover';
import springEffect from '../views/springEffect';
import bulbSwitch from '../views/bulbSwitch/view';
import numberRoll from '../views/numberRoll';
import home from '../views/home';

class GetRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={home}></Route>
                    <Route path="/clickWave" component={clickWave}></Route>
                    <Route path="/waterWave" component={waterWave}></Route>
                    <Route path="/piano" component={piano}></Route>
                    <Route path="/rainDrop" component={rainDrop}></Route>
                    <Route path="/clipCover" component={clipCover}></Route>
                    <Route path="/springEffect" component={springEffect}></Route>
                    <Route path="/bulbSwitch" component={bulbSwitch}></Route>
                    <Route path="/numberRoll" component={numberRoll}></Route>
                </div>
            </Router>
        );
    }
}

export default GetRouter;