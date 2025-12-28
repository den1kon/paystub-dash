import { columns, Company } from "./columns";
import { DataTable } from "./data-table";

import { TableContainer } from "./table-container";

const companies: Company[] = [
  { id: 1, name: "Acme Corp", isDeleted: false },
  { id: 2, name: "Globex Inc", isDeleted: false },
]

export default async function DemoPage() {
  const data = companies;

  return (
    <TableContainer title="Companies Data Table">
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </TableContainer>
  );
}
