'use client'
import React, { useEffect, useState } from 'react'
import { Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow } from '@/components/ui/table'
import studentData from '@/data/students_data.json'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'

const page = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(studentData.students);
    },[])

    const columns = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "roll_number", header: "Roll No." },
        { accessorKey: "class", header: "Class" },
        { accessorKey: "section", header: "Section" },
        { accessorKey: "attendance", header: "Attendance (%)" },
        { 
            accessorKey: "marks", 
            header: "Marks (Maths/Science/English)",
            cell: ({ row }) => `${row.original.marks.maths} / ${row.original.marks.science} / ${row.original.marks.english}`
        }
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
              pageSize: 5, // 👈 Set 5 rows per page
            },
        },
    });

    const attendanceData = data.map((student) => ({ name: student.name, attendance: student.attendance }));
    const marksData = data.map((student) => ({ name: student.name, maths: student.marks.maths, science: student.marks.science, english: student.marks.english }));

    return (
        <div className="p-4">
            <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-200">
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id} className="p-2 border">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                    ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="border">
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="p-2 border">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="mt-4 flex justify-center items-center space-x-2">
                <button 
                    className="px-4 py-2 border rounded cursor-pointer hover:bg-gray-200 transition-all duration-200" 
                    onClick={() => table.previousPage()} 
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </button>
                <span>
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <button 
                    className="px-4 py-2 border rounded cursor-pointer hover:bg-gray-200 transition-all" 
                    onClick={() => table.nextPage()} 
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </button>
            </div>

            <div className='w-full flex flex-col gap-3 px-10 bg-gray-400'>
                <h1>Search student by ID and name</h1>
                
            </div>

            {/* charts */}
            <div className="flex flex-wrap mt-6">
                <div className="w-1/2 p-2">
                    <h2 className="text-lg font-bold mb-2">Attendance Chart</h2>
                    <BarChart width={400} height={300} data={attendanceData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="attendance" fill="#8884d8" />
                    </BarChart>
                </div>

            {/* Marks Distribution Pie Chart */}
            <div className="w-1/2 p-2">
                <h2 className="text-lg font-bold mb-2">Marks Distribution</h2>
                <PieChart width={400} height={300}>
                    <Pie data={marksData} dataKey="maths" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" />
                    <Pie data={marksData} dataKey="science" nameKey="name" cx="50%" cy="50%" innerRadius={90} outerRadius={110} fill="#8884d8" />
                    <Pie data={marksData} dataKey="english" nameKey="name" cx="50%" cy="50%" innerRadius={120} outerRadius={140} fill="#ffc658" />
                    <Tooltip />
                </PieChart>
            </div>
            </div>
        </div>
        );
}

export default page