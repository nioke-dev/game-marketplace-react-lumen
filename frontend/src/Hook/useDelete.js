import React, { useState, useEffect } from "react";
import { link } from "../Axios/link";
import swal from "sweetalert";

const useDelete = (url) => {
  const [pesanhapus, setPesanhapus] = useState("");
  async function hapus(id) {
    if (window.confirm("yakin ingin menghapus?")) {
      const res = await link.delete(url + id);
      setPesanhapus(res.data.pesan);
      swal("Good Job!", "Data Berhasil Dihapus", "success");
      window.location.reload();
    }
  }
  return { hapus, pesanhapus, setPesanhapus };
};

export default useDelete;
