/**
 * Total tax for a family of 4 in California.
 *
 * @param {number} wages The total wages earned
 * @param {number} nonwageincome The total non-wage income (like dividends)
 * @param {number} payrolldeductions Total payroll and HSA deductions
 * @param {number} deductions The total amount of deductions not including payrolldeductions
 * @return Taxes owed
 * @customfunction
 */
function TAXES(wages, nonwageincome, payrolldeductions, deductions) {
  var standard_deduction = 12600;
  var personal_exemptions = Math.max(0, (1-(Math.ceil(Math.max(0, wages-309900)/2500)*0.02))*4000*4);
  var fica_base = wages - payrolldeductions;
  var irs_base = wages + nonwageincome - payrolldeductions - deductions;
  var agi = irs_base - standard_deduction - personal_exemptions;
  var ss = SOCIAL_SECURITY_TAX(fica_base);
  var medicare = MEDICARE_TAX(fica_base);
  var ca = CALIFORNIA_INCOME_TAX(agi);
  var ca_dis = Math.max(0, Math.min(agi,106742)*0.009);
  var fed = FEDERAL_INCOME_TAX(agi - ca);
  var amt = ALTERNATIVE_MINIMUM_TAX(agi, personal_exemptions, fed);
  return ss + medicare + fed + ca + ca_dis + amt;
}

/**
 * Returns the medicare tax
 *
 * @param {number} wages The total wages earned
 * @return Taxes owed
 * @customfunction
 */
function MEDICARE_TAX(wages) {
  if (wages.map) {
    return wages.map(MEDICARE_TAX);
  }

  return Math.max(0, Math.min(wages,250000)*0.0145)+Math.max(0, (wages-250000)*0.0235)
}

/**
 * Returns the social security tax
 *
 * @param {number} wages The total wages earned
 * @return Taxes owed
 * @customfunction
 */
function SOCIAL_SECURITY_TAX(wages) {
  if (wages.map) {
    return wages.map(SOCIAL_SECURITY_TAX);
  }

  return Math.max(0, Math.min(wages, 118500) * 0.062);
}

/**
 * Returns the federal income tax owed. Note that this is only for married filed jointly.
 *
 * @param {number} agi The adjusted gross income.
 * @return The federal income taxes owned.
 * @customfunction
 */
function FEDERAL_INCOME_TAX(agi) {
  if (agi.map) {
    return agi.map(FEDERAL_INCOME_TAX);
  }
    
  var federal_brackets = {
    '0.10': { 'from': 0, 'to': 18550 },
    '0.15': { 'from': 18550, 'to': 75300 },
    '0.25': { 'from': 75300, 'to': 151900 },
    '0.28': { 'from': 151900, 'to': 231450 },
    '0.33': { 'from': 231450, 'to': 413350 },
    '0.35': { 'from': 413350, 'to': 466950 },
    '0.396': { 'from': 466950, 'to': 999999999 },
  }

  var total = 0;
  for (rate in federal_brackets) {
    var from = federal_brackets[rate]['from'];
    var to = federal_brackets[rate]['to'];
    var amount = Math.max(0, (Math.min(agi, to) - from) * rate);
    total = total + amount;
  }
  
  return total;
}

/**
 * Returns the california income tax owed. Note that this is only for married filed jointly.
 *
 * @param {number} agi The adjusted gross income.
 * @return The california income taxes owned.
 * @customfunction
 */
function CALIFORNIA_INCOME_TAX(agi) {
  if (agi.map) {
    return agi.map(CALIFORNIA_INCOME_TAX);
  }
    
  var brackets = {
    '0.01': { 'from': 0, 'to': 15174 },
    '0.02': { 'from': 15174, 'to': 35952 },
    '0.04': { 'from': 35952, 'to': 46346 },
    '0.06': { 'from': 46346, 'to': 57359 },
    '0.08': { 'from': 57359, 'to': 67751 },
    '0.093': { 'from': 67751, 'to': 345780 },
    '0.103': { 'from': 345780, 'to': 414936 },
    '0.113': { 'from': 414936, 'to': 691560 },
    '0.123': { 'from': 691560, 'to': 1000000 },
    '0.133': { 'from': 1000000, 'to': 999999999 }
  }

  var total = 0;
  for (rate in brackets) {
    var from = brackets[rate]['from'];
    var to = brackets[rate]['to'];
    var amount = Math.max(0, (Math.min(agi, to) - from) * rate);
    total = total + amount;
  }
  
  return total;
}

/**
 * Returns the Kentucky income tax owed. Note that this is only for married filed jointly.
 *
 * @param {number} agi The adjusted gross income.
 * @return The kentucky income taxes owned.
 * @customfunction
 */
function KENTUCKY_INCOME_TAX(agi) {
  if (agi.map) {
    return agi.map(KENTUCKY_INCOME_TAX);
  }
    
  var brackets = {
    '0.02': { 'from': 0, 'to': 3000 },
    '0.03': { 'from': 3001, 'to': 4000 },
    '0.04': { 'from': 4001, 'to': 5000 },
    '0.05': { 'from': 5001, 'to': 8000 },
    '0.058': { 'from': 8001, 'to': 75000 },
    '0.06': { 'from': 75001, 'to': 999999999 }
  }

  var total = 0;
  for (rate in brackets) {
    var from = brackets[rate]['from'];
    var to = brackets[rate]['to'];
    var amount = Math.max(0, (Math.min(agi, to) - from) * rate);
    total = total + amount;
  }
  
  return total;
}

/**
 * Returns the alternative minimum tax owed.
 *
 * @param {number} agi The adjusted gross income.
 * @param {number} personal_exemptions_amount total dollar amount from personal exemptions formula
 * @param {number} federal_income_tax Federal income tax amount
 * @return The AMT owned.
 * @customfunction
 */
function ALTERNATIVE_MINIMUM_TAX(agi, personal_exemptions_amount, federal_income_tax) {
  if (agi.map) {
    return agi.map(ALTERNATIVE_MINIMUM_TAX);
  }

  var amti = agi + personal_exemptions_amount;
  var amt_exemption = Math.round(Math.max(0,83400-Math.round(0.25*Math.max(0,amti-158900))));
  
  var brackets = {
    '0.26': { 'from': 0, 'to': 182500 },
    '0.28': { 'from': 182501, 'to': 999999999 }
  }

  var total = 0;
  for (rate in brackets) {
    var from = brackets[rate]['from'];
    var to = brackets[rate]['to'];
    var amount = Math.max(0, (Math.min(amti - amt_exemption, to) - from) * rate);
    total = total + amount;
  }
  
  if (total > federal_income_tax) {
    return total - federal_income_tax;
  }
  
  return 0;
}

