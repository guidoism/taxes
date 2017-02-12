function AppendTodaysNetWorth() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Net Worth");
  var range = ss.getRange("'Net Worth'!$A$2:$Z$2");
  sheet.appendRow(range.getValues()[0]);
}

var tax_code = {
  // Data from https://www.tax-brackets.org/
  '2016': {
    married: {
      social_security_limit: 118500,
      additional_medicare_tax_base: 250000,
      standard_deduction: 12600,
      personal_exemption: 4000,
      personal_exemption_phaseout: 309900,
      federal_brackets: {
        '0.10': { 'from': 0, 'to': 18550 },
        '0.15': { 'from': 18550, 'to': 75300 },
        '0.25': { 'from': 75300, 'to': 151900 },
        '0.28': { 'from': 151900, 'to': 231450 },
        '0.33': { 'from': 231450, 'to': 413350 },
        '0.35': { 'from': 413350, 'to': 466950 },
        '0.396': { 'from': 466950, 'to': 999999999 },
      },
      kentucky: {
        '0.02': { 'from': 0, 'to': 3000 },
        '0.03': { 'from': 3001, 'to': 4000 },
        '0.04': { 'from': 4001, 'to': 5000 },
        '0.05': { 'from': 5001, 'to': 8000 },
        '0.058': { 'from': 8001, 'to': 75000 },
        '0.06': { 'from': 75001, 'to': 999999999 },
      },
      california: {
        '0.01': { 'from': 0, 'to': 15174 },
        '0.02': { 'from': 15174, 'to': 35952 },
        '0.04': { 'from': 35952, 'to': 46346 },
        '0.06': { 'from': 46346, 'to': 57359 },
        '0.08': { 'from': 57359, 'to': 67751 },
        '0.093': { 'from': 67751, 'to': 345780 },
        '0.103': { 'from': 345780, 'to': 414936 },
        '0.113': { 'from': 414936, 'to': 691560 },
        '0.123': { 'from': 691560, 'to': 1000000 },
        '0.133': { 'from': 1000000, 'to': 999999999 },
      },
      district_of_columbia: {
        '0.04': { 'from': 0, 'to': 10000 },
        '0.06': { 'from': 10000, 'to': 40000 },
        '0.065': { 'from': 40000, 'to': 60000 },
        '0.085': { 'from': 60000, 'to': 350000 },
        '0.0875': { 'from': 350000, 'to': 1000000 },
        '0.0895': { 'from': 1000000, 'to': 999999999 },
      },
    },
  },
  '2017': {
    single: {
      social_security_limit: 127200,
      additional_medicare_tax_base: 200000,
      standard_deduction: 6350,
      personal_exemption: 4050,
      personal_exemption_phaseout: 261500,
      amt_exemption: 54300,
      amt_exemption_phaseout: 120700,
      federal_brackets: {
        '0.10': { 'from': 0, 'to': 9325 },
        '0.15': { 'from': 9325, 'to': 37950 },
        '0.25': { 'from': 37950, 'to': 91900 },
        '0.28': { 'from': 91900, 'to': 191650 },
        '0.33': { 'from': 191650, 'to': 416700 },
        '0.35': { 'from': 416700, 'to': 418400 },
        '0.396': { 'from': 418400, 'to': 999999999 },
      },
      kentucky: {
        '0.02': { 'from': 0, 'to': 3000 },
        '0.03': { 'from': 3001, 'to': 4000 },
        '0.04': { 'from': 4001, 'to': 5000 },
        '0.05': { 'from': 5001, 'to': 8000 },
        '0.058': { 'from': 8001, 'to': 75000 },
        '0.06': { 'from': 75001, 'to': 999999999 },
      },
      district_of_columbia: {
        '0.04': { 'from': 0, 'to': 10000 },
        '0.06': { 'from': 10000, 'to': 40000 },
        '0.065': { 'from': 40000, 'to': 60000 },
        '0.085': { 'from': 60000, 'to': 350000 },
        '0.0875': { 'from': 350000, 'to': 1000000 },
        '0.0895': { 'from': 1000000, 'to': 999999999 },
      },
      trump_proposed_standard_deduction: 15000,
      trump_proposed: {    
        '0.12': { 'from': 0, 'to': 37500 },
        '0.25': { 'from': 37500, 'to': 112500 },
        '0.33': { 'from': 112500, 'to': 999999999 },
      },
    },
    married: {
      'social_security_limit': 127200,
      'additional_medicare_tax_base': 250000,
      'standard_deduction': 12700,
      'personal_exemption': 4050,
      'personal_exemption_phaseout': 313800,
      'amt_exemption': 84500,
      'amt_exemption_phaseout': 160900,
      federal_brackets: {
        '0.10': { 'from': 0, 'to': 18650 },
        '0.15': { 'from': 18650, 'to': 75900 },
        '0.25': { 'from': 75900, 'to': 153100 },
        '0.28': { 'from': 153100, 'to': 233350 },
        '0.33': { 'from': 233350, 'to': 416700 },
        '0.35': { 'from': 416700, 'to': 470700 },
        '0.396': { 'from': 470700, 'to': 999999999 },
      },
      long_term_cap_gains: {
        '0.00': { 'from': 0, 'to': 75900 },
        '0.15': { 'from': 75900, 'to': 470700 },
        '0.20': { 'from': 470700, 'to': 999999999 },
      },
      kentucky: {
        '0.02': { 'from': 0, 'to': 3000 },
        '0.03': { 'from': 3001, 'to': 4000 },
        '0.04': { 'from': 4001, 'to': 5000 },
        '0.05': { 'from': 5001, 'to': 8000 },
        '0.058': { 'from': 8001, 'to': 75000 },
        '0.06': { 'from': 75001, 'to': 999999999 },
      },
      california: {
        '0.01': { 'from': 0, 'to': 15174 },
        '0.02': { 'from': 15174, 'to': 35952 },
        '0.04': { 'from': 35952, 'to': 46346 },
        '0.06': { 'from': 46346, 'to': 57359 },
        '0.08': { 'from': 57359, 'to': 67751 },
        '0.093': { 'from': 67751, 'to': 345780 },
        '0.103': { 'from': 345780, 'to': 414936 },
        '0.113': { 'from': 414936, 'to': 691560 },
        '0.123': { 'from': 691560, 'to': 1000000 },
        '0.133': { 'from': 1000000, 'to': 999999999 },
      },
      district_of_columbia: {
        '0.04': { 'from': 0, 'to': 10000 },
        '0.06': { 'from': 10000, 'to': 40000 },
        '0.065': { 'from': 40000, 'to': 60000 },
        '0.085': { 'from': 60000, 'to': 350000 },
        '0.0875': { 'from': 350000, 'to': 1000000 },
        '0.0895': { 'from': 1000000, 'to': 999999999 },
      },
      trump_proposed_standard_deduction: 30000,
      trump_proposed: {    
        '0.12': { 'from': 0, 'to': 75000 },
        '0.25': { 'from': 75000, 'to': 225000 },
        '0.33': { 'from': 225000, 'to': 999999999 },
      },
    }
  }
}

