import React, { useState, useEffect } from 'react';
import ReactionGame from '../components/ReactionGame';
import './Reaction.css';

const Reaction = () => {
    const [reactionTimes, setReactionTimes] = useState([]);
    const [averageTime, setAverageTime] = useState(null);
    const [rank, setRank] = useState(null);
    const [topScores, setTopScores] = useState([]); // Top scores state
    const [name, setName] = useState('');
    const [scoreSaved, setScoreSaved] = useState(false);

    useEffect(() => {
        getTopScores(); // Automatically fetch top scores when the page loads
    }, []);

    const handleReactionComplete = (time) => {
        const newTimes = [...reactionTimes, time];

        if (newTimes.length === 3) {
            const average = newTimes.reduce((acc, cur) => acc + cur, 0) / 3;
            setAverageTime(average);
            getRank(average);
        }

        setReactionTimes(newTimes);
    };

    const getRank = async (average) => {
        try {
            const response = await fetch('/api/reaction/rank', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ score: average })
            });
            const data = await response.json();
            setRank(data.rank);
        } catch (error) {
            console.error('Error fetching rank:', error);
        }
    };

    const getTopScores = async () => {
        try {
            const response = await fetch('/api/reaction/top-scores');
            if (!response.ok) {
                throw new Error('Failed to fetch top scores');
            }
            const data = await response.json();
            console.log('Fetched top scores:', data); // Debugging line
            setTopScores(data); // Updates the topScores state here
        } catch (error) {
            console.error('Error fetching top scores:', error);
        }
    };

    const saveScore = async () => {
        try {
            await fetch('/api/reaction/save-score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, score: averageTime })
            });
            setScoreSaved(true);
        } catch (error) {
            console.error('Error saving score:', error);
        }
    };

    return (
        <div className="reaction-page">
            <h1>Reaction Game</h1>

            <ReactionGame onReactionComplete={handleReactionComplete} />

            <div className="stats-and-leaderboard">
                <div className="statistics">
                    <h2>Statistics</h2>
                    {reactionTimes.length > 0 ? (
                        <ul>
                            {reactionTimes.map((time, index) => (
                                <li key={index}>Attempt {index + 1}: {time} ms</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No attempts yet.</p>
                    )}

                    {averageTime && (
                        <div>
                            <p>Your average time: {averageTime} ms</p>
                            <p>Your rank: {rank}</p>
                            <button onClick={saveScore}>Save your score</button>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {scoreSaved && <p>Score saved, {name}!</p>}
                        </div>
                    )}
                </div>

                <div className="leaderboard">
                    <h2>Top 5 Scores of the Day</h2>
                    <ul>
                        {topScores.length > 0 ? (
                            topScores.map((score, index) => (
                                <li key={score._id}>{score.name}: {score.score.toFixed(2)} ms</li>
                            ))
                        ) : (
                            <li>No scores available</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Reaction;
