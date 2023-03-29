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
      const { a1, b1, c1, a, b, c } = getCountPercentage(alltopicTweets);
      modifiedTweets.push({
        topic,
        title: topicTitleEnum[topic],
        neutralSentiment: a1,
        positiveSentiment: b1,
        negativeSentiment: c1,
        value: a + b + c,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      });
    });
    newData.tweets = modifiedTweets;
    newData.tweets.sort(function (a, b) {
      return a.value > b.value ? -1 : 1;
    });
    newData.tweets = newData.tweets.slice(0, 10);
  }
  if (data.replies) {
    const modifiedReplies = [];
    const topicSet = new Set(data.replies.map((twt) => twt._id.topic));
    topicSet.forEach((topic) => {
      const alltopicTweets = data.replies.filter(
        (twt) => twt._id.topic === topic
      );
      const { a1, b1, c1, a, b, c } = getCountPercentage(alltopicTweets);
      modifiedReplies.push({
        topic,
        title: topicTitleEnum[topic],
        neutralSentiment: a1,
        positiveSentiment: b1,
        negativeSentiment: c1,
        value: a + b + c,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      });
    });
    newData.replies = modifiedReplies;
    newData.replies.sort(function (a, b) {
      return a.value > b.value ? -1 : 1;
    });
    newData.replies = newData.replies.slice(0, 10);
  }
  console.log(newData);
  return newData;
};

const getCountPercentage = (alltopicTweets) => {
  let a =
    alltopicTweets.find((twt) => twt._id.sentiment === "neutral")?.count ?? 0;
  let b =
    alltopicTweets.find((twt) => twt._id.sentiment === "positive")?.count ?? 0;
  let c =
    alltopicTweets.find((twt) => twt._id.sentiment === "negative")?.count ?? 0;
  let a1, b1, c1;
  if (a + b + c) {
    a1 = Math.floor((a * 100) / (a + b + c));
    b1 = Math.floor((b * 100) / (a + b + c));
    c1 = Math.floor((c * 100) / (a + b + c));
  }
  return { a1, b1, c1, a, b, c };
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