/**
 * Total tax for a family.
 *
 * @param {number} year
 * @param {string} filing_status Your filing status, e.g. single or married
 * @param {string} state The state you live in
 * @param {number} wages The total wages earned
 * @param {number} non_wage_income The total non-wage income (like dividends)
 * @param {number} payroll_deductions Total payroll and HSA deductions
 * @param {number} other_deductions The total amount of other deductions
 * @param {number} household_members
 * @return Taxes owed as [social security, medicare, federal income tax, california income tax, california disability tax, AMT]
 * @customfunction
 */
function TAXES(year, filing_status, state, wages, non_wage_income, payroll_deductions, other_deductions, household_members) {
  filing_status = String.prototype.toLowerCase.apply(filing_status);
  state = String.prototype.toLowerCase.apply(state);
  
  var input = year;
  if (input.map && input[0].map && !input[0][0].map) {
    var r = [];
    for (var i = 0; i < input.length; ++i) {
      r.push(TAXES(input[i][0], input[i][1], input[i][2], input[i][3], input[i][4], input[i][5], input[i][6], input[i][7]));
    }
    return r;
  }
  
  var federal_brackets = 'federal_brackets';
  var standard_deduction = 'standard_deduction';
  
  if (state == 'trump') {
    state = 'california';
    federal_brackets = 'trump_proposed';
    standard_deduction = 'trump_proposed_standard_deduction';
  }
  
  // TODO: qualified dividends
  // TODO: long term capital gains
  // TODO: add 3.8% ACA tax to long term capital gains
  
  var t = tax_code[year][filing_status];
  var personal_exemptions = Math.max(0, (1-(Math.ceil(Math.max(0, wages-t['personal_exemption_phaseout'])/2500)*0.02))*t['personal_exemption']*household_members);
  var fica_base = wages - payroll_deductions;
  var irs_base = wages + non_wage_income - payroll_deductions - other_deductions;
  var agi = irs_base - t[standard_deduction] - personal_exemptions;
  var ss = Math.max(0, Math.min(fica_base, t['social_security_limit']) * 0.062);
  var medicare = Math.max(0, Math.min(fica_base,t['additional_medicare_tax_base'])*0.0145)+Math.max(0, (fica_base-t['additional_medicare_tax_base'])*0.0235);
  var st = BRACKETED_TAX(t[state], agi);
  var ca_dis = state == 'california' ? Math.max(0, Math.min(agi,106742)*0.009) : 0;
  var fed = BRACKETED_TAX(t[federal_brackets], agi - st);
  var amt = ALTERNATIVE_MINIMUM_TAX(agi, personal_exemptions, fed);
  return [ss, medicare, fed, st, ca_dis, amt];
}

/**
 * Returns the bracketed income tax owed.
 *
 * @param {dictionary} brackets The brackets to use.
 * @param {number} agi The adjusted gross income.
 * @return The income taxes owned.
 * @customfunction
 */
function BRACKETED_TAX(brackets, agi) {   
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



