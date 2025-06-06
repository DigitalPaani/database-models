const FORMULA_UNITS = ["l", "kl", "kl/h", "m", "%", "kg", "NTU", "None", "pH"];

const FORMULA_TYPES = ["BOOLEAN", "FLOAT", "TIME"];

const HYPER_FORMULAS = [
  "FILTER",
  "DATE",
  "DATEDIF",
  "DATEVALUE",
  "DAY",
  "DAYS",
  "DAYS360",
  "EDATE",
  "EOMONTH",
  "HOUR",
  "INTERVAL",
  "ISOWEEKNUM",
  "MINUTE",
  "MONTH",
  "NETWORKDAYS",
  "NETWORKDAYS.INTL",
  "NOW",
  "SECOND",
  "TIME",
  "TIMEVALUE",
  "TODAY",
  "WEEKDAY",
  "WEEKNUM",
  "WORKDAY",
  "WORKDAY.INTL",
  "YEAR",
  "YEARFRAC",
  "DELTA",
  "ERF",
  "ERFC",
  "ISBLANK",
  "ISERR",
  "ISERROR",
  "ISEVEN",
  "ISLOGICAL",
  "ISNA",
  "ISODD",
  "AVEDEV",
  "AVERAGE",
  "AVERAGEA",
  "AVERAGEIF",
  "BESSELI",
  "BESSELJ",
  "BESSELK",
  "BESSELY",
  "BETA.DIST",
  "BETADIST",
  "BETA.INV",
  "BETAINV",
  "BINOM.DIST",
  "BINOMDIST",
  "BINOM.INV",
  "CHIDIST",
  "CHIINV",
  "CHIINVRT",
  "CHISQ.DIST",
  "CHIDISTRT",
  "CHISQ.DIST.RT",
  "CHISQ.INV",
  "CHISQ.INV.RT",
  "CHISQ.TEST",
  "CHITEST",
  "CONFIDENCE",
  "CONFIDENCE.NORM",
  "CONFIDENCE.T",
  "CORREL",
  "COUNT",
  "COUNTA",
  "COUNTBLANK",
  "COUNTIF",
  "COUNTIFS",
  "COVAR",
  "COVARIANCE.P",
  "COVARIANCEP",
  "COVARIANCE.S",
  "COVARIANCES",
  "CRITBINOM",
  "DEVSQ",
  "EXPON.DIST",
  "EXPONDIST",
  "FDIST",
  "FINV",
  "F.DIST",
  "F.DIST.RT",
  "FDISTRT",
  "F.INV",
  "F.INV.RT",
  "FINVRT",
  "FISHER",
  "FISHERINV",
  "F.TEST",
  "FTEST",
  "GAMMA",
  "GAMMA.DIST",
  "GAMMADIST",
  "GAMMALN",
  "GAMMALN.PRECISE",
  "GAMMA.INV",
  "GAMMAINV",
  "GAUSS",
  "GEOMEAN",
  "HARMEAN",
  "HYPGEOMDIST",
  "HYPGEOM.DIST",
  "LARGE",
  "LOGNORM.DIST",
  "LOGNORMDIST",
  "LOGNORM.INV",
  "LOGNORMINV",
  "LOGINV",
  "MAX",
  "MAXA",
  "MAXIFS",
  "MEDIAN",
  "MIN",
  "MINA",
  "MINIFS",
  "NEGBINOM.DIST",
  "NEGBINOMDIST",
  "NORM.DIST",
  "NORMDIST",
  "NORM.S.DIST",
  "NORMDIST",
  "NORM.INV",
  "NORMINV",
  "NORM.S.INV",
  "NORMSINV",
  "PEARSON",
  "PHI",
  "POISSON",
  "POISSON.DIST",
  "POISSONDIST",
  "RSQ",
  "SKEW",
  "SKEW.P",
  "SKEWP",
  "SLOPE",
  "SMALL",
  "STANDARDIZE",
  "STDEV",
  "STDEVA",
  "STDEVP",
  "STDEV.P",
  "STDEVPA",
  "STDEV.S",
  "STDEVS",
  "STEYX",
  "TDIST",
  "T.DIST",
  "T.DIST.2T",
  "TDIST2T",
  "T.DIST.RT",
  "TDISTRT",
  "TINV",
  "T.INV",
  "T.INV.2T",
  "TINV2T",
  "TTEST",
  "T.TEST",
  "VAR",
  "VARA",
  "VARP",
  "VAR.P",
  "VARPA",
  "VAR.S",
  "VARS",
  "WEIBULL",
  "WEIBULL.DIST",
  "WEIBULLDIST",
  "Z.TEST",
  "ZTEST",
  "ABS",
  "ACOS",
  "ACOSH",
  "ACOT",
  "ACOTH",
  "ASIN",
  "ASINH",
  "ATAN",
  "ATAN2",
  "ATANH",
  "CEILING",
  "CEILING.MATH",
  "CEILING.PRECISE",
  "COMBIN",
  "COMBINA",
  "COS",
  "COSH",
  "COT",
  "COTH",
  "COUNTUNIQUE",
  "CSC",
  "CSCH",
  "DECIMAL",
  "DEGREES",
  "EVEN",
  "EXP",
  "FACT",
  "FACTDOUBLE",
  "FLOOR",
  "FLOOR.MATH",
  "FLOOR.PRECISE",
  "GCD",
  "INT",
  "ISO.CEILING",
  "LCM",
  "LN",
  "LOG",
  "LOG10",
  "MOD",
  "MROUND",
  "MULTINOMIAL",
  "ODD",
  "PI",
  "POWER",
  "PRODUCT",
  "QUOTIENT",
  "RADIANS",
  "RAND",
  "RANDBETWEEN",
  "ROUND",
  "ROUNDDOWN",
  "ROUNDUP",
  "SEC",
  "SECH",
  "SERIESSUM",
  "SIN",
  "SINH",
  "SIGN",
  "SQRT",
  "SQRTPI",
  "SUBTOTAL",
  "SUM",
  "SUMIF",
  "SUMIFS",
  "SUMPRODUCT",
  "SUMSQ",
  "SUMX2MY2",
  "SUMX2PY2",
  "SUMXMY2",
  "TAN",
  "TANH",
  "TRUNC",
  "AND",
  "FALSE",
  "IF",
  "IFS",
  "IFNA",
  "IFERROR",
  "NOT",
  "SWITCH",
  "OR",
  "TRUE",
  "XOR",
  "HF.ADD",
  "HF.DIVIDE",
  "HF.EQ",
  "HF.LTE",
  "HF.LT",
  "HF.GTE",
  "HF.GT",
  "HF.MINUS",
  "HF.MULTIPLY",
  "HF.NE",
  "HF.POW",
  "HF.UMINUS",
  "HF.UNARY_PERCENT",
  "HF.UPLUS",
  "CUMIPMT",
  "CUMPRINC",
  "DB",
  "DDB",
  "NOMINAL",
  "NPER",
  "NPV",
  "PDURATION",
  "PMT",
  "PPMT",
  "PV",
  "RATE",
  "RRI",
  "SLN",
  "XNPV",
  "AVERAGE",
  "STDEV",
  "VARIANCE",
  "CORREL",
  "COVAR",
];

const ARGUMENT_TYPES = [
  "ARRAY",
  "STRING",
  "NUMBER",
  "BOOLEAN",
  "SCALAR",
  "NOERROR",
  "RANGE",
  "INTEGER",
  "COMPLEX",
];

const SENSOR_SETTING_GRANULARITY = [
  "Minutes",
  "Hours",
  "Days",
  "Weeks",
  "Months",
];
const SENSOR_SETTING_AGGREGATION = [
  "Average",
  "Current",
  "Minimum",
  "Maximum",
  "Cumulative",
  "Raw",
  "LastActiveValue"
];

const SENSOR_SETTING_RETURN_TYPES = ["values", "value", "datetime"];

const FORMULAS_CHIP_TYPES = [
  "hyperFormulaFunction",
  "operator",
  "sensorSetting",
  "number",
];

export {
  FORMULA_TYPES,
  FORMULA_UNITS,
  HYPER_FORMULAS,
  ARGUMENT_TYPES,
  SENSOR_SETTING_AGGREGATION,
  SENSOR_SETTING_GRANULARITY,
  FORMULAS_CHIP_TYPES,
  SENSOR_SETTING_RETURN_TYPES,
};
