import React, { useState } from "react";
import "./dashboard.css";
import ProgressBar from "@ramonak/react-progress-bar";
import { Chart } from "react-google-charts";

const generateTweetsAndRepliesDataForPieChart = (tweets, replies) => {
  const tweetsData = [["Topic", "Engagements"]];
  const repliesData = [["Topic", "Engagements"]];
  if (tweets) tweetsData.push(...tweets.map((twt) => [twt.title, twt.value]));
  if (replies)
    repliesData.push(...replies.map((twt) => [twt.title, twt.value]));

  const options = {
    title: "Topics and Engagements",
    is3D: true,
  };
  return { tweetsData, repliesData, options };
};

const Card = (cardDetails, index) => {
  return (
    <div className="card" key={index}>
      <h3>{cardDetails.title}</h3>
      <div
        style={{
          display: "-webkit-box",
          marginBottom: "10px",
        }}
      >
        <p style={{ margin: "0px 10px 0px", minWidth: "140px" }}>
          Neutral Sentiment
        </p>
        {cardDetails.neutralSentiment ? (
          <ProgressBar completed={cardDetails.neutralSentiment} width="70%" />
        ) : (
          <ProgressBar
            completedClassName="barCompleted"
            labelClassName="label"
            customLabel="Not Available"
            width="70%"
          />
        )}
      </div>
      <div
        style={{
          display: "-webkit-box",
          marginBottom: "10px",
        }}
      >
        <p style={{ margin: "0px 10px 0px", minWidth: "140px" }}>
          Positive Sentiment
        </p>
        {cardDetails.positiveSentiment ? (
          <ProgressBar completed={cardDetails.positiveSentiment} width="70%" />
        ) : (
          <ProgressBar
            completedClassName="barCompleted"
            labelClassName="label"
            customLabel="Not Available"
            width="70%"
          />
        )}
      </div>
      <div
        style={{
          marginBottom: "10px",
          display: "-webkit-box",
        }}
      >
        <p style={{ margin: "0px 10px 0px", minWidth: "140px" }}>
          Negative Sentiment
        </p>
        {cardDetails.negativeSentiment ? (
          <ProgressBar completed={cardDetails.negativeSentiment} width="70%" />
        ) : (
          <ProgressBar
            completedClassName="barCompleted"
            labelClassName="label"
            customLabel="Not Available"
            width="70%"
          />
        )}
      </div>
    </div>
  );
};

const Dashboard = (data) => {
  const { tweets, replies, engagement } = data;
  const { tweetsData, repliesData, options } =
    generateTweetsAndRepliesDataForPieChart(tweets, replies);
  const [selectedSection, setSelectedSection] = useState("tweets");

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const renderCards = () => {
    let cards = [];

    switch (selectedSection) {
      case "tweets":
        cards[0] = (
          <div style={{ minWidth: "800px" }} key={-1}>
            <Chart
              chartType="PieChart"
              data={tweetsData}
              options={options}
              width={"100%"}
              height={"400px"}
            />
          </div>
        );
        cards.push(
          ...tweets.map((tweet, index) => {
            return Card(tweet, index);
          })
        );
        break;
      case "replies":
        cards[0] = (
          <div style={{ minWidth: "800px" }} key={-1}>
            <Chart
              chartType="PieChart"
              data={repliesData}
              options={options}
              width={"100%"}
              height={"400px"}
            />
          </div>
        );
        cards.push(
          ...replies.map((reply, index) => {
            return Card(reply, index);
          })
        );
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
          <div
            className="card"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex" }}>
              <h5>Likes Count : </h5>{" "}
              <span style={{ fontSize: "14px" }}>{data.likes_count}</span>
            </div>
            <div style={{ display: "flex" }}>
              <h5>Retweets Count : </h5>{" "}
              <span style={{ fontSize: "14px" }}>{data.retweets_count}</span>
            </div>
            <div style={{ display: "flex" }}>
              <h5> Replies Count : </h5>{" "}
              <span style={{ fontSize: "14px" }}>{data.replies_count}</span>
            </div>
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
        {replies ? (
          <button
            className={`button ${
              selectedSection === "replies" ? "active" : ""
            }`}
            style={{
              backgroundColor:
                selectedSection === "replies" ? "#9dbbda" : "gray",
            }}
            onClick={() => handleSectionClick("replies")}
          >
            Replies
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <div
        className="card-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {renderCards()}
      </div>
    </div>
  );
};

export default Dashboard;
