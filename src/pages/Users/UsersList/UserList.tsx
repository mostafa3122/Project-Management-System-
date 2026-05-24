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
import NoData from "../../../shared/NoData/NoData";
import Loading from "../../../shared/Loading/Loading";
import Pagination from "../../../shared/Pagination/Pagination";
import SubHeader from "../../../shared/SubHeader/SubHeader";
import ConfirmationModal from "../../Projects/DeleteConfirmationModal/DeleteConfirmation";
export default function UserList() {
  const [usersList, setUsersList] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggleLoading, setToggleLoading] = useState(false);
  // user data modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  // confirm block
  const [confirmOpen, setConfirmOpen] = useState(false);
  // const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUser2, setSelectedUser2] = useState<UserType | null>(null);
  // filter  & search
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const filteredUsers = usersList.filter((user: UserType) => {
    const matchStatus =
      statusFilter === "active"
        ? user.isActivated === true
        : statusFilter === "inactive"
          ? user.isActivated === false
          : true;
    return matchStatus;
  });


  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);


  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await GetUsersApi({
        pageNumber: pageNumber,
        pageSize: pageSize,
        userName: debouncedSearch || undefined,
      });
      setUsersList(response.data.data);
      setTotalRecords(response.data.totalNumberOfRecords || 0);
    } catch (error) {
      const axiosError = error as AxiosError<IUsersResponse>;
      toast.error(axiosError.response?.data?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };
  // handle block
  const handleToggleStatus = async (id: number) => {
    try {
      setToggleLoading(true);
      await ToggleStatusApi(id);

      const user = usersList.find((u: any) => u.id === id);
      const isCurrentlyActivated = user?.isActivated;

      setUsersList((prev: any) =>
        prev.map((user: any) =>
          user.id === id ? { ...user, isActivated: !user.isActivated } : user
        )
      );

      toast.success(
        `User ${isCurrentlyActivated ? "blocked" : "unblocked"} successfully!`
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    } finally {
      setToggleLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, [pageNumber, pageSize, debouncedSearch]);
  return (
    <div className="bg-white">
      {/* Header */}
      <SubHeader title="Users" />

      <div className="py-6 px-9 bg-gray-200">
        <div className=" bg-white rounded-lg shadow-[0px_4px_20px_0px_#0000000D] p-4">
          <div className="filter flex gap-2 mb-4">
            <div className="search-input relative cursor-pointer w-48">
              <input
                type="text"
                placeholder="Search Users"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setPageNumber(1);
                }}
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
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <div className="overflow-auto max-h-[400px] w-full">
              <table className="table custom-table w-full min-w-[800px]">
                <thead className="custom-head">
                  <tr>
                    <th className="px-6 py-2 font-normal">
                      <div className="flex items-center gap-3">
                        <span>User Name</span>
                        <ChevronsUpDown size={16} strokeWidth={2} />
                      </div>
                    </th>
                    <th className="px-6 py-2 font-normal">
                      <div className="flex items-center gap-3">
                        <span>Image</span>
                      </div>
                    </th>
                    <th className="px-6 py-2 font-normal">
                      <div className="flex items-center gap-2">
                        <span>Status</span>
                        <ChevronsUpDown size={16} strokeWidth={2} />
                      </div>
                    </th>
                    <th className="px-6 py-2 font-normal">
                      <div className="flex items-center gap-2">
                        <span>Phone Number</span>
                        <ChevronsUpDown size={16} strokeWidth={2} />
                      </div>
                    </th>
                    <th className="px-6 py-2 font-normal">
                      <div className="flex items-center gap-2">
                        <span>Email</span>
                        <ChevronsUpDown size={16} strokeWidth={2} />
                      </div>
                    </th>
                    <th className="px-6 py-2 font-normal">
                      <div className="flex items-center gap-2">
                        <span> Date Created</span>
                        <ChevronsUpDown size={16} strokeWidth={2} />
                      </div>
                    </th>
                    <th className="px-6 py-2 font-normal text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-[#4F4F4F] font-normal">
                  {loading ? (
                    <tr>
                      <td colSpan={7}>
                        <Loading />
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7}>
                        <NoData />
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="odd:bg-white even:bg-[#F8F9FA] hover:bg-gray-100/70 transition-colors"
                      >
                        <td className="p-4">{user.userName}</td>
                        <td className="p-4">
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
                        <td className="p-4">
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
                        <td className="p-4">{user.phoneNumber}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">
                          {new Date(user.creationDate).toLocaleDateString("en-GB")}
                        </td>
                        <td className="p-4">
                          <div className="relative inline-block group">
                            <button className="rounded-full cursor-pointer p-2 hover:bg-gray-100">
                              <MoreVertical size={20} />
                            </button>

                            {/* dropdown */}
                            <div className="invisible absolute z-10 right-0 top-10 w-32 rounded-lg overflow-hidden bg-white shadow-md opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100">
                              <button
                                onClick={() => {
                                  setSelectedUser2(user);
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card Grid View */}
          <div className="block md:hidden space-y-4">
            {loading ? (
              <div className="py-6">
                <Loading />
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="py-6">
                <NoData />
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-4 shadow-sm transition-all hover:shadow-md"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-700 mb-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
                        <img
                          src={
                            user?.imagePath
                              ? `https://upskilling-egypt.com:3003/${user?.imagePath}`
                              : noUser
                          }
                          alt={user?.userName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
                          {user.userName}
                        </h3>
                        <div className="mt-0.5">
                          {user.isActivated ? (
                            <span className="bg-[#009247] text-white text-[10px] rounded-full py-0.5 px-2 font-medium">
                              Active
                            </span>
                          ) : (
                            <span className="bg-[#922E25B2] text-white text-[10px] rounded-full py-0.5 px-2 font-medium">
                              Not Active
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenModal(true);
                        }}
                        className="text-[#0E382F] dark:text-[#EF9B28] hover:bg-[#0E382F]/10 dark:hover:bg-[#EF9B28]/10 p-2 rounded-full transition-colors cursor-pointer"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser2(user);
                          setConfirmOpen(true);
                        }}
                        className={`text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${user.isActivated
                          ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400"
                          : "bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-950/20 dark:text-green-400"
                          }`}
                      >
                        {user.isActivated ? "Block" : "Unblock"}
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="space-y-2 text-sm text-[#4F4F4F] dark:text-gray-300">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Email</span>
                      <span className="mt-0.5 font-medium text-gray-800 dark:text-white break-all">{user.email}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Phone</span>
                        <span className="mt-0.5 font-medium text-gray-800 dark:text-white">{user.phoneNumber || "N/A"}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Created</span>
                        <span className="mt-0.5 font-medium text-xs text-gray-800 dark:text-white">
                          {new Date(user.creationDate).toLocaleDateString("en-GB")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <Pagination
            pageNumber={pageNumber}
            pageSize={pageSize}
            totalRecords={totalRecords}
            onPageChange={setPageNumber}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>
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
                  {selectedUser.isActivated ? "Active User" : "Not Active"}
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
      <ConfirmationModal
        variant="block"
        isOpen={confirmOpen}
        loading={toggleLoading}
        title={selectedUser2?.isActivated ? "Block User" : "Unblock User"}
        message={`Are you sure you want to ${selectedUser2?.isActivated ? "block" : "unblock"
          } "${selectedUser2?.userName}"?`}
        confirmLabel={selectedUser2?.isActivated ? "Block" : "Unblock"}
        onClose={() => setConfirmOpen(false)}
        onConfirm={async () => {
          if (selectedUser2 !== null) {
            await handleToggleStatus(selectedUser2.id);
          }
          setConfirmOpen(false);
        }}
      />
    </div>
  );
}
