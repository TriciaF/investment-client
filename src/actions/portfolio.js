import { API_BASE_URL } from '../config';

export const CHOOSE_RISK_TOLERANCE = 'CHOOSE_RISK_TOLERANCE';
export const chooseRiskTolerance = riskChoice => ({
  type: CHOOSE_RISK_TOLERANCE,
  riskChoice
});

export const FETCH_PORTFOLIO_REQUEST = 'FETCH_PORTFOLIO_REQUEST';
export const fetchPortfolioRequest = () => ({
  type: FETCH_PORTFOLIO_REQUEST
});

export const FETCH_PORTFOLIO_SUCCESS = 'FETCH_PORTFOLIO_SUCCESS';
export const fetchPortfolioSuccess = user => ({
  type: FETCH_PORTFOLIO_SUCCESS,
  year: user.year,
  portfolio: user.risk,
  previousFund: user.previousFund,
  currentFund: user.currentFund,
  year5Amt: user.year5Amt
});

export const FETCH_PORTFOLIO_ERROR = 'FETCH_PORTFOLIO_ERROR';
export const fetchPortfolioError = error => ({
  type: FETCH_PORTFOLIO_ERROR,
  error
});

export const fetchPortfolio = () => (dispatch, getState) => {
    dispatch(fetchPortfolioRequest());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/users/self`, 
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }
    )
      .then(res => {
        if (!res.ok) {
          return Promise.reject('Something has gone wrong');
        }
        return res.json()
      })
      .then(user => {
        dispatch(fetchPortfolioSuccess(user))
      })
      .catch(err => 
        dispatch(fetchPortfolioError(err))
      )
}

export const INVEST_FUNDS_REQUEST = 'INVEST_FUNDS_REQUEST';
export const investFundsRequest = () => ({
  type: INVEST_FUNDS_REQUEST
});

export const INVEST_FUNDS_SUCCESS = 'INVEST_FUNDS_SUCCESS';
export const investFundsSuccess = () => ({
  type: INVEST_FUNDS_SUCCESS
});

export const INVEST_FUNDS_ERROR = 'INVEST_FUNDS_ERROR';
export const investFundsError = error => ({
  type: INVEST_FUNDS_ERROR,
  error
});

export const investFunds = (risk, year, currentFund) => (dispatch, getState) => {
  dispatch(investFundsRequest());
    const authToken = getState().auth.authToken;
    const data = ({
        risk,
        year,
        currentFund
    });
	return fetch(`${API_BASE_URL}/risk/invest`,{
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        		'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${authToken}`
			}
		}).then(res => {
			if (!res.ok) {
				return Promise.reject('Something has gone wrong');
			}
			return res.json()
		})
		.then(() => {
      dispatch(investFundsSuccess());
		})
		.catch(err => 
			dispatch(investFundsError(err))
		)
}

export const PROCEED_TO_LVL2_REQUEST = 'PROCEED_TO_LVL2_REQUEST';
export const proceedToLvl2Request = () => ({
  type: PROCEED_TO_LVL2_REQUEST
});

export const PROCEED_TO_LVL2_SUCCESS = 'PROCEED_TO_LVL2_SUCCESS';
export const proceedToLvl2Success = year5Amt => ({
  type: PROCEED_TO_LVL2_SUCCESS,
  year5Amt
});

export const PROCEED_TO_LVL2_ERROR = 'PROCEED_TO_LVL2_ERROR';
export const proceedToLvl2Error = error => ({
  type: PROCEED_TO_LVL2_ERROR,
  error
});

export const proceedToLvl2 = fund => (dispatch, getState) => {
	dispatch(proceedToLvl2Request());
  const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/level2/${fund}`, 
		{
      method: 'PUT',
      headers: {
        		'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${authToken}`
			}
		}).then(res => {
			if (!res.ok) {
				return Promise.reject('Something has gone wrong');
			}
			return res.json()
		})
		.then(() => {
      dispatch(proceedToLvl2Success(fund));
		})
		.catch(err => 
			dispatch(proceedToLvl2Error(err))
		)
}

export const INVEST_FUNDS_LVL2_REQUEST = 'INVEST_FUNDS_LVL2_REQUEST';
export const investFundsLvl2Request = () => ({
  type: INVEST_FUNDS_LVL2_REQUEST
});

export const INVEST_FUNDS_LVL2_SUCCESS = 'INVEST_FUNDS_LVL2_SUCCESS';
export const investFundsLvl2Success = () => ({
  type: INVEST_FUNDS_LVL2_SUCCESS
});

