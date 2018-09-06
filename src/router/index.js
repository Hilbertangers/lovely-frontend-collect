import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import waterWave from '../views/waterWave';
import clickWave from '../views/clickWave';
import piano from '../views/piano';
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
                </div>
            </Router>
        );
    }
}

export default GetRouter;