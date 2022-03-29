import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import AgregarHabilidades from "../components/AgregarHabilidades";
import DetallesHacedor from "../components/DetallesHacedor";
import InicioSesionApp from "../components/InicioSesionApp";
import PerfilClienteApp from "../components/PerfilClienteApp";
import PerfilHacedorApp from "../components/PerfilHacedorApp";
import RegistroApp from "../components/RegistroApp";

export const AppRouter = () => {

    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path={"/"} component={InicioSesionApp} />
                    <Route path={"/login"} component={InicioSesionApp} />
                    <Route path={"/registro"} component={RegistroApp} />
                    <Route exact path={"/perfilHacedor/:idHacedor"} component={PerfilHacedorApp} />
                    <Route exact path={"/perfilCliente/:idCliente"} component={PerfilClienteApp} />
                    <Route exact path={"/detallesHacedor"} component={DetallesHacedor} />
                    <Route exact path={"/agregarHabilidades"} component={AgregarHabilidades} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
