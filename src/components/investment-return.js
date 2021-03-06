import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import requiresLogin from './requires-login';
import Chart from './chart';
import Button from './button';

import { fetchPortfolio } from '../actions/portfolio';

const numeral = require('numeral');

export class InvestmentReturn extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchPortfolio());
    }
    
    keepInvesting = () => {
        console.log('Keep Investing');
    }

    toFiveYearReview = () => {
        console.log('to Five Year Review was clicked');
    }

    returnToPortfolio = () => {
        console.log('Return to Portfolio');
    }

    render() {
        let investmentReturnContent = 'Loading...';
        let { portfolio, year, previousFund, currentFund } = this.props;
        let investmentLink,
            name,
            handleClick;

        if (this.props.year === 5){
            investmentLink = '/five-year-market';
            name = 'See Five Year Market Recap';
            handleClick = this.toFiveYearReview;
        } else{
            investmentLink = '/investment-form';
            name = 'Keep Investing!';
            handleClick = this.keepInvesting;
        }

        if (portfolio) {
          console.log('this is the portfolio', portfolio)
            let previousFundFormat = numeral(previousFund).format('0,0');
            let currentFundFormat = numeral(currentFund).format('0,0');

            const data = [
                {									
                    points: portfolio,
                    color: '#C24275'
                }
            ];

            let growth,
                strategy;

            if (portfolio[year]) {
                growth = portfolio[year].growth;
                strategy = portfolio[year].strategy;
            }
            
            investmentReturnContent = (
                <div>    
                    <h2 className='primary-heading'>Investment Returns: Year {year}</h2>
                    <h3 className='secondary-heading primary-text-color'>Investment Strategy:  {strategy}</h3>
                    <Chart yMin={3000} xMax={5} data={data} />
                    
                    <h3 className='secondary-heading primary-text-color small-padding-right'>Portfolio Summary Year {year}:</h3>
                    
                    <div className="vector-wrapper flex-start">
                        <div className='blurb-wrapper descriptive-content flex-row min-width-blurb'>
                            <h4 className='margin-top'>Start: </h4>
                            <p className='margin-left'> ${previousFundFormat}</p>
                        </div>
                        <div className='blurb-wrapper descriptive-content flex-row min-width-blurb'>
                            <h4 className='margin-top'>Growth: </h4>
                            <p className='margin-left'> {growth}%</p>
                        </div>
                        <div className='blurb-wrapper descriptive-content flex-row min-width-blurb'>
                            <h4 className='margin-top'>End: </h4>
                            <p className='margin-left'> ${currentFundFormat} </p>
                        </div>
                    </div>
                    <div className='small-margin-top'>
                        <Link to='/portfolio'>
                            <Button class='green-button no-left-margin small-all-margins' name='Return to Portfolio' handleClick={this.returnToPortfolio} />
                        </Link>
                        <Link to={investmentLink}>
                            <Button class='blue-button small-no-margin-top' name={name} handleClick={handleClick} />
                        </Link>
                    </div>    
                </div>
            )
        }
        
        return (
            <div className="medium-viewport">
                {investmentReturnContent}    
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        portfolio: state.portfolio.portfolio,
        year: state.portfolio.year,
        previousFund: state.portfolio.previousFund,
        currentFund: state.portfolio.currentFund
    };
};

export default requiresLogin()(connect(mapStateToProps)(InvestmentReturn));
