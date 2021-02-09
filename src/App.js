import { Route, Switch } from 'react-router'
import Header from './components/Header'
import Home from './layout/Home'
import Lyrics from './layout/Lyrics'
import { RecoilRoot } from 'recoil'

export default function App() {
    return <div className="light-theme">
        <RecoilRoot>
            <Header />
            <div className="body">
                <Switch>
                    <Route path="/:artist/:song" exact component={Lyrics} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </RecoilRoot>
    </div>
}