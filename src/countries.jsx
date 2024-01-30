import React from "react";

export default function allCountries(props){
  const allCountriesCodes = {
    "ae": "United Arab Emirates",
    "ar": "Argentina",
    "at": "Austria",
    "au": "Australia",
    "be": "Belgium",
    "bg": "Bulgaria",
    "br": "Brazil",
    "ca": "Canada",
    "ch": "Switzerland",
    "cn": "China",
    "co": "Colombia",
    "cu": "Cuba",
    "cz": "Czech Republic",
    "de": "Germany",
    "eg": "Egypt",
    "es": "Spain",
    "fr": "France",
    "gb": "United Kingdom",
    "gr": "Greece",
    "hk": "Hong Kong",
    "hu": "Hungary",
    "id": "Indonesia",
    "ie": "Ireland",
    "il": "Israel",
    "in": "India",
    "it": "Italy",
    "jp": "Japan",
    "kr": "South Korea",
    "kw": "Kuwait",
    "lk": "Sri Lanka",
    "lt": "Lithuania",
    "lu": "Luxembourg",
    "ma": "Morocco",
    "mx": "Mexico",
    "my": "Malaysia",
    "ng": "Nigeria",
    "nl": "Netherlands",
    "no": "Norway",
    "nz": "New Zealand",
    "ph": "Philippines",
    "pl": "Poland",
    "pt": "Portugal",
    "ro": "Romania",
    "rs": "Serbia",
    "ru": "Russia",
    "sa": "Saudi Arabia",
    "se": "Sweden",
    "sg": "Singapore",
    "sk": "Slovakia",
    "th": "Thailand",
    "tr": "Turkey",
    "tw": "Taiwan",
    "ua": "Ukraine",
    "us": "United States",
    "ve": "Venezuela",
    "za": "South Africa"
  }; 
  let enteredCountryCode = props.enteredCountryCode.toLowerCase().trim()
  let settingCountryCode = null;

  Object.entries(allCountriesCodes).forEach(([code,fullname])=>{
    if (fullname === enteredCountryCode){
      settingCountryCode = code;
    }
  })
  
  return settingCountryCode;

}