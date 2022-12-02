import React from 'react';
import HeaderSection from '../HeaderSection';

class LeaderboardView extends React.Component {
  render() {
    return (
      <div>
        <div className="ui divider"></div>
        <HeaderSection title="Mt. Zion - Leaderboard" />
        <div className="ui raised segment">
          <p>
            {' '}
            The new version of Angel Battles has an awesome,{' '}
            <a href="https://mirror.xyz/angelbattles.eth/YIAkHqdjhG2XXijS638scgaZWPLv8qOjibt0hmjji6Q">
              incentivized 2D leaderboard called the Battle Mountain.
            </a>{' '}
          </p>

          <p> Here is the final state of the legacy leaderboard </p>
          <img
            className="ui image"
            alt="previous leaderboard 1"
            src="images/legacy/leaderboard1.png"
          />
          <img
            className="ui image"
            alt="previous leaderboard 2"
            src="images/legacy/leaderboard2.png"
          />
          <img
            className="ui image"
            alt="previous leaderboard 3"
            src="images/legacy/leaderboard3.png"
          />
          <img
            className="ui image"
            alt="previous leaderboard 4"
            src="images/legacy/leaderboard4.png"
          />
          <img
            className="ui image"
            alt="previous leaderboard 5"
            src="images/legacy/leaderboard5.png"
          />
        </div>
      </div>
    );
  }
}

export default LeaderboardView;
