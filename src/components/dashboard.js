import React from 'react';
import { connect } from 'react-redux';

import requiresLogin from './requires-login';
import IntroductionPage from './introduction-page';
import Portfolio from './portfolio';

export class Dashboard extends React.Component {

    render() {

        let dashboardComponent;

        if (this.props.introComplete || this.props.introStartValue) {
            dashboardComponent = <Portfolio/>
        } else {
            dashboardComponent =  <IntroductionPage/>
        }

        return (
            <div className="dashboard viewport">
                <h3 className="dashboard-name secondary-heading">Welcome {this.props.name}!</h3>
                {dashboardComponent}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: currentUser.firstName,
        introComplete: state.introReducer.introComplete !== false,
        introStartValue: state.auth.currentUser.intro !== false
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
