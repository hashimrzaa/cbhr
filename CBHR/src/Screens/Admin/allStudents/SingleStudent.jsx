import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const SingleStudent = () => {
  const { id } = useParams();
  const [UserData, setUserData] = useState({});
  const [StudentData, setStudentData] = useState({});

  useEffect(() => {
    async function getStudent() {
      await axios(import.meta.env.VITE_API + "students/" + id).then(
        async (res) => {
          const data = res.data?.data;
          const name = res.data?.data?.name;
          await axios(import.meta.env.VITE_API + "users").then(async (res) => {
            const user = res.data?.data?.find((item) => item?.userName == name);
            setUserData(user);
          });
          setStudentData(data);
        }
      );
    }
    getStudent();
  }, []);
  console.log(StudentData);
  console.log(UserData);

  return <div>SingleStudent</div>;
};

export default SingleStudent;
