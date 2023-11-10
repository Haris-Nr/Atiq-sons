import React from 'react'

const tasks = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description for Task 1',
      lastDate: '2023-11-01',
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description for Task 2',
      lastDate: '2023-11-05',
    },
    {
        id: 3,
        title: 'Task 3',
        description: 'Prepare presentation',
        lastDate: '2023-11-20',
      },
  ];

const Task = () => {
  return (
    <div className="w-full overflow-x-auto">
    <table className="w-full whitespace-nowrap">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2">Title</th>
          <th className="px-4 py-2">Description</th>
          <th className="px-4 py-2">Last Date to Submit</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td className="border px-4 py-2">{task.title}</td>
            <td className="border px-4 py-2">{task.description}</td>
            <td className="border px-4 py-2">{task.lastDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default Task