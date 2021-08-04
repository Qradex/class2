import "./commons/global.css"
import { ThemeProvider } from "@material-ui/core"
import { theme } from "./commons/constants/theme"
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { Feeds } from "./components/Feed"
import { TemplateAuth } from "./components/TemplateAuth"
import { TemplateMain } from "./components/TemplateMain"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

// const PrivateRoute = ({ children, ...rest }) => {
//   let auth = useAuth();
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         auth.user ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/noticias" >
              <TemplateMain>
                <Feeds />
              </TemplateMain>
            </Route>
            <TemplateAuth>
              <Route path="/logar" >
                <Login />
              </Route>
              <Route path="/registrar" >
                <Register />
              </Route>
            </TemplateAuth>
          </Switch>
        </Router>
      </ThemeProvider>
    </div >
  );
}

export default App;
