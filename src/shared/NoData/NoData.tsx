import React from 'react'
import noDataImg from "../../assets/nodata.jpg";


export default function NoData() {
  return (
    <div className=" flex flex-col items-center justify-center gap-3 py-16 text-center">
      <img src={noDataImg} alt="no data" className="w-48 h-48 object-contain" />
      <p className="text-lg font-medium text-gray-700">No Data Found</p>
      <p className="text-sm text-gray-400">
        Try adjusting your search or filter to find what you're looking for
      </p>
    </div>
  );
}
