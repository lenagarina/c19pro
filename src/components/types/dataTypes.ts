export type MetaInformation = {
  lastUpdate: string
  lastCheckedForUpdate: string
}

type HospitalizationType = {
  lastUpdate: string
}

export type StatesStatisticsType = {
  name: string
  population: number
  cases: number
  deaths: number
  recovered: number
  hospitalization: HospitalizationType
  abbreviation: string
}

export type AgeStatisticsSubType = {
  casesMale: number
  casesFemale: number
  deathsMale: number
  deathsFemale: number
  casesMalePer100k: number
  casesFemalePer100k: number
  deathsMalePer100k: number
  deathsFemalePer100k: number
}

export type AgeStatisticsType = {
  [key: string]: AgeStatisticsSubType
}

export type DistrictsStatisticsSubType = {
  ags: number
  name: string
  county: string
  state: string
  population: number
  cases: number
  deaths: number
  casesPerWeek: number
  deathsPerWeek: number
  stateAbbreviation: string
  recovered: number
  weekIncidence: number
  casesPer100k: number
}

export type DistrictsStatisticsType = {
  [key: string]: DistrictsStatisticsSubType
}

export type DistrictsMetaType = {
  source: string
  contact: string
  info: string
  lastUpdate: string
}

export type WeekHospitalizationStatisticsType = {
  cases7Days: number
  date: string
}

export type WeekRecoveredStatisticsType = {
  recovered: number
  date: string
}

export type WeekCasesStatisticsType = {
  cases: number
  date: string
}

export type WeekDeathsStatisticsType = {
  deaths: number
  date: string
}

export type KundenFormType = {
  kundenName: string
  kundenEmail: string
  kundenTel: string
  kundenText: string
}
