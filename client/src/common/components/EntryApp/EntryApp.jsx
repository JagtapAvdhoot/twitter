import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Sidebar from '../Sidebar/Sidebar';
import Home from '../../../pages/Home/Home';
import Search from '../../../pages/Search/Search';
import Explore from '../../../pages/Explore/Explore';
import List from '../../../pages/List/List';
import Communities from '../../../pages/Communities/Communities';
import Notification from '../../../pages/Notification/Notification';
import User from '../../../pages/User/User';
import Tweet from '../../../pages/Tweet/Tweet';
import Bookmark from '../../../pages/Bookmark/Bookmark';
import Message from '../../../pages/Message/Message';
import NotFound from '../../../pages/NotFound/NotFound';
import { Flex } from '@chakra-ui/react';

const EntryApp = () => {
  return (
    <Flex>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/list" element={<List />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/message" element={<Message />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/profile/:username" element={<User />} />
        <Route path="/tweet/:tweetId" element={<Tweet />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Flex>
  )
}

export default EntryApp