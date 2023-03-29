import React, { useState } from "react";
import "./dashboard.css";
import ProgressBar from "@ramonak/react-progress-bar";

const Dashboard = (data) => {
  const { tweets, replies, engagement } = data;
  const [selectedSection, setSelectedSection] = useState("tweets");

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const renderCards = () => {
    let cards = [];

    switch (selectedSection) {
      case "tweets":
        cards = tweets.map((tweet, index) => {
          return (
            <div className="card" key={index}>
              <h3>{tweet.title}</h3>
              <div
                style={{
                  display: "-webkit-box",
                }}
              >
                <p style={{ margin: "0px 10px 0px" }}>Neutral Sentiment</p>
                {tweet.neutralSentiment ? (
                  <ProgressBar completed={tweet.neutralSentiment} width="70%" />
                ) : (
                  "Not available"
                )}
              </div>
              <div
                style={{
                  display: "-webkit-box",
                }}
              >
                <p style={{ margin: "0px 10px 0px" }}>Positive Sentiment</p>
                {tweet.positiveSentiment ? (
                  <ProgressBar
                    completed={tweet.positiveSentiment}
                    width="70%"
                  />
                ) : (
                  "Not available"
                )}
              </div>
              <div
                style={{
                  display: "-webkit-box",
                }}
              >
                <p style={{ margin: "0px 10px 0px" }}>Negative Sentiment</p>
                {tweet.negativeSentiment ? (
                  <ProgressBar
                    completed={tweet.negativeSentiment}
                    width="70%"
                  />
                ) : (
                  "Not available"
                )}
              </div>
            </div>
          );
        });
        break;
      case "replies":
        cards = replies.map((reply, index) => {
          return (
            <div className="card" key={index}>
              <h3>{reply.title}</h3>
            </div>
          );
        });
        break;
      default:
        break;
    }

    return cards;
  };

  return (
    <div className="my-component">
      <div>
        {engagement ? (
          <div className="card">
            <h3>{data.likes_count}</h3>
            <p>{data.retweets_count}</p>
            <p>{data.replies_count}</p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="section-nav">
        <button
          className={`button ${selectedSection === "tweets" ? "active" : ""}`}
          style={{
            backgroundColor: selectedSection === "tweets" ? "#9dbbda" : "gray",
          }}
          onClick={() => handleSectionClick("tweets")}
        >
          Tweets
        </button>
        <button
          className={`button ${selectedSection === "replies" ? "active" : ""}`}
          style={{
            backgroundColor: selectedSection === "replies" ? "#9dbbda" : "gray",
          }}
          onClick={() => handleSectionClick("replies")}
        >
          Replies
        </button>
      </div>
      <div className="card-container">{renderCards()}</div>
    </div>
  );
};

export default Dashboard;
