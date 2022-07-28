import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Grid,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  TextField,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Checkbox,
} from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

const NordnetCalc = () => {
  const storage = require('electron-json-storage');
  const os = require('os');
  storage.setDataPath(`/Users/tingan/Documents`);

  const tariff = [
    { level: 0, country_code: 'fi', fee: 0.00055, min_fee: 3 },
    { level: 1, country_code: 'fi', fee: 0.0006, min_fee: 3 },
    { level: 2, country_code: 'fi', fee: 0.001, min_fee: 5 },
    { level: 3, country_code: 'fi', fee: 0.0015, min_fee: 7 },
    { level: 4, country_code: 'fi', fee: 0.002, min_fee: 9 },
    { level: 0, country_code: 'no', fee: 0.0006, min_fee: 4 },
    { level: 1, country_code: 'no', fee: 0.0008, min_fee: 10 },
    { level: 2, country_code: 'no', fee: 0.0012, min_fee: 10 },
    { level: 3, country_code: 'no', fee: 0.0018, min_fee: 10 },
    { level: 4, country_code: 'no', fee: 0.0025, min_fee: 10 },
    { level: 0, country_code: 'se', fee: 0.0006, min_fee: 4 },
    { level: 1, country_code: 'se', fee: 0.0008, min_fee: 10 },
    { level: 2, country_code: 'se', fee: 0.0012, min_fee: 10 },
    { level: 3, country_code: 'se', fee: 0.0018, min_fee: 10 },
    { level: 4, country_code: 'se', fee: 0.0025, min_fee: 10 },
    { level: 0, country_code: 'dk', fee: 0.0006, min_fee: 4 },
    { level: 1, country_code: 'dk', fee: 0.0008, min_fee: 10 },
    { level: 2, country_code: 'dk', fee: 0.0012, min_fee: 10 },
    { level: 3, country_code: 'dk', fee: 0.0018, min_fee: 10 },
    { level: 4, country_code: 'dk', fee: 0.0025, min_fee: 10 },
    { level: 0, country_code: 'de', fee: 0.0007, min_fee: 7 },
    { level: 1, country_code: 'de', fee: 0.0012, min_fee: 15 },
    { level: 2, country_code: 'de', fee: 0.0015, min_fee: 15 },
    { level: 3, country_code: 'de', fee: 0.002, min_fee: 15 },
    { level: 4, country_code: 'de', fee: 0.003, min_fee: 15 },
    { level: 0, country_code: 'us', fee: 0.0007, min_fee: 7 },
    { level: 1, country_code: 'us', fee: 0.0012, min_fee: 15 },
    { level: 2, country_code: 'us', fee: 0.0015, min_fee: 15 },
    { level: 3, country_code: 'us', fee: 0.002, min_fee: 15 },
    { level: 4, country_code: 'us', fee: 0.003, min_fee: 15 },
  ];
  const country_currency = [
    {
      country_code: 'fi',
      country_name: 'Finland',
      currency_code: 'EUR',
      currency_symbol: '€',
      currency_ratio: 1,
    },
    {
      country_code: 'no',
      country_name: 'Norway',
      currency_code: 'NOK',
      currency_symbol: 'kr',
      currency_ratio: 0.098,
    },
    {
      country_code: 'se',
      country_name: 'Sweden',
      currency_code: 'SEK',
      currency_symbol: 'kr',
      currency_ratio: 0.098,
    },
    {
      country_code: 'dk',
      country_name: 'Denmark',
      currency_code: 'DKK',
      currency_symbol: 'kr',
      currency_ratio: 0.13,
    },
    {
      country_code: 'de',
      country_name: 'Germany',
      currency_code: 'EUR',
      currency_symbol: '€',
      currency_ratio: 1,
    },
    {
      country_code: 'us',
      country_name: 'USA',
      currency_code: 'USD',
      currency_symbol: '$',
      currency_ratio: 0.84,
    },
  ];

  let levels = [4, 3, 2, 1, 0];
  // http://data.fixer.io/
  const apiKey = '1b742cfdacb2fa3d9e141facb357d219';
  const apiHost = 'http://data.fixer.io/';
  const base = 'EUR';

  const [level, setLevel] = useState(0);
  const [country, setCountry] = useState('fi');
  const [buyPrice, setBuyPrice] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [minSellPrice, setMinSellPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [minAmount, setMinAmount] = useState(0);
  const [currencyRatio, setCurrencyRatio] = useState(1);
  const [buyTotal, setBuyTotal] = useState(0);
  const [buyFees, setBuyFees] = useState(0);
  const [sellTotal, setSellTotal] = useState(0);
  const [sellFees, setSellFees] = useState(0);
  const [profit, setProfit] = useState(0);
  const [minProfit, setMinProfit] = useState(30);
  const [minFees, setMinFees] = useState(0);
  const [currencyName, setCurrencyName] = useState('EUR');
  const [currencySymbol, setCurrencySymbol] = useState('€');
  const [win, setWin] = useState(false);
  const [roi, setROI] = useState(0);
  const [maxLoss, setMaxLoss] = useState(-2);
  const [stopLoss, setStopLoss] = useState(0);
  const [stopLosses, setStopLosses] = useState('');
  const [maxPrice, setMaxPrice] = useState(0);
  const [fallBy, setFallBy] = useState(2);
  const [sellActivationPrice, setSellActivationPrice] = useState(0);
  const [belowBy, setBelowBy] = useState(1);
  const [sellPrice2, setSellPrice2] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [riseBy, setRiseBy] = useState(2);
  const [buyActivationPrice, setBuyActivationPrice] = useState(0);
  const [aboveBy, setAboveBy] = useState(1);
  const [buyPrice2, setBuyPrice2] = useState(0);
  const [diff, setDiff] = useState(0);
  const [nokEur, setNokEur] = useState(0.098);
  const [sekEur, setSekEur] = useState(0.098);
  const [dkkEur, setDkkEur] = useState(0.13);
  const [usdEur, setUsdEur] = useState(0.84);
  const [balance, setBalance] = useState(0);
  const [balancePercentage, setBalancePercentage] = useState(20);
  const [balanceInvested, setBalanceInvested] = useState(0);
  const [balanceShares, setBalanceShares] = useState(0);
  const [lent, setLent] = useState(0);
  const [lentPercentage, setLentPercentage] = useState(10);
  const [lentInvested, setLentInvested] = useState(0);
  const [lentShares, setLentShares] = useState(0);
  const [onePercent, setOnePercent] = useState(0);
  const [twoPercent, setTwoPercent] = useState(0);
  const [threePercent, setThreePercent] = useState(0);
  const [fourPercent, setFourPercent] = useState(0);
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function getTariffItem() {
    let ret = tariff.filter((item) => {
      return item.level == level && item.country_code == country;
    });
    return ret[0];
  }
  function update_buy() {
    let buy_total = (buyPrice * amount * currencyRatio).toFixed(3);
    setBuyTotal(buy_total);
    let ret = getTariffItem();
    let buy_fees = (ret.fee * buy_total).toFixed(3);
    if (buy_fees < ret.min_fee && buy_total > 0) {
      buy_fees = ret.min_fee;
    }
    setBuyFees(buy_fees);
  }
  function update_sell() {
    let sell_total = (sellPrice * amount * currencyRatio).toFixed(3);
    setSellTotal(sell_total);
    let ret = getTariffItem();
    let sell_fees = (ret.fee * sell_total).toFixed(3);
    if (sell_fees < ret.min_fee && sell_total > 0) {
      sell_fees = ret.min_fee;
    }
    setSellFees(sell_fees);
  }

  useEffect(() => {
    let ret = getTariffItem();
    const foundValue = country_currency.filter(
      (item) => item.country_code == country
    );
    const a = parseFloat(
      parseFloat(minProfit) + parseFloat(buyTotal) + parseFloat(buyFees)
    );
    const b = amount * currencyRatio * (1 - ret.fee);
    const min_sell_price = (a / b).toFixed(4);
    const a2 = parseFloat(buyTotal) + parseFloat(buyFees); // minProfit == 0 case
    const min_sell_price2 = (a2 / b).toFixed(4);
    if (buyPrice > 0 && amount > 0) {
      if (buyPrice > 0 && sellPrice > 0) {
        const price_diff = (((sellPrice - buyPrice) / buyPrice) * 100).toFixed(
          1
        );
        setMinSellPrice(
          min_sell_price + ' / ' + min_sell_price2 + ' / ' + price_diff
        );
      } else {
        setMinSellPrice(min_sell_price + ' / ' + min_sell_price2);
      }

      //setSellPrice(min_sell_price);
    } else {
      setMinSellPrice(0);
    }
  }, [buyTotal, buyFees, minProfit, amount, sellPrice]);

  useEffect(() => {
    storage.get('nordnet', function (error, data) {
      if (error) {
        console.log(error);
      } else {
        if (data.hasOwnProperty('level')) {
          setLevel(data.level);
        }
        if (data.hasOwnProperty('country_code')) {
          setCountry(data.country_code);
        }
        if (data.hasOwnProperty('min_profit')) {
          setMinProfit(data.min_profit);
        }
        if (data.hasOwnProperty('max_loss')) {
          setMaxLoss(data.max_loss);
        }
        if (data.hasOwnProperty('nokEur')) {
          setNokEur(data.nokEur);
        }
        if (data.hasOwnProperty('sekEur')) {
          setSekEur(data.sekEur);
        }
        if (data.hasOwnProperty('dkkEur')) {
          setDkkEur(data.dkkEur);
        }
        if (data.hasOwnProperty('usdEur')) {
          setUsdEur(data.usdEur);
        }
        if (data.hasOwnProperty('balance')) {
          setBalance(data.balance);
        }
        if (data.hasOwnProperty('balancePercentage')) {
          setBalancePercentage(data.balancePercentage);
        }
        if (data.hasOwnProperty('lent')) {
          setLent(data.lent);
        }
        if (data.hasOwnProperty('lentPercentage')) {
          setLentPercentage(data.lentPercentage);
        }
      }
    });
  }, []);
  useEffect(() => {
    const ret = getTariffItem();
    setMinFees(ret.min_fee);
    update_buy();
    update_sell();
    storage.set(
      'nordnet',
      {
        level: level,
        country_code: country,
        min_profit: minProfit,
        max_loss: maxLoss,
        nokEur: nokEur,
        sekEur: sekEur,
        dkkEur: dkkEur,
        usdEur: usdEur,
        balance: balance,
        balancePercentage: balancePercentage,
        lent: lent,
        lentPercentage: lentPercentage,
      },
      function (error) {
        if (error) throw error;
      }
    );
  }, [
    level,
    country,
    minProfit,
    maxLoss,
    nokEur,
    sekEur,
    dkkEur,
    usdEur,
    balance,
    balancePercentage,
    lent,
    lentPercentage,
  ]);

  useEffect(() => {
    const foundValue = country_currency.filter(
      (item) => item.country_code == country
    );
    setCurrencyName(foundValue[0].currency_code);
    setCurrencySymbol(foundValue[0].currency_symbol);
    const apiUrl =
      `${apiHost}api/latest?access_key=${apiKey}&base=${base}&symbols=` +
      foundValue[0].currency_code;
    if (foundValue[0].currency_code === 'EUR') {
      setCurrencyRatio(1);
    } else {
      /*
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setCurrencyRatio(
              (1 / data.rates[foundValue[0].currency_code]).toFixed(10)
            );
          } else {
            setCurrencyRatio(NaN);
          }
        });
        */
      // setCurrencyRatio(foundValue[0].currency_ratio);
      switch (foundValue[0].currency_code) {
        case 'NOK':
          setCurrencyRatio(nokEur);
          break;
        case 'SEK':
          setCurrencyRatio(sekEur);
          break;
        case 'DKK':
          setCurrencyRatio(dkkEur);
          break;
        case 'USD':
          setCurrencyRatio(usdEur);
          break;
        default:
          setCurrencyRatio(1);
      }
    }
  }, [country, nokEur, sekEur, dkkEur, usdEur]);

  useEffect(() => {
    const foundValue = country_currency.filter(
      (item) => item.country_code == country
    );
    let currency_ratio = currencyRatio;
    let ret = getTariffItem();
    const min_amount = Math.ceil(
      ret.min_fee / (currency_ratio * ret.fee * buyPrice)
    );
    const round_min_amount = Math.ceil((min_amount + 1) / 10) * 10;
    if (buyPrice > 0) {
      setMinAmount(min_amount);
      setAmount(round_min_amount);
    } else {
      setMinAmount(0);
    }
  }, [country, buyPrice, level]);

  useEffect(() => {
    update_buy();
    update_sell();
  }, [level, country, buyPrice, sellPrice, amount, currencyRatio]);

  useEffect(() => {
    let profit_value = 0;
    if (sellTotal > 0 && buyTotal > 0) {
      profit_value = sellTotal - sellFees - buyTotal - buyFees;
    }
    setProfit(profit_value.toFixed(3));
    if (profit_value < 0) {
      setWin(false);
    } else {
      setWin(true);
    }
    let local_roi = 0;
    if (buyTotal > 0) {
      //local_roi =
      //  (parseFloat(profit_value) / parseFloat(buyTotal + buyFees + sellFees)) *
      //   100;
      if (profit_value >= 0) {
        // calc 1/2 loss value
        local_roi = parseFloat(profit_value) * -0.5;
      } else {
        // calc 2 profit value
        local_roi = parseFloat(profit_value) * -2;
      }
    }
    setROI(local_roi.toFixed(3));
  }, [sellTotal, sellFees, buyTotal, buyFees]);

  useEffect(() => {
    const foundValue = country_currency.filter(
      (item) => item.country_code == country
    );
    let currency_ratio = currencyRatio;
    let ret = getTariffItem();
    const buy_total = buyPrice * amount * currency_ratio;
    const buy_fees = buy_total * ret.fee;
    let factor = 1 + parseFloat(maxLoss) / 100;
    let a = factor * (buy_total + buy_fees);
    let b = amount * currency_ratio * (1 - ret.fee * factor);
    let stop_loss_price = (a / b).toFixed(3);
    let sell_total = stop_loss_price * amount * currency_ratio;
    let sell_fees = sell_total * ret.fee;
    let loss = sell_total * (1 - ret.fee) - buy_total * (1 + ret.fee);
    if (sell_fees < ret.min_fee) {
      sell_fees = ret.min_fee;
      a = factor * (sell_fees + buy_total + buy_fees);
      b = amount * currency_ratio;
      stop_loss_price = (a / b).toFixed(3);
      loss = sell_total - sell_fees - buy_total * (1 + ret.fee);
    }
    const price_diff = (
      ((stop_loss_price - buyPrice) / buyPrice) *
      100
    ).toFixed(2);

    if (buyPrice > 0 && amount > 0) {
      setStopLoss(
        (a / b).toFixed(3) + '/' + price_diff + '%/' + loss.toFixed(0)
      );
    } else {
      setStopLoss(0);
    }
  }, [buyPrice, amount, country, level, maxLoss]);

  useEffect(() => {
    const foundValue = country_currency.filter(
      (item) => item.country_code == country
    );
    let currency_ratio = currencyRatio;
    let ret = getTariffItem();
    const buyPrice_in_euro = buyPrice * currency_ratio;
    const balance_invested = balance * balancePercentage * 0.01;
    const balance_shares =
      balance_invested / (buyPrice_in_euro * (1 + ret.fee));
    if (balance > 0 && balancePercentage > 0) {
      setBalanceInvested(balance_invested.toFixed(1));
    } else {
      setBalanceInvested(0);
    }

    if (buyPrice > 0 && balance > 0) {
      setBalanceShares(balance_shares.toFixed(0));
    } else {
      setBalanceShares(0);
    }
  }, [buyPrice, balance, balancePercentage]);

  useEffect(() => {
    const foundValue = country_currency.filter(
      (item) => item.country_code == country
    );
    let currency_ratio = currencyRatio;
    let ret = getTariffItem();
    const buyPrice_in_euro = buyPrice * currency_ratio;
    const lent_invested = lent * lentPercentage * 0.01;
    const lent_shares = lent_invested / (buyPrice_in_euro * (1 + ret.fee));
    if (lent > 0 && lentPercentage > 0) {
      setLentInvested(lent_invested.toFixed(1));
    } else {
      setLentInvested(0);
    }
    if (buyPrice > 0 && lent > 0) {
      setLentShares(lent_shares.toFixed(0));
    } else {
      setLentShares(0);
    }
  }, [buyPrice, lent, lentPercentage]);

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleBuyPriceChange = (e) => {
    setBuyPrice(e.target.value);
  };

  const handleSellPriceChange = (e) => {
    setSellPrice(e.target.value);
  };

  const handleMinSellPriceChange = (e) => {
    setMinSellPrice(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleMinAmountChange = (e) => {
    setMinAmount(e.target.value);
  };

  const handleCurrencyRatioChange = (e) => {
    setCurrencyRatio(e.target.value);
  };

  const handleBuyTotalChange = (e) => {
    setBuyTotal(e.target.value);
  };
  const handleBuyFeesChange = (e) => {
    setBuyFees(e.target.value);
  };

  const handleSellTotalChange = (e) => {
    setSellTotal(e.target.value);
  };

  const handleSellFeesChange = (e) => {
    setSellFees(e.target.value);
  };

  const handleProfitChange = (e) => {
    setProfit(e.target.value);
  };

  const handleMinProfitChange = (e) => {
    setMinProfit(e.target.value);
  };

  const handleROIChange = (e) => {
    setROI(e.target.value);
  };

  const handleMaxLossChange = (e) => {
    setMaxLoss(e.target.value);
  };

  const handleStopLossChange = (e) => {
    setStopLoss(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };
  const handleFallByChange = (e) => {
    setFallBy(e.target.value);
  };
  const handleSellActivationPriceChange = (e) => {
    setSellActivationPrice(e.target.value);
  };
  const handleBelowByChange = (e) => {
    setBelowBy(e.target.value);
  };
  const handleSellPrice2Change = (e) => {
    setSellPrice2(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };
  const handleRiseByChange = (e) => {
    setRiseBy(e.target.value);
  };
  const handleBuyActivationPriceChange = (e) => {
    setBuyActivationPrice(e.target.value);
  };
  const handleAboveByChange = (e) => {
    setAboveBy(e.target.value);
  };
  const handleBuyPrice2Change = (e) => {
    setSellPrice2(e.target.value);
  };

  const handleDiffChange = (e) => {
    setDiff(e.target.value);
  };

  const handleNokEurChange = (e) => {
    setNokEur(e.target.value);
  };
  const handleSekEurChange = (e) => {
    setSekEur(e.target.value);
  };
  const handleDkkEurChange = (e) => {
    setDkkEur(e.target.value);
  };
  const handleUsdEurChange = (e) => {
    setUsdEur(e.target.value);
  };

  const handleBalanceChange = (e) => {
    setBalance(e.target.value);
  };

  const handleBalancePercentageChange = (e) => {
    setBalancePercentage(e.target.value);
  };

  const handleBalanceInvestedChange = (e) => {
    setBalanceInvested(e.target.value);
  };

  const handleBalanceSharesChange = (e) => {
    setBalanceShares(e.target.value);
  };

  const handleLentChange = (e) => {
    setLent(e.target.value);
  };

  const handleLentPercentageChange = (e) => {
    setLentPercentage(e.target.value);
  };

  const handleLentInvestedChange = (e) => {
    setLentInvested(e.target.value);
  };

  const handleLentSharesChange = (e) => {
    setLentShares(e.target.value);
  };

  const handleOnePercentChange = (e) => {
    setOnePercent(e.target.value);
  };
  const handleTwoPercentChange = (e) => {
    setTwoPercent(e.target.value);
  };
  const handleThreePercentChange = (e) => {
    setThreePercent(e.target.value);
  };
  const handleFourPercentChange = (e) => {
    setFourPercent(e.target.value);
  };

  useEffect(() => {
    if (maxPrice > 0 && fallBy > 0) {
      setSellActivationPrice((maxPrice * (100 - fallBy) * 0.01).toFixed(3));
    } else {
      setSellActivationPrice(0);
    }
  }, [maxPrice, fallBy]);
  useEffect(() => {
    if (sellActivationPrice > 0 && belowBy > 0) {
      setSellPrice2((sellActivationPrice * (100 - belowBy) * 0.01).toFixed(3));
    } else {
      setSellPrice2(0);
    }
  }, [sellActivationPrice, belowBy]);

  useEffect(() => {
    if (minPrice > 0 && riseBy > 0) {
      setBuyActivationPrice((minPrice * (1 + riseBy * 0.01)).toFixed(3));
    } else {
      setBuyActivationPrice(0);
    }
  }, [minPrice, riseBy]);
  useEffect(() => {
    if (buyActivationPrice > 0 && aboveBy > 0) {
      setBuyPrice2((buyActivationPrice * (1 + aboveBy * 0.01)).toFixed(3));
    } else {
      setBuyPrice2(0);
    }
  }, [buyActivationPrice, aboveBy]);

  useEffect(() => {
    if (roi != 0) {
      let ret = getTariffItem();
      const foundValue = country_currency.filter(
        (item) => item.country_code == country
      );
      const a = parseFloat(
        parseFloat(roi) + parseFloat(buyTotal) + parseFloat(buyFees)
      );
      const b = amount * currencyRatio * (1 - ret.fee);
      const min_sell_price = (a / b).toFixed(3);
      const price_diff = (
        ((min_sell_price - buyPrice) / buyPrice) *
        100
      ).toFixed(1);
      setDiff(min_sell_price + '/' + price_diff);
    } else {
      setDiff(0);
    }
  }, [roi]);

  useEffect(() => {
    if (buyPrice > 0) {
      const one_percent_plus = buyPrice * 1.01;
      const one_percent_minus = buyPrice * (1 - 0.01);
      const two_percent_plus = buyPrice * 1.02;
      const two_percent_minus = buyPrice * (1 - 0.02);
      const three_percent_plus = buyPrice * 1.03;
      const three_percent_minus = buyPrice * (1 - 0.03);
      const four_percent_plus = buyPrice * 1.04;
      const four_percent_minus = buyPrice * (1 - 0.04);
      setOnePercent(
        one_percent_minus.toFixed(3) + ' / ' + one_percent_plus.toFixed(3)
      );
      setTwoPercent(
        two_percent_minus.toFixed(3) + ' / ' + two_percent_plus.toFixed(3)
      );
      setThreePercent(
        three_percent_minus.toFixed(3) + ' / ' + three_percent_plus.toFixed(3)
      );
      setFourPercent(
        four_percent_minus.toFixed(3) + ' / ' + four_percent_plus.toFixed(3)
      );
    } else {
      setOnePercent(0);
      setTwoPercent(0);
      setThreePercent(0);
      setFourPercent(0);
    }
  }, [buyPrice]);

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { background: 'red' } }}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Calc (止损!!!)" {...a11yProps(0)} />
          <Tab label="Settings" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <>
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item xs={3}>
                <FormControl>
                  <InputLabel id="level-label">Level</InputLabel>
                  <Select
                    labelId="level-label"
                    id="level-select"
                    value={level}
                    onChange={handleLevelChange}
                  >
                    {levels.map((num) => (
                      <MenuItem value={num} key={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl>
                  <InputLabel id="market-label">Country</InputLabel>
                  <Select
                    labelId="market-label"
                    id="market-select"
                    value={country}
                    onChange={handleCountryChange}
                  >
                    {country_currency.map((item) => (
                      <MenuItem
                        value={item.country_code}
                        key={item.country_code}
                      >
                        {item.country_name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Min: {minFees} €</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="stock-buy-price"
                  InputLabelProps={{ shrink: true }}
                  value={buyPrice}
                  onChange={handleBuyPriceChange}
                  label="Buy Price"
                />
                <FormHelperText>{currencySymbol}</FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="stock-amount"
                  InputLabelProps={{ shrink: true }}
                  value={amount}
                  onChange={handleAmountChange}
                  label="Amount"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="stock-sell-price"
                  InputLabelProps={{ shrink: true }}
                  value={sellPrice}
                  onChange={handleSellPriceChange}
                  label="Sell Price"
                />
                <FormHelperText>{currencySymbol}</FormHelperText>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  id="min-profit"
                  InputLabelProps={{ shrink: true }}
                  value={minProfit}
                  onChange={handleMinProfitChange}
                  label="Min Profit"
                />
                <FormHelperText>€</FormHelperText>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  required
                  id="min-sell-price"
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  value={minSellPrice}
                  onChange={handleMinSellPriceChange}
                  label={
                    <Typography component={'span'}>
                      {' '}
                      Min Sell / diff{' '}
                    </Typography>
                  }
                  variant="filled"
                />
                <FormHelperText>{currencySymbol}</FormHelperText>
              </Grid>
              <Grid item xs={2}>
                <div className={win ? 'win' : 'lose'}>
                  <TextField
                    id="diff"
                    value={diff}
                    onChange={handleDiffChange}
                    InputProps={{
                      readOnly: true,
                    }}
                    InputLabelProps={{ shrink: true }}
                    label="P/L Price"
                  />
                  <FormHelperText>%</FormHelperText>
                </div>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="min-amount"
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  value={minAmount}
                  onChange={handleMinAmountChange}
                  label="Min Amount"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="currency-to-euro"
                  InputLabelProps={{ shrink: true }}
                  value={currencyRatio}
                  onChange={handleCurrencyRatioChange}
                  label={currencyName + '/EUR'}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  InputProps={{
                    readOnly: true,
                  }}
                  id="buy-total"
                  InputLabelProps={{ shrink: true }}
                  value={buyTotal}
                  onChange={handleBuyTotalChange}
                  label="Buy Total"
                />
                <FormHelperText>€</FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="buy-fees"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={buyFees}
                  onChange={handleBuyFeesChange}
                  InputLabelProps={{ shrink: true }}
                  label="Buy Fees"
                />
                <FormHelperText>€</FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="sell-total"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={sellTotal}
                  onChange={handleSellTotalChange}
                  InputLabelProps={{ shrink: true }}
                  label="Sell Total"
                />
                <FormHelperText>€</FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="sell-fees"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={sellFees}
                  onChange={handleSellFeesChange}
                  InputLabelProps={{ shrink: true }}
                  label="Sell Fees"
                />
                <FormHelperText>€</FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <div className={win ? 'win' : 'lose'}>
                  <TextField
                    id="profit"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={profit}
                    onChange={handleProfitChange}
                    InputLabelProps={{ shrink: true }}
                    label={
                      <Typography component={'span'}> Profit/Loss </Typography>
                    }
                    variant="filled"
                  />
                  <FormHelperText>€</FormHelperText>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className={win ? 'win' : 'lose'}>
                  <TextField
                    id="roi"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={roi}
                    onChange={handleROIChange}
                    InputLabelProps={{ shrink: true }}
                    label="Loss/Profit"
                    variant="filled"
                  />
                  <FormHelperText>%</FormHelperText>
                </div>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  id="max-loss"
                  value={maxLoss}
                  onChange={handleMaxLossChange}
                  InputLabelProps={{ shrink: true }}
                  label="Max Loss"
                />
                <FormHelperText>%</FormHelperText>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  required
                  id="stop-loss"
                  value={stopLoss}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={handleStopLossChange}
                  InputLabelProps={{ shrink: true }}
                  label={
                    <Typography component={'span'}>
                      {' '}
                      Stop Loss/ Diff/ Loss{' '}
                    </Typography>
                  }
                  variant="filled"
                />
                <FormHelperText>{currencySymbol}</FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="max-price"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  InputLabelProps={{ shrink: true }}
                  label="Max Price"
                />
                <FormHelperText>{currencySymbol}</FormHelperText>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  id="fall-by"
                  value={fallBy}
                  onChange={handleFallByChange}
                  InputLabelProps={{ shrink: true }}
                  label="Fall By"
                />
                <FormHelperText>%</FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="sell-activation-price"
                  value={sellActivationPrice}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={handleSellActivationPriceChange}
                  InputLabelProps={{ shrink: true }}
                  label="Sell Activation Price"
                />
                <FormHelperText>{currencySymbol}</FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="below-by"
                  value={belowBy}
                  onChange={handleBelowByChange}
                  InputLabelProps={{ shrink: true }}
                  label="Below By"
                />
                <FormHelperText>%</FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="sell-price2"
                  value={sellPrice2}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={handleSellPrice2Change}
                  InputLabelProps={{ shrink: true }}
                  label="Sell Price2"
                />
                <FormHelperText>{currencySymbol}</FormHelperText>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  required
                  id="min-price"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  InputLabelProps={{ shrink: true }}
                  label="Min Price"
                />
                <FormHelperText>{currencySymbol}</FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="rise-by"
                  value={riseBy}
                  onChange={handleRiseByChange}
                  InputLabelProps={{ shrink: true }}
                  label="Rise By"
                />
                <FormHelperText>%</FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="buy-activation-price"
                  value={buyActivationPrice}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={handleBuyActivationPriceChange}
                  InputLabelProps={{ shrink: true }}
                  label="Buy Activation Price"
                />
                <FormHelperText>{currencySymbol}</FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="above-by"
                  value={aboveBy}
                  onChange={handleAboveByChange}
                  InputLabelProps={{ shrink: true }}
                  label="Above By"
                />
                <FormHelperText>%</FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="buy-price2"
                  value={buyPrice2}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={handleBuyPrice2Change}
                  InputLabelProps={{ shrink: true }}
                  label="Buy Price2"
                />
                <FormHelperText>{currencySymbol}</FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="balance"
                  value={balance}
                  onChange={handleBalanceChange}
                  InputLabelProps={{ shrink: true }}
                  label="Balance"
                />
                <FormHelperText>€</FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="balance-percentage"
                  value={balancePercentage}
                  onChange={handleBalancePercentageChange}
                  InputLabelProps={{ shrink: true }}
                  label="Balance %"
                />
                <FormHelperText>%</FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="balance-invested"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={balanceInvested}
                  onChange={handleBalanceInvestedChange}
                  InputLabelProps={{ shrink: true }}
                  label="Balance Invest"
                />
                <FormHelperText>€</FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="balance-shares"
                  InputLabelProps={{ shrink: true }}
                  value={balanceShares}
                  onChange={handleBalanceSharesChange}
                  label="Balance Shares"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="lent"
                  value={lent}
                  onChange={handleLentChange}
                  InputLabelProps={{ shrink: true }}
                  label="Lent"
                />
                <FormHelperText>€</FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="lent-percentage"
                  value={lentPercentage}
                  onChange={handleLentPercentageChange}
                  InputLabelProps={{ shrink: true }}
                  label="Lent %"
                />
                <FormHelperText>%</FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="lent-invested"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={lentInvested}
                  onChange={handleLentInvestedChange}
                  InputLabelProps={{ shrink: true }}
                  label="Lent Invest"
                />
                <FormHelperText>€</FormHelperText>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="lent-shares"
                  InputLabelProps={{ shrink: true }}
                  value={lentShares}
                  onChange={handleLentSharesChange}
                  label="Lent Shares"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="one-percent"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={onePercent}
                  onChange={handleOnePercentChange}
                  label="-/+ 1% Price"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="two-percent"
                  value={twoPercent}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={handleTwoPercentChange}
                  InputLabelProps={{ shrink: true }}
                  label="-/+ 2% price"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="three-percent"
                  value={threePercent}
                  onChange={handleThreePercentChange}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  label="-/+ 3% price"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="four-percent"
                  InputLabelProps={{ shrink: true }}
                  value={fourPercent}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={handleFourPercentChange}
                  label="-/+ 4% price"
                />
              </Grid>
            </Grid>
          </>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <>
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item xs={3}>
                <TextField
                  required
                  id="nok-euro"
                  InputLabelProps={{ shrink: true }}
                  value={nokEur}
                  onChange={handleNokEurChange}
                  label={'NOK/EUR'}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="sek-euro"
                  InputLabelProps={{ shrink: true }}
                  value={sekEur}
                  onChange={handleSekEurChange}
                  label={'SEK/EUR'}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="dkk-euro"
                  InputLabelProps={{ shrink: true }}
                  value={dkkEur}
                  onChange={handleDkkEurChange}
                  label={'DKK/EUR'}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="usd-euro"
                  InputLabelProps={{ shrink: true }}
                  value={usdEur}
                  onChange={handleUsdEurChange}
                  label={'USD/EUR'}
                />
              </Grid>
            </Grid>
          </>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={NordnetCalc} />
      </Switch>
    </Router>
  );
}
