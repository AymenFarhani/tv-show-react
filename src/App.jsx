import s from './style.module.css';
import "./global.css";
import { TVShowAPI } from './api/tv-show';
import { useEffect, useState } from 'react';
import { BACKDROP_BASE_URL } from './config';
import { TVShowDetail } from "./components/TVShowDetail";
import { Logo } from './components/Logo/Logo';
import logo from "./assets/images/logo.png";
import { SearchBar} from './components/SearchBar/SearchBar';
import { TvShowList } from './components/TvShowList/TvShowList';


export function App() {
  const[currentTVShow, setCurrentTVShow] = useState();
  const[recommendationList, setRecommendationList] = useState();

  async function fetchPopulars() {
    try {
    const populars = await TVShowAPI.fetchPopulars();
    if(populars.length > 0) {
      setCurrentTVShow(populars[0]);
    }
  }catch(error) {
    alert("Error when searching popular movies");
  }
  }

  async function fetchRecommendations(tvShowId) {
    try {
    const recommendations = await TVShowAPI.fetchRecommendations(tvShowId);
    if(recommendations.length > 0) {
      setRecommendationList(recommendations.slice(0,10));
    }
  }catch(error) {
      alert("Error when searching recommandations of a movie");
    }
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if(currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);
  
  async function searchTvShow(title) {
    try {
    const searchResponse = await TVShowAPI.fetchTvShowByTitle(title);
    if(searchResponse.length > 0) {
      setCurrentTVShow(searchResponse[0]);
    }
  }catch(error) {
    alert("Error when searching a movie by title");
  }
  }
  
    return (
        <div className={s.main_container} style={{background: currentTVShow ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}/${currentTVShow.backdrop_path}}") no-repeat center / cover`: "black"}}>
          <div className={s.header}>
            <div className="row">
              <div className="col-4">
                <Logo image={logo} title="Watowatch" subtitle="Find a show you may like"/>
              </div>
              <div className="col-md-12 col-lg-4">
                <SearchBar onSubmit={searchTvShow}/>
              </div>
            </div>
          </div>
          <div className={s.tv_show_details}>{currentTVShow && <TVShowDetail tvShow={currentTVShow}/>}</div>
          <div className={s.recommended_shows}>{recommendationList && recommendationList.length > 0 &&
            (<TvShowList tvShowList = {recommendationList}/>)}
            </div>
        </div>
      );
}