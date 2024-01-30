import { useState,useEffect,useRef, useCallback } from 'react'
import './App.css'
import NewsBox from './News';
import Header from './header';
import allCountries from './countries';

console.log("_______________________")

export default function App() {
  const [allnewsarticles,setAllNewsArticles] = useState([]);
  const [noNewsContent,setNoNewsContent] = useState('Daily News');
  //========================================================= //
  useEffect(() => {
    const countrycode = "us";
    const country = `country=${countrycode}`;
    
    //const apilink1 = "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json";
    const apilinkTopheadlinesCountry = `//https://newsapi.org/v2/top-headlines?${country}&apiKey=a086511760904f5896d6a016d19b2d28`;

    // fetching function
    const fetchapidata = async (ApiLink) => {
      try {
        // Fetching data from apilink1
        const response1 = await fetch(ApiLink);
        const Newsdata = await response1.json();

        setAllNewsArticles(Newsdata.articles);
      } 
      catch (error) {
        console.log("Error in API fetching:", error);
      }
    }
    // calling fetching required fetch api.......
    fetchapidata(apilinkTopheadlinesCountry);
  }, []);
  
  //========================================================= //
  // function changes news on search input
  
  const ChangeNewsContent = useCallback(async (trimmedSearchValue, changed_date, currentDate) => {
    const addingSearchtoApi = trimmedSearchValue;
    let response2;
  });
  
  const [asidesportsnewsdata, setAsideSportsNewsData] = useState([]);
  const [asidebusinessnewsdata, setAsideBusinessNewsData] = useState([]);
  const [asidehealthnewsdata, setAsideHealthNewsData] = useState([]);
  const [asidesciencenewsdata, setAsideScienceNewsData] = useState([]);
  const [asidetechnologynewsdata, setAsideTechnologyNewsData] = useState([]);

  useEffect(() => {
    const asideSportsFetch = async () => {
      try {
        const response = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json");//https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=a086511760904f5896d6a016d19b2d28");
        const data = await response.json();
        setAsideSportsNewsData(data.articles);
      } catch (error) {
        console.error("Error fetching aside data:", error);
      }
    };
    asideSportsFetch();
    const asideBusinessFetch = async () => {
      try {
        const response = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/in.json");//https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=a086511760904f5896d6a016d19b2d28");
        const data = await response.json();
        setAsideBusinessNewsData(data.articles);
      } catch (error) {
        console.error("Error fetching aside data:", error);
      }
    };
    asideBusinessFetch();
    const asideHealthFetch = async () => {
      try {
        const response = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/health/in.json");//https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=a086511760904f5896d6a016d19b2d28");
        const data = await response.json();
        setAsideHealthNewsData(data.articles);
      } catch (error) {
        console.error("Error fetching aside data:", error);
      }
    }
    asideHealthFetch();
    const asideScienceFetch = async () => {
      try {
        const response = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/science/in.json");//https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=a086511760904f5896d6a016d19b2d28");
        const data = await response.json();
        setAsideScienceNewsData(data.articles);
      } catch (error) {
        console.error("Error fetching aside data:", error);
      }
    }
    asideScienceFetch();
    const asideTechnologyFetch = async () => {
      try {
        const response = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json");//https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=a086511760904f5896d6a016d19b2d28");
        const data = await response.json();
        setAsideTechnologyNewsData(data.articles);
      } catch (error) {
        console.error("Error fetching aside data:", error);
      }
    }
    asideTechnologyFetch();
  })

  return (
    <>
      <header>
        <Header ChangeNewsContent={ChangeNewsContent} />
      </header>
      
      <main className="Container">
        <h1 className='newsheader'>Top Headlines</h1>
          <div className='noNewsBox'><h1>{noNewsContent}</h1></div>
          <section className='newsbox-container'>
            {allnewsarticles.map((newsdata,index) => {
                return (
                  <div className='newsbox flex' key={index}>
                    <NewsBox
                            newsimage={newsdata.urlToImage} 
                            newstitle={newsdata.title}
                            newsdescription={newsdata.description}
                            newslink={newsdata.url}
                            newsauthor={newsdata.author}
                            newspublisheddate={newsdata.publishedAt.slice(0,10)}
                        />
                  </div>
                );
              })}
          </section>
      </main>

      <aside className='aside'>  
            <h1 className='aside-section-heading'>Catlogs</h1>
            <section className='aside-sections flex'>
              <section className='sports-aside aside-newsBox flex'>
                <p>sports</p>
                {asidesportsnewsdata.length > 0 && 
                  asidesportsnewsdata.slice(0,4).map((newsdata,index) => {
                  return (
                    <div className='newsbox flex' key={index}>
                      <NewsBox
                              newsimage={newsdata.urlToImage} 
                              newstitle={newsdata.title}
                              newsdescription={newsdata.description}
                              newslink={newsdata.url}
                              newsauthor={newsdata.author}
                              newspublisheddate={newsdata.publishedAt}
                          />
                    </div>
                  );
                })}
              </section>
              <section className='business-aside aside-newsBox flex'>
                <p>business</p>
                {asidebusinessnewsdata.length > 0 &&
                  asidebusinessnewsdata.slice(0,4).map((newsdata,index) => {
                  return (
                    <div className='newsbox flex' key={index}>
                      <NewsBox
                              newsimage={newsdata.urlToImage} 
                              newstitle={newsdata.title}
                              newsdescription={newsdata.description}
                              newslink={newsdata.url}
                              newsauthor={newsdata.author}
                              newspublisheddate={newsdata.publishedAt}
                          />
                    </div>
                  );
                })}
              </section>
              <section className='health-aside aside-newsBox flex'>
                <p>health</p>
                {asidehealthnewsdata.length > 0 &&
                  asidehealthnewsdata.slice(0,4).map((newsdata,index) => {
                  return (
                    <div className='newsbox flex' key={index}>
                      <NewsBox
                              newsimage={newsdata.urlToImage} 
                              newstitle={newsdata.title}
                              newsdescription={newsdata.description}
                              newslink={newsdata.url}
                              newsauthor={newsdata.author}
                              newspublisheddate={newsdata.publishedAt}
                          />
                    </div>
                  );
                })}
              </section>
              <section className='science-aside aside-newsBox flex'>
                <p>science</p>
                {asidesciencenewsdata.length > 0 && 
                  asidesciencenewsdata.slice(0,4).map((newsdata,index) => {
                  return (
                    <div className='newsbox flex' key={index}>
                      <NewsBox
                              newsimage={newsdata.urlToImage} 
                              newstitle={newsdata.title}
                              newsdescription={newsdata.description}
                              newslink={newsdata.url}
                              newsauthor={newsdata.author}
                              newspublisheddate={newsdata.publishedAt}
                          />
                    </div>
                  );
                })}
              </section>
              <section className='technology-aside aside-newsBox flex'>
                <p>technology</p>
                {asidetechnologynewsdata.length > 0 && 
                  asidetechnologynewsdata.slice(0,4).map((newsdata,index) => {
                  return (
                    <div className='newsbox flex' key={index}>
                      <NewsBox
                              newsimage={newsdata.urlToImage} 
                              newstitle={newsdata.title}
                              newsdescription={newsdata.description}
                              newslink={newsdata.url}
                              newsauthor={newsdata.author}
                              newspublisheddate={newsdata.publishedAt}
                          />
                    </div>
                  );
                })}
              </section>
            </section>
      </aside>
    </>
  )
}
