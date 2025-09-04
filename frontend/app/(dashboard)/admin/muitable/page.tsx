"use client";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useSession } from "next-auth/react";
import { getUsers } from "@/app/api/users/userApi";
import Image from "next/image";
import { useDebounce } from "use-debounce";
import SearchIcon from "@mui/icons-material/Search";
const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1.5,
    renderCell: ({ row }) => {
      console.log({ row });

      return (
        <p className="flex items-center gap-2.5">
          <Image
            className="rounded-full"
            src={
              row.profile === null
                ? "/assets/profile-default-image.png"
                : row.profile
            }
            width={40}
            height={40}
            alt="profile"
          />
          {row.name}
        </p>
      );
    },
  },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "role", headerName: "Role", flex: 1 },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: ({ row }) => {
      return (
        <span className="bg-red-300 py-0.5 px-1.5 rounded-e-full rounded-s-full">
          {row.status}
        </span>
      );
    },
  },
  {
    field: "action",
    headerName: "Actions",
    flex: 1,
    renderCell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreVertIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-2">
          <DropdownMenuLabel>
            Edit
            <EditIcon />
          </DropdownMenuLabel>

          <DropdownMenuLabel>Settings</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

const rows = [
  { id: 1, name: "Snow", email: "Jon", role: "ADMIN", status: "PENDING" },
  {
    id: 2,
    name: "Lannister",
    email: "Cersei",
    role: "TENANT",
    status: "VERIFIED",
  },
  {
    id: 3,
    name: "Lannister",
    email: "Jaime",
    role: "AGENT",
    status: "PENDING",
  },
  { id: 4, name: "Stark", email: "Arya", role: "ADMIN", status: "PENDING" },
  {
    id: 5,
    name: "Targaryen",
    email: "Daenerys",
    role: "ADMIN",
    status: "VERIFIED",
  },
  { id: 6, name: "Melisandre", email: null, role: "AGENT", status: "PENDING" },
  {
    id: 7,
    name: "Clifford",
    email: "Ferrara",
    role: "TENANT",
    status: "PENDING",
  },
  {
    id: 8,
    name: "Frances",
    email: "Rossini",
    role: "ADMIN",
    status: "BLOCKED",
  },
  { id: 9, name: "Roxie", email: "Harvey", role: "AGENT", status: "PENDING" },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 2,
  });
  const { data } = useSession();
  const accessToken = data?.accessToken as string;
  const [inputVal, setInputVal] = useState("");
  const [search] = useDebounce(inputVal, 500);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await getUsers({
          accessToken,
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize,
          search,
        });
        if (response) {
          setRows(response.data);
          setRowCount(response.totalItems);
        }
      } catch (error) {
        console.log({ error });
      } finally {
        setLoading(false);
      }
    }
    if (accessToken) fetchData();
  }, [accessToken, paginationModel, search]);

  return (
    <div className="flex justify-center items-center w-full">
      <div className=" w-[700px]">
        <div className="mt-4 w-[10rem] relative">
          {/* <SearchIcon className="absolute top-1.5 " /> */}
          <input
            id="phone"
            type="text"
            onChange={(e) => {
              setInputVal(e.target.value);
            }}
            placeholder="Search..."
            className="border-[#8D8D8D] placeholder:ml-8 text-sm  border-b py-1.5 px-1 mx-auto block w-full placeholder:mb-8 focus:outline-none"
          />
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          paginationMode="server"
          rowCount={rowCount}
          paginationModel={paginationModel}
          onPaginationModelChange={(newModel) => {
            if (newModel.pageSize !== paginationModel.pageSize) {
              setPaginationModel({ page: 0, pageSize: newModel.pageSize });
            } else {
              setPaginationModel(newModel);
            }
          }}
          loading={loading}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 25]}
          sx={{ border: 0 }}
        />
      </div>
    </div>
  );
}
