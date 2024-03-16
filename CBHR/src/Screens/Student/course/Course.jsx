import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Course = () => {
  const [StudentData, setStudentData] = useState([]);
  const [CourseData, setCourseData] = useState({});
  const Uid = localStorage.getItem("userId");
  useEffect(() => {
    async function getData() {
      await axios(import.meta.env.VITE_API + "users/" + Uid)
        .then(async (res) => {
          const name = res.data?.data?.userName;
          await axios(import.meta.env.VITE_API + "students").then(
            async (res) => {
              const find = res.data?.data?.find((item) => item.name == name);
              const courseName = find.courseName;
              axios(import.meta.env.VITE_API + "courses").then(async (resc) => {
                const find = resc.data?.data?.find(
                  (item) => item.courseName == courseName
                );
                await axios(import.meta.env.VITE_API + "students").then(
                  (res) => {
                    const find = res.data?.data?.filter(
                      (item) => item.courseName == courseName
                    );
                    setStudentData(find);
                  }
                );
                setCourseData(find);
              });
            }
          );
        })
        .catch((e) => {
          console.log(e);
        });
    }
    getData();
  }, []);
  console.log(StudentData);
  console.log(CourseData);
  return <div>Course</div>;
};

export default Course;
