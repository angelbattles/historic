import React from 'react';
import ABCard from '../ABCard';
import HeaderSection from '../HeaderSection';

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { angels: [], pets: [], accessories: [] };
  }

  componentDidMount = () => {
    let angels = [];
    let accessories = [];
    let pets = [];

    for (var i = 0; i < 24; i++) {
      angels.push(<ABCard cardId={i} key={i} currNum={0} view={'Home'} />);
    }
    for (i = 24; i < 43; i++) {
      pets.push(<ABCard cardId={i} key={i} currNum={0} view={'Home'} />);
    }
    for (i = 43; i < 61; i++) {
      accessories.push(<ABCard cardId={i} key={i} currNum={0} view={'Home'} />);
    }
    this.setState({ angels, pets, accessories });
  };

  render(props) {
    return (
      <div>
        <div className="ui stackable grid ">
          <div className="ui raised segment">
            <div className="ui stackable grid">
              <div className="twelve wide column">
                <h3 className="ui dividing centered header">
                  Welcome to Angel Battles Historical Site
                </h3>
                <img
                  className=" ui centered fluid image"
                  src={`images/site/poster.png`}
                  alt="AB Site Poster"
                />
              </div>
              <div className="four wide column">
                <p>
                  Angel Battles is a decentralized application built on the
                  Ethereum blockchain.{' '}
                </p>
                <p>
                  Collect angel, pet, and accessory cards to train, breed, and
                  battle your way to the top of Mt. Zion, the global
                  leaderboard.{' '}
                </p>
                <p>
                  This is the historical site, version 2 will shortly be live on Polygon at{' '}
                  <a href="https://www.angelbattles.com/">
                    www.angelbattles.com (and .eth)
                  </a>{' '}
                </p>
                <p>
                  Angel Battles first contracts launched in Jan 2018. The ERC721
                  standard was in its infancy, and our first contracts were not
                                fully compatible (we used unlocks instead of approvals). See <a href="https://mirror.xyz/angelbattles.eth/866nn1xtxEoWA_3l0s0CIBtUoQ2See3yk2GDyrKka9I">
                                    full historical nft details
                                </a>{' '} 
                </p>
                <p>
                  We reached the top 5 Etherum games for DAU on dappradar, but
                  the complexity of the game was unsustainable in a high gas fee
                  environment.
                </p>
              </div>
            </div>
          </div>

          <HeaderSection title="Angels" />

          {this.state.angels}

          <HeaderSection title="Pets" />
          {this.state.pets}

          <HeaderSection title="Accessories" />
          {this.state.accessories}
        </div>
      </div>
    );
  }
}

export default HomeView;
