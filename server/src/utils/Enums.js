const ConditionEnum = Object.freeze({
  NEW: 'NEW',
  LIKE_NEW: 'LIKE NEW',
  GOOD: 'GOOD',
  FAIR: 'FAIR',
});

const CurrencyEnum = Object.freeze({
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
});


const MarketplaceEnum = Object.freeze({
  Amazon: 'Amazon',
  eBay: 'eBay',
  Facebook: 'Facebook',
  Mercadolibre: 'Mercadolibre',
});

module.exports = {
  ConditionEnum,
  CurrencyEnum,
  MarketplaceEnum
};
