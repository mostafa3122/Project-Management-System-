import {
  ChevronsUpDown,
  Eye,
  ListFilter,
  MoreVertical,
  Search,
} from "lucide-react";
import { GetUsersApi, ToggleStatusApi } from "../../../services/modules/users";
import { useEffect, useState } from "react";
import noUser from "../../../assets/user-image.jpg";
import { FiMail, FiPhone, FiUser, FiX } from "react-icons/fi";
import type {
  IUsersResponse,
  UserType,
} from "../../../interfaces/users.interface";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
export default function UserList() {
  const [usersList, setUsersList] = useState<UserType[]>([]);
  // user data modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  // confirm block
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  // filter  & search
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const filteredUsers = usersList.filter((user) => {
    const matchStatus =
      statusFilter === "active"
        ? user.isActivated === true
        : statusFilter === "inactive"
        ? user.isActivated === false
        : true;

    const matchSearch = user.userName
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    return matchStatus && matchSearch;
  });
  // get all users
  const getUsers = async () => {
    try {
      const response = await GetUsersApi({ pageSize: 100 });
      console.log(response);

      setUsersList(response.data.data);
    } catch (error) {
      const axiosError = error as AxiosError<IUsersResponse>;
      toast.error(axiosError.response?.data?.message || "something went wrong");
    }
  };
  // handle block
  const handleToggleStatus = async (id: number) => {
    try {
      await ToggleStatusApi(id);
      setUsersList((prev: any) =>
        prev.map((user: any) =>
          user.id === id ? { ...user, isActivated: !user.isActivated } : user
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="bg-white">
      <div className="header py-6 ps-10 text-[28px] ">
        <h3>Users</h3>
      </div>
      <div className="user-data py-6 px-9 bg-gray-200">
        <div className="content    rounded-lg bg-white">
          <div className="filter flex p-4 gap-2 ">
            <div className="search-input relative cursor-pointer w-48">
              <input
                type="text"
                placeholder="Search Fleets"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full rounded-3xl cursor-pointer text-gray-500 border border-[#26385A40] py-2 pl-10 pr-4 outline-none "
              />
              <Search
                size={16}
                strokeWidth={2}
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-black"
              />
            </div>
            <div className="filter-input relative w-40">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none rounded-3xl border border-[#26385A40] bg-white py-2 pl-10 pr-8 text-gray-500 outline-none cursor-pointer"
              >
                <option value="all">All Users</option>
                <option value="active">Active</option>
                <option value="inactive">Not Active</option>
              </select>

              <ListFilter
                size={16}
                strokeWidth={1}
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-black"
              />
            </div>
          </div>
          <div className="table-data ">
            <table className="table custom-table w-full   ">
              <thead className="custom-head">
                <tr>
                  <th>
                    <div className="flex items-center gap-3 text-sm font-normal">
                      <span>User Name</span>
                      <ChevronsUpDown size={16} strokeWidth={2} />
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center gap-3 text-sm font-normal">
                      <span>Image</span>
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center gap-1">
                      <span>Status</span>
                      <ChevronsUpDown size={16} strokeWidth={2} />
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center gap-1">
                      <span>Phone Number</span>
                      <ChevronsUpDown size={16} strokeWidth={2} />
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center gap-1">
                      <span>Email</span>
                      <ChevronsUpDown size={16} strokeWidth={2} />
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center gap-1">
                      <span> Date Created</span>
                      <ChevronsUpDown size={16} strokeWidth={2} />
                    </div>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="odd:bg-white   even:bg-gray-100">
                    <td className="py-4 px-4">{user.userName}</td>
                    <td className="py-4 px-4">
                      {user?.imagePath ? (
                        <img
                          src={`https://upskilling-egypt.com:3003/${user?.imagePath}`}
                          alt={user?.userName}
                          className=" w-14 h-14 rounded-2xl object-cover  "
                        />
                      ) : (
                        <img
                          className=" object-fit-cover w-14 h-14 rounded-2xl object-cover"
                          src={noUser}
                          alt={user?.userName}
                        />
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {user.isActivated ? (
                        <span className="bg-[#009247] text-white text-[12px] rounded-3xl py-1.5 px-3.5 active-label">
                          Active
                        </span>
                      ) : (
                        <span className=" bg-[#922E25B2] text-white text-[12px] rounded-3xl py-1.5 px-3.5 deactive-label">
                          Not Active
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">{user.phoneNumber}</td>
                    <td className="py-4 px-4">{user.email}</td>
                    <td className="py-4 px-4">
                      {new Date(user.creationDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="py-4 px-4">
                      <div className="relative inline-block group">
                        <button className="rounded-full cursor-pointer p-2 hover:bg-gray-100">
                          <MoreVertical size={20} />
                        </button>

                        {/* dropdown */}
                        <div className="invisible absolute z-10 right-0 top-10 w-32 rounded-lg overflow-hidden bg-white shadow-md opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100">
                          <button
                            onClick={() => {
                              setSelectedUserId(user.id);
                              setConfirmOpen(true);
                            }}
                            className=" cursor-pointer block w-full px-4 text-red-500 py-2 text-left hover:bg-gray-100"
                          >
                            {user.isActivated ? "Block" : "Unblock"}
                          </button>

                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setOpenModal(true);
                            }}
                            className=" cursor-pointer  flex items-center gap-2 text-green-400 w-full px-4 py-2 text-left hover:bg-gray-100"
                          >
                            <Eye size={20} /> view
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {openModal && selectedUser && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                onClick={() => setOpenModal(false)}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative mx-4 w-full max-w-md overflow-hidden rounded-4xl bg-[#0E382F] shadow-2xl"
                >
                  {/* close button */}
                  <button
                    onClick={() => setOpenModal(false)}
                    className="absolute top-4 right-4 z-10 rounded-full bg-black/20 p-2 text-white transition hover:bg-black/40"
                  >
                    <FiX className="w-5 h-5" />
                  </button>

                  {/* top background */}
                  <div
                    className="h-24 w-full"
                    style={{
                      background:
                        "repeating-linear-gradient(-45deg, rgba(239,155,40,.9), rgba(239,155,40,.9) 10px, rgba(210,131,24,.9) 10px, rgba(210,131,24,.9) 20px)",
                    }}
                  ></div>

                  <div className="flex flex-col items-center px-8 pb-8 pt-0">
                    {/* image */}
                    <div className="relative -mt-14 mb-4">
                      <div className="h-28 w-28 overflow-hidden rounded-full border-[6px] border-[#0E382F] bg-[#EF9B28] shadow-xl">
                        <img
                          src={
                            selectedUser.imagePath
                              ? `https://upskilling-egypt.com:3003/${selectedUser.imagePath}`
                              : noUser
                          }
                          alt={selectedUser.userName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    {/* username */}
                    <h2 className="mb-2 text-2xl font-bold text-white">
                      {selectedUser.userName}
                    </h2>

                    {/* status */}
                    <div className="mb-6 rounded-full border border-[#EF9B28] bg-[#154A3E] px-6 py-1">
                      <span className="text-sm font-medium text-[#EF9B28]">
                        {selectedUser.isActivated
                          ? "Active User"
                          : "Not Active"}
                      </span>
                    </div>

                    {/* info */}
                    <div className="w-full space-y-3">
                      <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#0B2C25] p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0E382F] text-[#EF9B28]">
                          <FiUser className="h-5 w-5" />
                        </div>

                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-gray-400">
                            Username
                          </span>

                          <span className="text-sm font-medium text-white">
                            {selectedUser.userName}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#0B2C25] p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0E382F] text-[#EF9B28]">
                          <FiMail className="h-5 w-5" />
                        </div>

                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-gray-400">
                            Email
                          </span>

                          <span className="text-sm font-medium text-white">
                            {selectedUser.email}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#0B2C25] p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0E382F] text-[#EF9B28]">
                          <FiPhone className="h-5 w-5" />
                        </div>

                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-gray-400">
                            Phone
                          </span>

                          <span className="text-sm font-medium text-white">
                            {selectedUser.phoneNumber}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* button */}
                    <div className="flex w-full gap-5">
                      <button
                        onClick={() => setOpenModal(false)}
                        className="mt-6 w-1/2 rounded-xl border border-[#C85D5D] bg-transparent py-3 text-sm font-semibold text-[#C85D5D] transition-all hover:bg-[#C85D5D] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#C85D5D] focus:ring-offset-2 focus:ring-offset-[#0E382F]"
                      >
                        Block
                      </button>
                      <button
                        onClick={() => setOpenModal(false)}
                        className="mt-6 w-1/2 rounded-xl border border-[#EF9B28] bg-transparent py-3 text-sm font-semibold text-[#EF9B28] transition-all hover:bg-[#EF9B28] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#EF9B28] focus:ring-offset-2 focus:ring-offset-[#0E382F]"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {confirmOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                <div className="w-90 rounded-2xl bg-white p-6 shadow-lg">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Are you sure?
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    This action will change user status.
                  </p>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      onClick={() => setConfirmOpen(false)}
                      className="rounded-lg bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={async () => {
                        if (selectedUserId !== null) {
                          await handleToggleStatus(selectedUserId);
                        }
                        setConfirmOpen(false);
                      }}
                      className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
