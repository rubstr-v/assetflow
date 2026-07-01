import { type ColumnDef } from "@tanstack/react-table"

type User = {
  id: number
  email: string
  firstname?: string
  lastname?: string
  roles: string[]
  dateCreated?: string
  company?: {
    name?: string
  }
}

function formatRole(role: string) {
  switch (role) {
    case "ROLE_ADMIN":
      return "Admin"
    case "ROLE_USER":
      return "User"
    case "ROLE_MEMBER":
      return "Member"
    default:
      return role
  }
}

export const usersColumns: ColumnDef<User>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Name",
    cell: ({ row }) =>
      `${row.original.firstname ?? ""} ${row.original.lastname ?? ""}`,
  },
  {
    header: "Company",
    cell: ({ row }) => row.original.company?.name ?? "—",
  },
  {
    header: "Created",
    accessorFn: (row) =>
      row.dateCreated ? new Date(row.dateCreated).getTime() : 0,
    cell: ({ row }) =>
      row.original.dateCreated
        ? new Date(row.original.dateCreated).toLocaleDateString()
        : "—",
  },
  {
    header: "Roles",
    cell: ({ row }) => (
      <div className="flex gap-1 flex-wrap">
        {row.original.roles.map(r => (
          <span
            key={r}
            className="px-2 py-1 text-xs rounded bg-slate-100"
          >
            {formatRole(r)}
          </span>
        ))}
      </div>
    ),
  },
]