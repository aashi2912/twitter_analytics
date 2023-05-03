import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
// import data1 from "./static-data";
import Header from "./components/Header";
import SearchBar from "./components/Search";
import { topicTitleEnum } from "./enum/topic-title.enum";
import sampleDataForHosting from "./sample.js";

let adaptedData = {};
const adaptData = (data, user, hashtag) => {
  const newData = {};
  if (data.engagement && data.engagement.length) {
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
        title: topicTitleEnum[topic] ?? topic,
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
        title: topicTitleEnum[topic] ?? topic,
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
  if (user) newData.user = user;
  if (hashtag) newData.hashtag = hashtag;
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
  const [data, setData] = useState(adaptData(sampleDataForHosting, "therock"));

  const handleChange = () => {
    setData(adaptedData);
  };
  // adaptedData = adaptData(data1, "demo");

  const handleSearch = async ({ user, hashtag }) => {
    let url = "";
    if (user && hashtag) {
      url = `http://127.0.0.1:8000/user/${user}/tag/${hashtag}`;
    } else if (user) {
      url = `http://127.0.0.1:8000/user/${user}`;
    } else if (hashtag) {
      url = `http://127.0.0.1:8000/tag/${hashtag}`;
    } else {
      return;
    }
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log("soni", jsonData);
    adaptedData = adaptData(JSON.parse(jsonData), user, hashtag);
    handleChange(adaptedData);
  };

  return (
    <div className="main">
      <Header></Header>
      <SearchBar onSearch={handleSearch}></SearchBar>
      <Dashboard {...data}></Dashboard>
    </div>
  );
}

export default App;
