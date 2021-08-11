
import { MenuListComposition } from "./components/Navbar"
import CoinOfTheDay from "./components/Coinoftheday"
import "./commons/global.css";
import { ThemeProvider } from "@material-ui/core"
import { theme } from "./commons/constants/theme"
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { Navbar } from "./components/Navbar"
import {
  BrowserRouter as Router,
  Switch,
  Route } from 'react-router-dom'
import "./commons/global.css";
import { Feeds } from "./components/Feed";
import { TemplateAuth } from "./components/TemplateAuth"
import { TemplateMain } from "./components/TemplateMain"
import Market from "./components/Market";

function App() {
  return (
    <div className="App">
      
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/logar">
              <Login />
            </Route>
            <Route path="/registrar">
              <Register />
            </Route>
            <Route path="/moedadodia">
              <CoinOfTheDay />
            </Route>
            <Route  exact path="/">
              <MenuListComposition />  
            </Route>  
            <Route path="/noticias">
              <TemplateMain>
                <Feeds />
              </TemplateMain>
            </Route>
            <Route>
              <TemplateMain>
                <Market/>
              </TemplateMain>
            </Route>
            <TemplateAuth>
              <Route exact path="/">
                <Login />
              </Route> 
            </TemplateAuth>
          </Switch>
        </Router>
      </ThemeProvider>
      
    </div>
  );
}

export default App;
