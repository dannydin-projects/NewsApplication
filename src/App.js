import React, { useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
const App = () => {
  const apikey = process.env.REACT_APP_NEWS_API;
  const [progress,setProgress]=useState(0);
  return (
    <>
      <Router>
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Navbar />
        <Routes>
          <Route path="/general" element={<News apikey={apikey} setProgress={setProgress} key="general" pageSize={6} country="in" category="general" />}></Route>
          <Route path="/sports" element={<News apikey={apikey} setProgress={setProgress} key="sports" pageSize={6} country="in" category="sports" />}></Route>
          <Route path="/entertainment" element={<News apikey={apikey} setProgress={setProgress} key="entertainment" pageSize={6} country="in" category="entertainment" />}></Route>
          <Route path="/health" element={<News apikey={apikey} setProgress={setProgress} key="health" pageSize={6} country="in" category="health" />}></Route>
          <Route path="/science" element={<News apikey={apikey} setProgress={setProgress} key="science" pageSize={6} country="in" category="science" />}></Route>
          <Route path="/technology" element={<News apikey={apikey} setProgress={setProgress} key="technology" pageSize={6} country="in" category="technology" />}></Route>
        </Routes>

      </Router>
    </>
  )

}
export default App;