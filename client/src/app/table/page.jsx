import { DataTable as DataTable2 } from "@/components/data-table2"
import { DataTable } from "@/components/data-table3"
import data1 from "@/app/dashboard/data.json"

async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f1",
      amount: 100,
      status: "pending",
      email: "a@example.com",
    },
    {
      id: "728ed522",
      amount: 100,
      status: "pending",
      email: "e@example.com",
    },
    {
      id: "728ed523",
      amount: 100,
      status: "pending",
      email: "mz@example.com",
    },
    {
      id: "728ed524",
      amount: 100,
      status: "pending",
      email: "v@example.com",
    },
    {
      id: "728ed525",
      amount: 100,
      status: "pending",
      email: "ni@example.com",
    },
    {
      id: "728ed526",
      amount: 100,
      status: "pending",
      email: "shf@example.com",
    },
    {
      id: "728ed527",
      amount: 100,
      status: "pending",
      email: "xfgs@example.com",
    },
    {
      id: "728ed528",
      amount: 100,
      status: "pending",
      email: "bsd@example.com",
    },
    {
      id: "728ed529",
      amount: 100,
      status: "pending",
      email: "nea@example.com",
    },
    {
      id: "728ed52f10",
      amount: 100,
      status: "pending",
      email: "asdg@example.com",
    },
    {
      id: "728ed5212",
      amount: 100,
      status: "pending",
      email: "asdfawe@example.com",
    },
    {
      id: "728ed5255",
      amount: 100,
      status: "pending",
      email: "jd@example.com",
    },
    {
      id: "728ed52232",
      amount: 100,
      status: "pending",
      email: "ehd@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "pop@example.com",
    },
    {
      id: "728ed520",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

const columns = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]


export default async function DemoPage() {
  const data = await getData()

  return (
    <>
    <div className="container mx-auto py-10">
      <DataTable2 columns={columns} data={data} />
    </div>
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data1} />
    </div>
    </>
  )
}