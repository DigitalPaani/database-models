"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sensorInputType = exports.OLD_SENSOR_PURPOSE_TAGS = exports.SENSOR_PURPOSE_TAGS = void 0;
exports.SENSOR_PURPOSE_TAGS = [
    {
        key: "ph",
        abbr: "PH",
        name: "pH",
        category: "PH",
        stuckWindowTime: 30,
        stuckValueTolerance: null, // use fixedStuckTolerance for pH
        fixedStuckTolerance: 0.01, // hardcoded ±0.01 pH
    },
    {
        key: "bod",
        abbr: "BOD",
        name: "Biochemical Oxygen Demand",
        category: "BOD",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "cod",
        abbr: "COD",
        name: "Chemical Oxygen Demand",
        category: "COD",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "turbidity",
        abbr: "TUR",
        name: "Turbidity",
        category: "Turbidity",
        stuckWindowTime: 45,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "level",
        abbr: "LV",
        name: "Level",
        category: "Level Transmitters",
        stuckWindowTime: 20,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "highLevelSwitch",
        abbr: "HLS",
        name: "High Level Switch",
        category: "Level Switch",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "lowLevelSwitch",
        abbr: "LLS",
        name: "Low Level Switch",
        category: "Level Switch",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "tds",
        abbr: "TDS",
        name: "Total Dissolved Solids",
        category: "TDS",
        stuckWindowTime: 30,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "orp",
        abbr: "ORP",
        name: "Oxidation Reduction Potential",
        category: "ORP",
        stuckWindowTime: 30,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "chlorine",
        abbr: "CA",
        name: "Chlorine",
        category: "Chlorine",
        stuckWindowTime: 30,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "do",
        abbr: "DO",
        name: "Dissolved Oxygen",
        category: "DO",
        stuckWindowTime: 20,
        stuckValueTolerance: null, // use fixedStuckTolerance for DO
        fixedStuckTolerance: 0.01, // hardcoded ±0.01 mg/L
    },
    {
        key: "proximity",
        abbr: "PRX",
        name: "Proximity",
        category: "Proximity",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "pressure",
        abbr: "PR",
        name: "Pressure",
        category: "Pressure Transmitters",
        stuckWindowTime: 60,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "flowSwitch",
        abbr: "FS",
        name: "Flow Switch",
        category: "Flow Switch",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "flowRate",
        abbr: "FR",
        name: "Flow Rate",
        category: "Flow Meters",
        stuckWindowTime: 15,
        stuckValueTolerance: 0, // exact freeze — rate sensor
    },
    {
        key: "flowTotalizer",
        abbr: "FT",
        name: "Flow Totalizer",
        category: "Flow Meters",
        stuckWindowTime: 30,
        stuckValueTolerance: 0, // non-incrementing totalizer
    },
    {
        key: "energyUsedPerHour",
        abbr: "EUH",
        name: "Energy Used Per Hour",
        category: "Energy Meters",
        stuckWindowTime: 30,
        stuckValueTolerance: 0, // non-incrementing totalizer
    },
    {
        key: "conductivity",
        abbr: "COND",
        name: "Conductivity",
        category: "Conductivity",
        stuckWindowTime: 30,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "SDIAnalyser",
        abbr: "SDI",
        name: "SDI Analyser",
        category: "SDI Analyzer",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "TSS",
        abbr: "TSS",
        name: "Total Suspended Solids",
        category: "TSS",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "Barscreenchoking",
        abbr: "BSC",
        name: "Bar Screen Choking",
        category: "Bar Screen Level",
        stuckWindowTime: 20,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "LoadCellWeight",
        abbr: "LCW",
        name: "Load Cell Weight",
        category: "Load Cell Weight",
        stuckWindowTime: 30,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "autoManual",
        abbr: "MAN",
        name: "Auto Manual",
        category: "Equipment Auto/Manual Status",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "trip",
        abbr: "TRP",
        name: "Trip",
        category: "Equipment Trip Status",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "onOff",
        abbr: "ONOFF",
        name: "ON/OFF",
        category: "Equipment ON/OFF",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "vibration",
        abbr: "VIB",
        name: "Vibration",
        category: "Vibration",
        stuckWindowTime: 15,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "frequency",
        abbr: "FRQV",
        name: "Frequency",
        category: "Equipment Frequency",
        stuckWindowTime: 20,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "current",
        abbr: "CURR",
        name: "Current",
        category: "Current",
        stuckWindowTime: 15,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "rpm",
        abbr: "RPM",
        name: "RPM",
        category: "Equipment RPM",
        stuckWindowTime: 20,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "control",
        abbr: "CTRL",
        name: "Control",
        category: "Equipment Control",
        stuckWindowTime: 45,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "temperature",
        abbr: "TEMP",
        name: "Temperature",
        category: "Temperature",
        stuckWindowTime: 30,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "hmiBypass",
        abbr: "HMIB",
        name: "HMI Bypass",
        category: "HMI Bypass",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "softwareBypass",
        abbr: "SFTB",
        name: "Software Bypass",
        category: "Software Bypass",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "bidirectional",
        abbr: "BINL",
        name: "Bidirectional",
        category: "Bidirectional",
        stuckWindowTime: 15,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "sv30",
        abbr: "SV30",
        name: "SV30",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "sv60",
        abbr: "SV60",
        name: "SV60",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "sv90",
        abbr: "SV90",
        name: "SV90",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "sv30Turbidity",
        abbr: "SV30TU",
        name: "SV30 Turbidity",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "flooding",
        abbr: "FLO",
        name: "Flooding Sensor",
        category: "Flooding",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "vfdOnOrOff",
        abbr: "VFDONOFF",
        name: "VFD ON/OFF",
        category: "Equipment ON/OFF",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "vfdRpm",
        abbr: "VFDRPM",
        name: "VFD RPM",
        category: "Equipment RPM",
        stuckWindowTime: 20,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "vfdAmpere",
        abbr: "VFDAMP",
        name: "VFD Ampere",
        category: "Current",
        stuckWindowTime: 15,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "sv30Image",
        abbr: "SV30I",
        name: "SV30 Image",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "sv60Image",
        abbr: "SV60I",
        name: "SV60 Image",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "sv90Image",
        abbr: "SV90I",
        name: "SV90 Image",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "svCustomImage",
        abbr: "SVCI",
        name: "SV Custom Image",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "svRaw",
        abbr: "SVRAW",
        name: "SV Raw",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "svRawImage",
        abbr: "SVRI",
        name: "SV Raw Image",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "svFloatingSludge",
        abbr: "SVFS",
        name: "SV Floating Sludge",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "valveOpen",
        abbr: "VO",
        name: "Valve Open",
        category: "Valve Status",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "valveClose",
        abbr: "VC",
        name: "Valve Close",
        category: "Valve Status",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "valveOpened",
        abbr: "VOP",
        name: "Valve Opened",
        category: "Valve Status",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "valveClosed",
        abbr: "VCL",
        name: "Valve Closed",
        category: "Valve Status",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "valveAuto",
        abbr: "VA",
        name: "Valve Auto",
        category: "Valve Status",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "barScreen25",
        abbr: "BS25",
        name: "Bar Screen 25%",
        category: "Bar Screen Level",
        stuckWindowTime: 20,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "barScreen50",
        abbr: "BS50",
        name: "Bar Screen 50%",
        category: "Bar Screen Level",
        stuckWindowTime: 20,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "barScreen75",
        abbr: "BS75",
        name: "Bar Screen 75%",
        category: "Bar Screen Level",
        stuckWindowTime: 20,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "barScreen100",
        abbr: "BS100",
        name: "Bar Screen 100%",
        category: "Bar Screen Level",
        stuckWindowTime: 20,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "voltage",
        abbr: "VOLT",
        name: "Voltage",
        category: "Equipment Voltage",
        stuckWindowTime: 20,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "power",
        abbr: "POWE",
        name: "Power",
        category: "Equipment Power",
        stuckWindowTime: 20,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "mlss",
        abbr: "MLSS",
        name: "Mixed Liquor Suspended Solid",
        category: "MLSS",
        stuckWindowTime: 30,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "frwd",
        abbr: "FRWD",
        name: "Forward",
        category: "Valve Status",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "frwdLimit",
        abbr: "FRWDLT",
        name: "Forward Limit",
        category: "Valve Status",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "rvrse",
        abbr: "RVRSE",
        name: "Reverse",
        category: "Valve Status",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "rvrseLimit",
        abbr: "RVRSELT",
        name: "Reverse Limit",
        category: "Valve Status",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "hooter",
        abbr: "HTR",
        name: "Hooter",
        category: "Hooter",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "sdiAnalyzer",
        abbr: "SDAN",
        name: "SDI Analyzer",
        category: "SDI Analyzer",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "decanterAuto",
        abbr: "DEAU",
        name: "Decanter Auto",
        category: "Decanter Status",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "decanterUp",
        abbr: "DEUP",
        name: "Decanter Up",
        category: "Decanter Status",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "decanterDown",
        abbr: "DEDN",
        name: "Decanter Down",
        category: "Decanter Status",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "decanterPnpUp",
        abbr: "DCPNPUP",
        name: "Decanter PNP Up",
        category: "Decanter Status",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "decanterPnpDown",
        abbr: "DCPNDN",
        name: "Decanter PNP Down",
        category: "Decanter Status",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "decanterTrip",
        abbr: "DCTP",
        name: "Decanter Trip",
        category: "Decanter Status",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "rPhaseCurrent ",
        abbr: "RCURR",
        name: "R Phase Current",
        category: "Current",
        stuckWindowTime: 15,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "yPhaseCurrent",
        abbr: "YCURR",
        name: "Y Phase Current",
        category: "Current",
        stuckWindowTime: 15,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "bPhaseCurrent",
        abbr: "BCURR",
        name: "B Phase Current",
        category: "Current",
        stuckWindowTime: 15,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "averageCurrent",
        abbr: "AVGCURR",
        name: "Average Current",
        category: "Current",
        stuckWindowTime: 15,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "faultStatus",
        abbr: "FAULT",
        name: "Fault Status",
        category: "Fault Status",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "torque",
        abbr: "TORQUE",
        name: "Torque",
        category: "Torque",
        stuckWindowTime: 20,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
];
exports.OLD_SENSOR_PURPOSE_TAGS = [
    {
        key: "levelTransmitter",
        abbr: "LT",
        name: "Level",
        category: "Level Transmitters",
        stuckWindowTime: 20,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "pressureTransmitter",
        abbr: "PT",
        name: "Pressure",
        category: "Pressure Transmitters",
        stuckWindowTime: 60,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "sv30Sensor",
        abbr: "SV",
        name: "SV30",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "pressureTransmitterInlet",
        abbr: "PTI",
        name: "Pressure",
        category: "Pressure Transmitters",
        stuckWindowTime: 60,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "pressureTransmitterOutlet",
        abbr: "PTO",
        name: "Pressure",
        category: "Pressure Transmitters",
        stuckWindowTime: 60,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "pressureSwitchInlet",
        abbr: "PSI",
        name: "Pressure",
        category: "Pressure Switch",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "pressureSwitchOutlet",
        abbr: "PSO",
        name: "Pressure",
        category: "Pressure Switch",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "conductivityMeter",
        abbr: "CM",
        name: "Conductivity",
        category: "Conductivity",
        stuckWindowTime: 30,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "conductivityMeterSwitch",
        abbr: "CMS",
        name: "Conductivity",
        category: "Conductivity Switch",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "proximitySensor",
        abbr: "PS",
        name: "Proximity",
        category: "Proximity",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "pressureTransmitterBackwash",
        abbr: "PTBWS",
        name: "Pressure",
        category: "Pressure Transmitters",
        stuckWindowTime: 60,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "micronCartridgeInletPressure",
        abbr: "CATPT",
        name: "Pressure",
        category: "Pressure Transmitters",
        stuckWindowTime: 60,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "flowSwitchInBackwashLine",
        abbr: "BWS",
        name: "Flow Switch",
        category: "Flow Switch",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "inletTurbidity",
        abbr: "TURI",
        name: "Turbidity",
        category: "Turbidity",
        stuckWindowTime: 45,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "inletChlorine",
        abbr: "CHLI",
        name: "Chlorine",
        category: "Chlorine",
        stuckWindowTime: 30,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "inletTds",
        abbr: "TDSI",
        name: "Total Dissolved Solids",
        category: "TDS",
        stuckWindowTime: 30,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "inletPh",
        abbr: "PHI",
        name: "pH",
        category: "PH",
        stuckWindowTime: 30,
        stuckValueTolerance: null, // use fixedStuckTolerance for pH
        fixedStuckTolerance: 0.01, // hardcoded ±0.01 pH
    },
    {
        key: "bagFilterPressureTransmitter",
        abbr: "BAGFILPT",
        name: "Pressure",
        category: "Pressure Transmitters",
        stuckWindowTime: 60,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "pressureTransmitterReject",
        abbr: "PTREJ",
        name: "Pressure",
        category: "Pressure Transmitters",
        stuckWindowTime: 60,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "pressureTransmitterPermeate",
        abbr: "PTPERM",
        name: "Pressure",
        category: "Pressure Transmitters",
        stuckWindowTime: 60,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "ampereSensor",
        abbr: "AMP",
        name: "Ampere Sensor",
        category: "Current",
        stuckWindowTime: 15,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "barScreenPercentageSensor",
        abbr: "PER",
        name: "Bar Screen Percentage Sensor",
        category: "Bar Screen Level",
        stuckWindowTime: 20,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "temperatureSensor",
        abbr: "TMP",
        name: "Temperature",
        category: "Temperature",
        stuckWindowTime: 30,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "vfdAmpereSensor",
        abbr: "AMPV",
        name: "VFD Ampere",
        category: "Current",
        stuckWindowTime: 15,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "vfdRpmSensor",
        abbr: "RPMV",
        name: "VFD RPM",
        category: "Equipment RPM",
        stuckWindowTime: 20,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "airFlowmeter",
        abbr: "AIRFMF",
        name: "Air Flowmeter",
        category: "Flow Meters",
        stuckWindowTime: 15,
        stuckValueTolerance: 0, // exact freeze — rate sensor
    },
    {
        key: "vibrationSensor",
        abbr: "VBS",
        name: "Vibration",
        category: "Vibration",
        stuckWindowTime: 15,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "flowStatus",
        abbr: "FMF",
        name: "Flow Rate",
        category: "Flow Meters",
        stuckWindowTime: 15,
        stuckValueTolerance: 0, // exact freeze — rate sensor
    },
    {
        key: "flowmeter",
        abbr: "FLW",
        name: "Flow Rate",
        category: "Flow Meters",
        stuckWindowTime: 15,
        stuckValueTolerance: 0, // exact freeze — rate sensor
    },
    {
        key: "flowMeterTotalizer",
        abbr: "FMT",
        name: "Flow Totalizer",
        category: "Flow Meters",
        stuckWindowTime: 30,
        stuckValueTolerance: 0, // non-incrementing totalizer
    },
    {
        key: "barScreenChamber",
        abbr: "BS",
        name: "Bar Screen Choking",
        category: "Bar Screen Level",
        stuckWindowTime: 20,
        stuckValueTolerance: 0.5 / 100, // 0.5% FSR
    },
    {
        key: "energyUsedPerHourOld",
        abbr: "EMKWH",
        name: "Energy Used Per Hour",
        category: "Energy Meters",
        stuckWindowTime: 30,
        stuckValueTolerance: 0, // non-incrementing totalizer
    },
    {
        key: "hooterSensor",
        abbr: "HT",
        name: "Hooter",
        category: "Hooter",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "flocDetector",
        abbr: "FDST",
        name: "SV30",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "svol30Sensor",
        abbr: "SVOL30",
        name: "SV30",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "svol30Image",
        abbr: "SVOL30_IMG",
        name: "SV30 Image",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "svol60Sensor",
        abbr: "SVOL60",
        name: "SV60",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "svol60Image",
        abbr: "SVOL60_IMG",
        name: "SV60 Image",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "svol90Sensor",
        abbr: "SVOL90",
        name: "SV90",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "svol90Image",
        abbr: "SVOL90_IMG",
        name: "SV90 Image",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "svolCustomSensor",
        abbr: "SVOL_CUS",
        name: "SV30",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "svolCustomImageSensor",
        abbr: "SVOL_CUS_IMG",
        name: "SV Custom Image",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "sludgeVolumeSensor",
        abbr: "SVOL",
        name: "SV Raw",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "svolIssueDetectionSensor",
        abbr: "SVOL_ISSUE",
        name: "SV30",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "svolIssueDetectionImageSensor",
        abbr: "SVOL_ISSUE_IMG",
        name: "SV Raw Image",
        category: "Biomass Health",
        stuckWindowTime: 60,
        stuckValueTolerance: 1 / 100, // 1% FSR
    },
    {
        key: "manualInput",
        abbr: "DI_",
        name: "Manual Input",
        category: "Manual Input",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
    {
        key: "other",
        abbr: "OTH",
        name: "Other",
        category: "Other",
        stuckWindowTime: null,
        stuckValueTolerance: null,
    },
];
exports.sensorInputType = ["Modbus", "Analog", "Digital"];
