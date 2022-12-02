import React from 'react';

import HomeView from './components/views/HomeView';
import ManageView from './components/views/ManageView';
import LeaderboardView from './components/views/LeaderboardView';
import WalletMenuItem from './components/menu/WalletMenuItem';
import FullSetView from './components/views/FullSetView';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'Home',
    };
  }

  render() {
    return (
      <div className="ui container">
        <div className="App">
          <div
            style={{ cursor: 'pointer' }}
            className="ui six item compact stackable fluid menu"
          >
            <div
              className="item"
              onClick={() => this.setState({ currentView: 'Home' })}
            >
              {' '}
              <img src={`images/site/logo.png`} alt="logo" />
              Home
            </div>
            <div
              className="item"
              onClick={() => this.setState({ currentView: 'Manage' })}
            >
              {' '}
              Manage Team
            </div>
            <div
              className="item"
              onClick={() => this.setState({ currentView: 'MySets' })}
            >
              {' '}
              My Sets
            </div>
            <div
              className="item"
              onClick={() => this.setState({ currentView: 'Leaderboard' })}
            >
              Historic Leaderboard
            </div>
            <a
              className="item"
                        href="https://opensea.io/collection/angel-battles-historical-wrapper"
            >
              Opensea
            </a>

            <div className="item">
              <div className="content">
                <WalletMenuItem />
              </div>
            </div>
          </div>
        </div>

        <div className="ui divider"></div>

        {this.state.currentView === 'Home' && <HomeView />}

        {this.state.currentView === 'MySets' && <FullSetView />}

        {this.state.currentView === 'Manage' && <ManageView />}
        {this.state.currentView === 'Leaderboard' && <LeaderboardView />}
      </div>
    );
  }
}

export default App;
