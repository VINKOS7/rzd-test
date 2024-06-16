import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import { AuthPage } from './pages/Auth/AuthPage';
import { MainPage } from './pages/MainPage/MainPage';

import './App.scss';
import { RoadsAnalyzePage } from './pages/SpeedHeightAnalyzePage/RoadsAnalyzePage';


export const SpeedHeightAnalyzePath = '/speed-height-analyze'
export const signinPath = '/signin'

//                  <Route path={signinPath} element={<AuthPage/>}/>

function App() {  
  return (
    <div>
        <BrowserRouter> 
            <div className={'body'}>
              <div className={'scene'}>
                <Routes>
                  <Route path='/' element={<MainPage/>}/>
                  <Route path={SpeedHeightAnalyzePath} element={<RoadsAnalyzePage/>}/>
                </Routes>
              </div>
          </div>
        </BrowserRouter> 
    </div>
  );
}

export default App;