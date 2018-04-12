import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import requiresLogin from './requires-login';
import CompletedLevelOne from './completed-level-one';
import Button from './button';

import { fetchPortfolio, chooseRiskTolerance, investFunds, incrementYear } from '../actions/portfolio';

let numeral = require('numeral');

export class InvestmentForm extends React.Component {
    componentDidMount() {
        if (this.props.portfolio === null) {
            this.props.dispatch(fetchPortfolio());
        }
    }

    invest = () => {
        this.props.dispatch(investFunds(this.props.riskChoice, this.props.year + 1, this.props.currentFund));
        this.props.dispatch(incrementYear());
    }

    onChange = event => {
        this.props.dispatch(chooseRiskTolerance(event.target.value));
    }

    render() {
        if (this.props.year >= 5){
            return (
                <CompletedLevelOne/>
            );
        }
        else{
            let currentFundFormat = numeral(this.props.currentFund).format('0,0');
            return (
                <div className="small-viewport">
                    <h2 className="primary-heading">Year {this.props.year + 1}</h2>

                    <h3 className="secondary-heading primary-text-color margin-left-large">Current Fund: ${currentFundFormat}</h3>
                    
                    <fieldset className='radio-button-container no-border no-padding margin-bottom'>
                        <legend className="secondary-heading primary-text-color margin-bottom  margin-left-med">How would you like to invest this year?</legend>
                        <div className='margin-left-large'>
                            <label className="descriptive-content primary-text-color radio-button-label" htmlFor='rb1'>Aggressive
                                <input className='native-button' type='radio' name='strategy' id='rb1' value='Aggressive' onChange={this.onChange.bind(this)} />
                                <span className='custom-radio-button'></span>
                            </label>
                            <label className="descriptive-content primary-text-color radio-button-label" htmlFor='rb2'>Moderate
                                <input className='native-button' type='radio' name='strategy' id='rb2' value='Moderate' onChange={this.onChange.bind(this)} />
                                <span className='custom-radio-button'></span>
                            </label>
                            <label className="descriptive-content primary-text-color radio-button-label" htmlFor='rb3'>Conservative
                                <input className='native-button' type='radio' name='strategy' id='rb3' value='Conservative' onChange={this.onChange.bind(this)} />
                                <span className='custom-radio-button'></span>
                            </label>
                            <label className="descriptive-content primary-text-color radio-button-label" htmlFor='rb4'>Under Your Mattress
                                <input className='native-button' type='radio' name='strategy' id='rb4' value='Mattress' onChange={this.onChange.bind(this)} />
                                <span className='custom-radio-button'></span>
                            </label>
                        </div>    
                    </fieldset>
                    <div className='right-align-object'>

                        <Link to='/market-analysis'>
                            <Button class='blue-button' name='Invest' handleClick={this.invest} />
                        </Link>   
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        year: state.portfolio.year,
        currentFund: state.portfolio.currentFund,
        riskChoice: state.portfolio.riskChoice,
        portfolio: state.portfolio.portfolio
    };
};

export default requiresLogin()(connect(mapStateToProps)(InvestmentForm));
