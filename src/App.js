import { Route, Switch } from 'react-router'
import Header from './components/Header'
import Home from './layout/Home'
import Lyrics from './layout/Lyrics'

export default function App() {
    return <div className="light-theme">
        <Header />
        <div className="body">
            <Switch>
                <Route path="/:artist/:song" exact component={Lyrics} />
                <Route path="/" component={Home} />
            </Switch>
        </div>
    </div>
}