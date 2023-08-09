import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditList = () => {
  const [address, setAddress] = useState("");
  const [list, setList] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getListById = async () => {
      const response = await axios.get(
        `http://localhost:8000/address-list/${id}`
      );
      setAddress(response.data.address);
      setList(response.data.list);
    };
    getListById();
  }, [id]);

  const updateList = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:8000/address-list/${id}`, {
      address: address,
      list: list,
    });
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <form onSubmit={updateList} className="my-10">
        <div className="flex flex-col">
          <div className="mb-5">
            <label className="font-bold text-slate-700">IP Address</label>
            <input
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow "
              placeholder="Ip address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-700">List Name</label>
            <input
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow "
              placeholder="List Name"
              value={list}
              onChange={(e) => setList(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow "
          >
            Update List
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditList;
