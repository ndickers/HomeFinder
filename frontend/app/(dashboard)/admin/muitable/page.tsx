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
  import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
  import { changeUserStatus, getUsers } from "@/app/api/users/userApi";
  import Image from "next/image";
  import { useDebounce } from "use-debounce";
  import SearchIcon from "@mui/icons-material/Search";
  import TextField from "@mui/material/TextField";
  import Button from "@mui/material/Button";
  import Swal from "sweetalert2";
  import withReactContent from "sweetalert2-react-content";
  const MySwal = withReactContent(Swal);

  import {
    Block,
    Check,
    InfoOutlined,
    Payments,
    Warning,
  } from "@mui/icons-material";
  import {
    alpha,
    Menu,
    MenuItem,
    MenuProps,
    styled,
    Theme,
  } from "@mui/material";
  import { toast } from "react-toastify";

  const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      {...props}
    />
  ))(({ theme }: { theme: Theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": { padding: "4px 0" },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));

  interface TSelectedRow {
    name: string;
    id: string;
    status: string;
    profile: string | null;
    role: string;
    email: string;
  }
  export default function DataTable() {
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
      page: 0,
      pageSize: 5,
    });
    const [selectedUser, setSelectedUser] = useState<null | TSelectedRow>(null);
    const { data } = useSession();
    const [status, setStatus] = useState("");
    const [role, setRole] = useState("");
    const accessToken = data?.accessToken as string;
    const [inputVal, setInputVal] = useState("");
    const [search] = useDebounce(inputVal, 500);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement>,
      row: TSelectedRow
    ) => {
      setSelectedUser(row);
      console.log({ row });

      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleConfirmVerify = async () => {
      return MySwal.fire({
        title: selectedUser?.name,
        text: "Are you sure you want to verify this user? This will mark their account as trusted.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Verify",
        customClass: {
          confirmButton:
            "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded",
          cancelButton:
            "btn border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-2 px-4 rounded ms-1",
        },
        buttonsStyling: false,
      }).then(async function (result) {
        if (result.value) {
          changeUserStatus({
            accessToken,
            id: `${selectedUser?.id}`,
            status: { status: "VERIFIED" },
          });
          const response = await getUsers({
            accessToken,
            page: paginationModel.page + 1,
            limit: paginationModel.pageSize,
            search,
            role,
            status,
          });
          if (response) {
            toast.success("Verified successful");
            setRows(response.data);
          }
        }
      });
    };

    const handleConfirmUnblock = async () => {
      return MySwal.fire({
        title: selectedUser?.name,
        text: "Are you sure you want to unblock this user? They’ll regain access to their account immediately.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Verify",
        customClass: {
          confirmButton:
            "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded",
          cancelButton:
            "btn border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-2 px-4 rounded ms-1",
        },
        buttonsStyling: false,
      }).then(async function (result) {
        if (result.value) {
          changeUserStatus({
            accessToken,
            id: `${selectedUser?.id}`,
            status: { status: "VERIFIED" },
          });
          const response = await getUsers({
            accessToken,
            page: paginationModel.page + 1,
            limit: paginationModel.pageSize,
            search,
            role,
            status,
          });
          if (response) {
            toast.success("Unblock successful");
            setRows(response.data);
          }
        }
      });
    };

    const handleConfirmBlock = async () => {
      return MySwal.fire({
        title: selectedUser?.name,
        text: "Are you sure you want to ban this user? This action will permanently restrict their account access.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Block",
        customClass: {
          confirmButton:
            "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
          cancelButton:
            "btn border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-2 px-4 rounded ms-1",
        },
        buttonsStyling: false,
      }).then(async function (result) {
        if (result.value) {
          changeUserStatus({
            accessToken,
            id: `${selectedUser?.id}`,
            status: { status: "BLOCKED" },
          });
          const response = await getUsers({
            accessToken,
            page: paginationModel.page + 1,
            limit: paginationModel.pageSize,
            search,
            role,
            status,
          });
          if (response) {
            toast.success("Blocked successful");
            setRows(response.data);
          }
        }
      });
    };
    useEffect(() => {
      async function fetchData() {
        setLoading(true);
        try {
          const response = await getUsers({
            accessToken,
            page: paginationModel.page + 1,
            limit: paginationModel.pageSize,
            search,
            role,
            status,
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
    }, [accessToken, paginationModel, search, role, status]);

    const usersColumns: GridColDef<TSelectedRow>[] = [
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        renderCell: ({ row }) => {
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
      {
        field: "role",
        headerName: "Role",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        renderCell: ({ row }) => {
          const styleColor =
            row.status === "VERIFIED"
              ? "bg-green-200 text-green-800"
              : row.status === "PENDING"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-red-200 text-red-800";

          return (
            <span
              className={`${styleColor} py-0.5 px-2 rounded-e-full rounded-s-full`}
            >
              {row.status}
            </span>
          );
        },
      },
      {
        field: "action",
        headerName: "Actions",
        flex: 1,
        renderCell: ({ row }) => (
          <div className="px-2">
            <Button
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="outlined"
              className="border px-2 py-0.5 rounded-md"
              style={{ borderColor: "black", color: "black" }}
              onClick={(e) => handleClick(e, row)}
            >
              Actions <KeyboardArrowDownIcon />
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              anchorEl={anchorEl}
              MenuListProps={{ "aria-labelledby": "demo-customized-button" }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  //    router.push(`/accounts/view/${targetId}`);
                }}
              >
                <InfoOutlined /> View
              </MenuItem>

              {selectedUser?.status === "VERIFIED" && (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleConfirmBlock();
                  }}
                >
                  <Block /> Block
                </MenuItem>
              )}
              {selectedUser?.status === "BLOCKED" && (
                <MenuItem
                  onClick={() => {
                    handleConfirmUnblock();
                    handleClose();
                  }}
                >
                  <InfoOutlined /> Unblock
                </MenuItem>
              )}
              {selectedUser?.status === "PENDING" && (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleConfirmVerify();
                  }}
                >
                  <Check /> Verify
                </MenuItem>
              )}
            </StyledMenu>
          </div>
        ),
      },
    ];

    return (
      <div className="flex justify-center items-center w-full">
        <div className=" w-[1000px]">
          <div className="flex items-center justify-between">
            <div className="mt-4 w-[10rem]  relative">
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
            <div className="flex gap-3 items-center">
              <TextField
                className="w-[8rem]"
                select
                value={role}
                label="Role"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <MenuItem value="ADMIN,AGENT,TENANT">Default</MenuItem>
                <MenuItem value="ADMIN">ADMIN</MenuItem>
                <MenuItem value="AGENT">AGENT</MenuItem>
                <MenuItem value="TENANT">TENANT</MenuItem>
              </TextField>
              <TextField
                className="w-[8rem]"
                select
                value={status}
                label="Status"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <MenuItem value="VERIFIED,PENDING,BLOCKED">Default</MenuItem>
                <MenuItem value="PENDING">PENDING</MenuItem>
                <MenuItem value="VERIFIED">VERIFIED</MenuItem>
                <MenuItem value="BLOCKED">BLOCKED</MenuItem>
              </TextField>
            </div>
          </div>
          <DataGrid
            rows={rows}
            columns={usersColumns}
            paginationMode="server"
            rowCount={rowCount}
            paginationModel={paginationModel}
            disableColumnMenu
            disableRowSelectionOnClick
            disableColumnSorting
            checkboxSelection={false}
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
