import React, { useState } from 'react';
import './header.css';

console.log("------------------------")

export default function Header({ ChangeNewsContent }) {
    const currentDateObj = new Date();
    const currentMonth = ('0' + (currentDateObj.getMonth() + 1)).slice(-2);
    const currentDay = ('0' + currentDateObj.getDate()).slice(-2);
    const currentYear = currentDateObj.getFullYear();
    const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

    let year = currentYear - 1;
    let month = currentMonth;
    let day = currentDay;
    if (currentMonth === '02' && ((currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0)) {
        day = ('0' + (day - 1)).slice(-2);
    } else {
        day = ('0' + day).slice(-2);
    }
    const fromDate = `${year}-${month}-${day}`;

    const [changed_date, setChanged_date] = useState(currentDate);
    const [searchvalue, setSearchValue] = useState('');

    const setNewDate = (event) => {
        setChanged_date(event.target.value);
        console.log(changed_date, ": changed_date");
    }

    const SearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    const SearchNews = () => {
        const trimmedSearchValue = searchvalue.trim().toLowerCase();
        if (trimmedSearchValue) {
            ChangeNewsContent(trimmedSearchValue, changed_date, currentDate);
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            SearchNews();
        }
    }

    return (
        <div className="headerbox flex">
            
            <div className="header-left flex">
                <img
                    className="head-logo"
                    src="src/news-favicon11.png"
                    alt=""
                    width="50px"
                />
                <h1 className="head-name">DasNews</h1>
            </div>

            <div className="header-right flex">
                <div className="head-search-box flex">
                    <input
                        type="text"
                        name="inputName"
                        id="inputtext"
                        className="search-input"
                        placeholder="Search News"
                        onChange={SearchInput}
                    />
                    <button
                        type="button"
                        className="search-icon-btn"
                        onClick={SearchNews}
                        onKeyPress={handleKeyPress}
                    >
                        <img src="src/search.png" alt="" className="search-icon" />
                    </button>
                </div>
                <div className="head-date-box">
                    <span>From</span>
                    <input
                        type="date"
                        contentEditable="true"
                        name="dateInputName"
                        id="dateinput"
                        className="date-input"
                        value={changed_date}
                        min={fromDate}
                        max={currentDate}
                        onChange={setNewDate}
                    />
                </div>
            </div>

        </div>
    );
}
