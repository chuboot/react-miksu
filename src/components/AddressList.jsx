import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";

const AddressList = () => {
  const { mutate } = useSWRConfig();
  const fetcher = async () => {
    const response = await axios.get("http://localhost:8000/address-list");
    return response.data;
  };

  const { data } = useSWR("address-list", fetcher);
  if (!data) return <h2>Loading....</h2>;

  const deleteList = async (addressId) => {
    await axios.delete(`http://localhost:8000/address-list/${addressId}`);
    mutate("address-list");
  };

  return (
    <div className="flex flex-col mt-5">
      <div className="w-full">
        <Link
          to="/add"
          className="bg-green-500 hover:bg-green-700 border-slate-200 text-white font-bold py-2 px-4 rounded-lg"
        >
          Add IP
        </Link>
        <div className="relative shadow rounded-lg mt-3">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-3 px-1 text-center">id</th>
                <th className="py-3 px-6 ">address</th>
                <th className="py-3 px-6 ">create time</th>
                <th className="py-3 px-1 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((address) => (
                <tr className="bg-white border-b" key={address.id}>
                  <td className="py-3 px-1 text-center">{address[".id"]}</td>
                  <td className="py-3 px-6">{address.address}</td>
                  <td className="py-3 px-6">{address.list}</td>
                  <td className="py-3 px-1 text-center">
                    <Link
                      to={`/edit/${address[".id"]}`}
                      className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white mr-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteList(address[".id"])}
                      className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white mr-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddressList;
