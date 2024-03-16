import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const SingleCourse = () => {
  const { id } = useParams();
  const [data, setdata] = useState({});
  const [students, setstudents] = useState([]);
  useEffect(() => {
    const getSingleCourse = async () => {
      await axios(import.meta.env.VITE_API + "courses/" + id).then(
        async (resc) => {
          await axios(import.meta.env.VITE_API + "students").then(
            async (res) => {
              const students = res.data?.data?.filter(
                (item, index) => item.courseName == resc.data?.data?.courseName
              );
              setstudents(students);
            }
          );
          setdata(resc.data?.data);
        }
      );
    };

    getSingleCourse();
  }, []);

  return <div>SingleCourse</div>;
};

export default SingleCourse;
