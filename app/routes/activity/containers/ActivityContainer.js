import { connect } from 'react-redux'
import { setCurrency, tickerSelectors } from 'reducers/ticker'
import { fetchBalance } from 'reducers/balance'
import {
  fetchInvoices,
  setInvoice,
  invoiceSelectors
} from 'reducers/invoice'
import {
  setPayment,
  fetchPayments,
  paymentSelectors
} from 'reducers/payment'
import { fetchTransactions } from 'reducers/transaction'
import {
  showActivityModal,
  hideActivityModal,
  changeFilter,
  toggleFilterPulldown,
  activitySelectors,
  updateSearchActive,
  updateSearchText
} from 'reducers/activity'
import { newAddress, openWalletModal } from 'reducers/address'
import { setFormType } from 'reducers/form'

import { payFormSelectors } from 'reducers/payform'

import { setWalletCurrencyFilters } from 'reducers/info'

import { setSettingsOpen } from 'reducers/settings'

import Activity from '../components/Activity'

const mapDispatchToProps = {
  setCurrency,
  setPayment,
  setInvoice,
  fetchPayments,
  fetchInvoices,
  fetchTransactions,
  showActivityModal,
  hideActivityModal,
  changeFilter,
  toggleFilterPulldown,
  newAddress,
  openWalletModal,
  fetchBalance,
  updateSearchActive,
  updateSearchText,
  setFormType,
  setWalletCurrencyFilters,
  setSettingsOpen
}

const mapStateToProps = state => ({
  activity: state.activity,

  balance: state.balance,
  address: state.address,
  info: state.info,

  payment: state.payment,
  transaction: state.transaction,

  invoice: state.invoice,
  invoices: invoiceSelectors.invoices(state),

  ticker: state.ticker,

  network: state.network,

  settings: state.settings,

  paymentModalOpen: paymentSelectors.paymentModalOpen(state),
  invoiceModalOpen: invoiceSelectors.invoiceModalOpen(state),

  currentTicker: tickerSelectors.currentTicker(state),
  currentCurrencyFilters: tickerSelectors.currentCurrencyFilters(state),

  currencyName: tickerSelectors.currencyName(state),

  currentActivity: activitySelectors.currentActivity(state)(state),
  nonActiveFilters: activitySelectors.nonActiveFilters(state),

  showPayLoadingScreen: payFormSelectors.showPayLoadingScreen(state)
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const walletProps = {
    balance: stateProps.balance,
    address: stateProps.address.address,
    info: stateProps.info,
    ticker: stateProps.ticker,
    currentTicker: stateProps.currentTicker,
    showPayLoadingScreen: stateProps.showPayLoadingScreen,
    showSuccessPayScreen: stateProps.payment.showSuccessPayScreen,
    successTransactionScreen: stateProps.transaction.successTransactionScreen,
    currentCurrencyFilters: stateProps.currentCurrencyFilters,
    currencyName: stateProps.currencyName,
    isTestnet: stateProps.info.data.testnet,
    settings: stateProps.settings,

    setCurrency: dispatchProps.setCurrency,
    setWalletCurrencyFilters: dispatchProps.setWalletCurrencyFilters,
    newAddress: dispatchProps.newAddress,
    openReceiveModal: dispatchProps.openWalletModal,
    openPayForm: () => dispatchProps.setFormType('PAY_FORM'),
    openRequestForm: () => dispatchProps.setFormType('REQUEST_FORM'),
    setSettingsOpen: dispatchProps.setSettingsOpen
  }

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,

    walletProps
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Activity)
