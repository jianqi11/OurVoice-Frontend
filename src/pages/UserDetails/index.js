import React, { useContext, useEffect, useState } from "react";
import { ProfileWrapper } from "./ProfileWrapper";
import UserDetails from "./UserDetails";
import { ProfileSideBar } from "./ProfileSideBar";
import NavBar from "../Index/NavBar";
import { getUserDetails } from "../../services/auth";
import { message } from "antd";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import MyContext from "../../redux/MyContext";
const UserProfilePage = () => {
  const [userData, setUserData] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const history = useHistory();
  const {
    state: {
      global: {
        userInfo: { email },
      },
    },
  } = useContext(MyContext);
  const fetchUserBasic = async (id) => {
    const res = await getUserDetails({ id });
    if (res?.data?.code === 200) {
      setUserData(res?.data?.data || {});
    } else {
      message.error(res?.data?.msg || "System busy");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      fetchUserBasic(id || undefined);
    }, 0);
    const unlisten = history.listen((location) => {
      const searchParams = new URLSearchParams(location.search);
      const id = searchParams.get("id");
      fetchUserBasic(id || undefined);
    });
    return () => {
      unlisten();
    };
  }, [history]);
  return (
    <>
      <NavBar />
      <ProfileWrapper
        childrenLeft={
          <ProfileSideBar
            userData={userData}
            setUserData={setUserData}
            id={id}
            isMine={email === userData.email}
          />
        }
        childrenRight={
          <UserDetails
            userData={userData}
            noIsMine={email !== userData.email}
          />
        }
      />
    </>
  );
};

export default UserProfilePage;
