import { link } from "../Axios/link";
import React, { useState, useEffect } from "react";

const useGet = (url) => {
  const [isi, setIsi] = useState([]);

  useEffect(() => {
    let ambil = true;
    async function fetchData() {
      const res = await link.get(url);
      if (ambil) {
        setIsi(res.data);
      }
    }

    fetchData();

    return () => {
      ambil = false;
    };
  }, []);

  return [isi];
};

export default useGet;
