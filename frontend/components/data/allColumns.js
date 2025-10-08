import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
export const usersColumns = [
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
    renderCell: () => (
      <div className="px-2">
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="outlined"
          className="border px-2 py-0.5 rounded-md"
          style={{ borderColor: "black", color: "black" }}
          onClick={(event) => {
            handleClick(event, row?._id, row);
          }}
        >
          Actions <KeyboardArrowDownIcon />
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{ "aria-labelledby": "demo-customized-button" }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              router.push(`/accounts/view/${targetId}`);
            }}
          >
            <InfoOutlined /> View
          </MenuItem>

          <MenuItem onClick={() => setShowModal(true)}>
            <Payments /> Top Up
          </MenuItem>
        </StyledMenu>
      </div>
    ),
  },
];
