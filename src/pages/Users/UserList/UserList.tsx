import { ListFilter, Search } from "lucide-react";

export default function UserList() {
  return (
    <div className="bg-white">
      <div className="header py-6 ps-10 text-[28px] ">
        <h3>Users</h3>
      </div>
      <div className="user-data py-6 px-9 bg-gray-200">
        <div className="content  bg-amber-300 rounded-3xl">
          <div className="filter flex p-4 gap-2 ">
            <div className="search-input relative cursor-pointer w-48">
              <input
                type="text"
                placeholder="Search Fleets"
                className="w-full rounded-3xl cursor-pointer text-gray-500 border border-[#26385A40] py-2 pl-10 pr-4 outline-none "
              />
              {/* <Search size={16} strokeWidth={1} /> */}
              <Search
                size={16}
                strokeWidth={2}
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-black"
              />
            </div>
            <div className="filter-input relative cursor-pointer w-24">
              <div className="w-full rounded-3xl text-gray-500 border border-[#26385A40] py-2 pl-10 pr-4 outline-none">
                Filter
              </div>
              <ListFilter
                size={16}
                strokeWidth={1}
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-black"
              />
            </div>
          </div>
          <div className="table-data bg-emerald-400">
            <h2>table</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
