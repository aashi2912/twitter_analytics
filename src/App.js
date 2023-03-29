import React from "react";
import Dashboard from "./components/Dashboard";
import data from "./static-data";
import Header from "./components/Header";
import SearchBar from "./components/Search";
import { topicTitleEnum } from "./enum/topic-title.enum";

const adaptData = (data) => {
  const newData = {};
  if (data.engagement) {
    newData.engagement = true;
    newData.likes_count = data.engagement[0].likes_count;
    newData.retweets_count = data.engagement[0].retweets_count;
    newData.replies_count = data.engagement[0].replies_count;
  }
  if (data.tweets) {
    const modifiedTweets = [];
    const topicSet = new Set(data.tweets.map((twt) => twt._id.topic));
    topicSet.forEach((topic) => {
      const alltopicTweets = data.tweets.filter(
        (twt) => twt._id.topic === topic
      );
      let a =
        alltopicTweets.find((twt) => twt._id.sentiment === "neutral")?.count ??
        0;
      let b =
        alltopicTweets.find((twt) => twt._id.sentiment === "positive")?.count ??
        0;
      let c =
        alltopicTweets.find((twt) => twt._id.sentiment === "negative")?.count ??
        0;
      let a1, b1, c1;
      if (a + b + c) {
        a1 = Math.ceil((a * 100) / (a + b + c));
        b1 = Math.ceil((b * 100) / (a + b + c));
        c1 = Math.ceil((c * 100) / (a + b + c));
      }
      modifiedTweets.push({
        topic,
        title: topicTitleEnum[topic],
        neutralSentiment: a1,
        positiveSentiment: b1,
        negativeSentiment: c1,
      });
    });
    newData.tweets = modifiedTweets;
  }
  if (data.replies) {
    const modifiedReplies = [];
    const topicSet = new Set(data.tweets.map((twt) => twt._id.topic));
    topicSet.forEach((topic) => {
      const alltopicTweets = data.tweets.filter(
        (twt) => twt._id.topic === topic
      );
      modifiedReplies.push({
        topic,
        title: topicTitleEnum[topic],
        neutralSentiment: alltopicTweets.find(
          (twt) => twt._id.sentiment === "neutral"
        )?.count,
        positiveSentiment: alltopicTweets.find(
          (twt) => twt._id.sentiment === "positive"
        )?.count,
        negativeSentiment: alltopicTweets.find(
          (twt) => twt._id.sentiment === "negative"
        )?.count,
      });
    });
    newData.replies = modifiedReplies;
  }
  console.log(newData);
  return newData;
};

function App() {
  const adaptedData = adaptData(data);
  return (
    <div className="main">
      <Header></Header>
      <SearchBar></SearchBar>
      <Dashboard {...adaptedData}></Dashboard>
    </div>
  );
}

export default App;
