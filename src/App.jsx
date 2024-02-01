import { useState,useEffect,useRef, useCallback } from 'react'
import './App.css'
import NewsBox from './News';
import Header from './header';

console.log("_______________________")

export default function App() {
  const [allnewsarticles,setAllNewsArticles] = useState([]);
  const [noNewsContent,setNoNewsContent] = useState('Daily News');
  //========================================================= //
  useEffect(() => {
    const countrycode = "us";
    const country = `country=${countrycode}`;

    //const apilink1 = "https://saurav.tech/NewsAPI/top-headlines/category/general/in.json";
    // fetching function
    const fetchapidata = async () => {
      try {
        // Fetching data from apilink1
        const response1 = await fetch(`https://newsapi.org/v2/top-headlines?${country}&apiKey=a086511760904f5896d6a016d19b2d28`);
        if (!response1.ok || response1.status==429){
          const response1 = await fetch(`https://saurav.tech/NewsAPI/top-headlines/category/general/in.json`);
          const Newsdata = await response1.json();
          setAllNewsArticles(Newsdata.articles.slice(0,20));
        }
        else{
          const Newsdata = await response1.json();
          setAllNewsArticles(Newsdata.articles.slice(0,20));
        }
      } 
      catch (error) {
        console.log("Error in API fetching:", error);
      }
    }
    // calling fetching required fetch api.......
    fetchapidata();
  }, []);
  
  //========================================================= //
  // function changes news on search input
  const ChangeNewsContent = useCallback(async (trimmedSearchValue, changed_date, currentDate) => {
    const addingSearchtoApi = encodeURIComponent(trimmedSearchValue); // Encode search query for URL

    try {
        let response2;

        if (currentDate === changed_date) {
            const apilinkSearch = `https://newsapi.org/v2/everything?q=${addingSearchtoApi}&apiKey=a086511760904f5896d6a016d19b2d28`;
            response2 = await fetch(apilinkSearch);
        } else {
            const apilinkEverythingDate = `https://newsapi.org/v2/everything?q=${addingSearchtoApi}&from=${changed_date}&to=${currentDate}&sortBy=popularity&apiKey=a086511760904f5896d6a016d19b2d28`;
            response2 = await fetch(apilinkEverythingDate);
        }

        if (!response2.ok) {
            throw new Error('Failed to fetch news from primary API');
        }

        const data = await response2.json();

        if (data.status === "ok" && data.articles.length > 0) {
            setAllNewsArticles(data.articles);
            setNoNewsContent("Your Searched News");
        } else {
            // Fallback to another API if primary API returns no articles
            const alternativeResponse = await fetch(`https://saurav.tech/NewsAPI/top-headlines/category/${trimmedSearchValue}/in.json`);
            const alternativeData = await alternativeResponse.json();

            if (alternativeData.status === "ok" && alternativeData.articles.length > 0) {
                setAllNewsArticles(alternativeData.articles);
                setNoNewsContent("Your Searched News (from alternative source)");
            } else {
                setNoNewsContent("No News Available");
                console.log("No news found from both APIs");
            }
        }
    } catch (error) {
        setNoNewsContent("Error Fetching News");
        console.error("Error fetching news:", error);
    }
}, []);



  // ASIDE NEWS DATA FETCHED AND ADDED..
  /*
  let [asidenewsdata,SetAsideNewsData] = useState([]);

  const aside_fetch = fetch("https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=a086511760904f5896d6a016d19b2d28")
                        .then(response => response.json())
                        .then(data => {
                            SetAsideNewsData(data.articles)
                            console.log("Asidenewsdata added:::", asidenewsdata);
                          })
                        .catch(error => console.error("Error fetching aside data:", error))
                        .finally(() => console.log("no work done"));*/
  const [asidesportsnewsdata, setAsideSportsNewsData] = useState([]);
  const [asidebusinessnewsdata, setAsideBusinessNewsData] = useState([]);
  const [asidehealthnewsdata, setAsideHealthNewsData] = useState([]);
  const [asidesciencenewsdata, setAsideScienceNewsData] = useState([]);
  const [asidetechnologynewsdata, setAsideTechnologyNewsData] = useState([]);

  useEffect(() => {
    const currentDateObj = new Date();
    const currentMonth = ('0' + (currentDateObj.getMonth() + 1)).slice(-2);
    const currentDay = ('0' + currentDateObj.getDate()).slice(-2);
    const currentYear = currentDateObj.getFullYear();
    const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    let previousDate ;
    if (currentDay === '01' && currentMonth === '01') {
        const previousYear = currentYear - 1;
        previousDate = `${previousYear}-12-31`;
    } else {
        const previousDay = ('0' + (currentDay - 1)).slice(-2);
        previousDate = `${currentYear}-${currentMonth}-${previousDay}`;
    }

    const fetchNewsData = async (category, setData) => {
      try {
          const response = await fetch(`https://newsapi.org/v2/everything?q=${category}&from=${previousDate}&to=${currentDate}&sortBy=popularity&apiKey=a086511760904f5896d6a016d19b2d28`);
          if (!response.ok || response.status === 429) {
              // Fetch data from alternative source if the initial request fails
              const alternativeResponse = await fetch(`https://saurav.tech/NewsAPI/top-headlines/category/${category}/in.json`);
              const alternativeData = await alternativeResponse.json();
              setData(alternativeData.articles);
          } else {
              const data = await response.json();
              setData(data.articles);
          }
      } catch (error) {
          console.error(`Error fetching ${category} data:`, error);
      }
    };
  

    fetchNewsData('sports', setAsideSportsNewsData);
    fetchNewsData('business', setAsideBusinessNewsData);
    fetchNewsData('health', setAsideHealthNewsData);
    fetchNewsData('science', setAsideScienceNewsData);
    fetchNewsData('technology', setAsideTechnologyNewsData);
}, []);


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
            <h1 className='aside-section-heading'>Categories</h1>
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
                              newspublisheddate={newsdata.publishedAt.slice(0,10)}
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
                              newspublisheddate={newsdata.publishedAt.slice(0,10)}
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
                              newspublisheddate={newsdata.publishedAt.slice(0,10)}
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
                              newspublisheddate={newsdata.publishedAt.slice(0,10)}
                          />
                    </div>
                  );
                })}
              </section>
              <section className='technology-aside aside-newsBox flex'>
                <p>technology</p>
                {asidetechnologynewsdata.length > 0 && 
                  asidetechnologynewsdata.slice(0,3).map((newsdata,index) => {
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
            </section>
      </aside>
    </>
  )
}