export const INVEST_FUNDS_LVL2_ERROR = 'INVEST_FUNDS_LVL2_ERROR';
export const investFundsLvl2Error = error => ({
  type: INVEST_FUNDS_LVL2_ERROR,
  error
});

export const investFundsLvl2 = (aggressive, moderate, conservative, mattress, google, autoZone, dollarTree, ea, year, currentFund) => (dispatch, getState) => {
	dispatch(investFundsLvl2Request());
    const authToken = getState().auth.authToken;
    const data = ({
        aggressive, 
        moderate, 
        conservative, 
        mattress, 
        google, 
        autoZone, 
        dollarTree, 
        ea,
        year,
        currentFund
    });
	return fetch(`${API_BASE_URL}/level2/invest`, 
		{
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        		'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${authToken}`
			}
		}).then(res => {
			if (!res.ok) {
				return Promise.reject('Something has gone wrong');
			}
			return res.json()
		})
		.then(() => {
            dispatch(investFundsLvl2Success());
		})
		.catch(err => 
			dispatch(investFundsLvl2Error(err))
		)
}

export const INCREMENT_YEAR = 'INCREMENT_YEAR';
export const incrementYear = () => ({
  type: INCREMENT_YEAR
});

export const FETCH_RISK_OVERVIEW_REQUEST = 'FETCH_RISK_OVERVIEW_REQUEST';
export const fetchRiskOverviewRequest = () => ({
  type: FETCH_RISK_OVERVIEW_REQUEST
});

export const FETCH_RISK_OVERVIEW_SUCCESS = 'FETCH_RISK_OVERVIEW_SUCCESS';
export const fetchRiskOverviewSuccess = risks => ({
  type: FETCH_RISK_OVERVIEW_SUCCESS,
  risks
});

export const FETCH_RISK_OVERVIEW_ERROR = 'FETCH_RISK_OVERVIEW_ERROR';
export const fetchRiskOverviewError = error => ({
  type: FETCH_RISK_OVERVIEW_ERROR,
  error
});

export const fetchRiskOverview = year => (dispatch, getState) => {
    dispatch(fetchRiskOverviewRequest());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/risk/invest/${year}`, 
    {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`
        }
    })
        .then(res => {
            if (!res.ok) {
                return Promise.reject('Something has gone wrong');
            }
            return res.json()
        })
        .then(risks => {
            dispatch(fetchRiskOverviewSuccess(risks))
        })
        .catch(err => 
            dispatch(fetchRiskOverviewError(err))
        )
};

export const UPDATE_INVESTMENT_STRATEGY = 'UPDATE_INVESTMENT_STRATEGY';
export const updateInvestmentStrategy = (strategy, riskAmount) => ({
  type: UPDATE_INVESTMENT_STRATEGY,
  strategy,
  riskAmount
});

export const BLANK_INVESTMENT_STRATEGY_ENTRY = 'BLANK_INVESTMENT_STRATEGY_ENTRY';
export const blankInvestmentStrategyEntry = strategy => ({
  type: BLANK_INVESTMENT_STRATEGY_ENTRY,
  strategy
});

export const RESTART_LEVEL_1_REQUEST = 'RESTART_LEVEL_1_REQUEST';
export const restartLevel1Request = () => ({
  type: RESTART_LEVEL_1_REQUEST,
});

export const RESTART_LEVEL_1_SUCCESS = 'RESTART_LEVEL_1_SUCCESS';
export const restartLevel1Success = (user) => ({
  type: RESTART_LEVEL_1_SUCCESS,
  previousFund: user.previousFund,
  currentFund: user.currentFund,
  year: user.year,
  portfolio: null,
});

export const RESTART_LEVEL_1_ERROR = 'RESTART_LEVEL_1_ERROR';
export const restartLevel1Error = (error) => ({
  type: RESTART_LEVEL_1_ERROR,
  error
});


export const restartLevel1 = ()=> (dispatch, getState) => {
  dispatch(restartLevel1Request());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/users/restart/`, 
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(res => {
          if (!res.ok) {
              return Promise.reject('Something has gone wrong');
          }
          return res.json()
      })
      .then(user => {
        //console.log('User back from PUT = ', user);
          dispatch(restartLevel1Success(user))
      })
      .catch(err => 
          dispatch(restartLevel1Error(err))
      )
}; 
