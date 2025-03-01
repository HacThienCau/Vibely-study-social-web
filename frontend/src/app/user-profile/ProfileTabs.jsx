"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
// import ProfileDetails from './ProfileDetails'

const ProfileTabs = ({
  id,
  profileData,
  isOwner,
  setProfileData,
  fetchProfile,
}) => {
  const [activeTab, setActiveTab] = useState("posts");
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 border-t border-gray-200 dark:border-gray-700 pt-1">
      <Tabs
        defaultValue="posts"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-1/2 grid-cols-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
