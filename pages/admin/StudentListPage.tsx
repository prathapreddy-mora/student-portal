import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Student } from '../../types';

const SortIcon: React.FC<{ direction: 'asc' | 'desc' | 'none' }> = ({ direction }) => {
    if (direction === 'none') return <span className="text-gray-400 text-xs">↕️</span>;
    return direction === 'asc' ? <span className="text-brand-primary">🔼</span> : <span className="text-brand-primary">🔽</span>;
};

const StudentListPage: React.FC = () => {
  const { students, rooms, assignRoom } = useAppContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ college: 'all', branch: 'all', year: 'all' });
  const [sortConfig, setSortConfig] = useState<{ key: keyof Student; direction: 'asc' | 'desc' } | null>({ key: 'name', direction: 'asc' });

  const filterOptions = useMemo(() => {
    const colleges = [...new Set(students.map(s => s.collegeName).filter(Boolean))].sort();
    const branches = [...new Set(students.map(s => s.course).filter(c => c && c !== 'N/A'))].sort();
    const years = [...new Set(students.map(s => s.year).filter((y): y is number => typeof y === 'number'))].sort((a, b) => Number(a) - Number(b));
    return { colleges, branches, years };
  }, [students]);

  const availableRooms = useMemo(() => rooms.filter(room => room.occupantIds.length < room.capacity), [rooms]);

  const handleRoomAssignment = (studentId: string, roomNumber: string) => {
    if (roomNumber) {
        assignRoom(studentId, parseInt(roomNumber, 10));
    }
  };

  const displayedStudents = useMemo(() => {
    let filteredStudents = students.filter(student => student.admissionStatus === 'Confirmed').filter(student => {
      const matchesCollege = filters.college === 'all' || student.collegeName === filters.college;
      const matchesBranch = filters.branch === 'all' || student.course === filters.branch;
      const matchesYear = filters.year === 'all' || student.year?.toString() === filters.year;
      
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' ||
        student.name.toLowerCase().includes(searchLower) ||
        (student.collegeName && student.collegeName.toLowerCase().includes(searchLower)) ||
        (student.contact && student.contact.includes(searchLower)) ||
        (student.fatherName && student.fatherName.toLowerCase().includes(searchLower)) ||
        (student.parentContact && student.parentContact.includes(searchLower)) ||
        student.id.toLowerCase().includes(searchLower);

      return matchesCollege && matchesBranch && matchesYear && matchesSearch;
    });

    if (sortConfig !== null) {
      filteredStudents.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredStudents;
  }, [students, searchTerm, filters, sortConfig]);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const requestSort = (key: keyof Student) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortDirection = (key: keyof Student) => {
      if (!sortConfig || sortConfig.key !== key) return 'none';
      return sortConfig.direction;
  }

  const headers: { key: keyof Student; label: string, sortable: boolean }[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'collegeName', label: 'College', sortable: true },
    { key: 'course', label: 'Branch', sortable: true },
    { key: 'year', label: 'Year', sortable: true },
    { key: 'contact', label: 'Student Phone', sortable: false },
    { key: 'parentContact', label: 'Parent Phone', sortable: false },
    { key: 'roomNumber', label: 'Room', sortable: true },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Database</h1>
      <p className="text-gray-500 mb-6">Displaying {displayedStudents.length} of {students.filter(s=>s.admissionStatus === 'Confirmed').length} confirmed students.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg border">
        <input
          type="text"
          placeholder="🔍 Search student or parent..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
        />
        <select name="college" value={filters.college} onChange={handleFilterChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-white">
          <option value="all">All Colleges</option>
          {filterOptions.colleges.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select name="branch" value={filters.branch} onChange={handleFilterChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-white">
          <option value="all">All Branches</option>
          {filterOptions.branches.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select name="year" value={filters.year} onChange={handleFilterChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-white">
          <option value="all">All Years</option>
          {filterOptions.years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white table-auto">
          <thead className="bg-gray-100 border-b-2 border-gray-200">
            <tr>
              {headers.map(header => (
                <th key={header.key} className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">
                  <button onClick={() => header.sortable && requestSort(header.key)} disabled={!header.sortable} className="flex items-center gap-2 w-full transition-colors hover:text-brand-primary disabled:cursor-default disabled:hover:text-gray-600">
                    <span>{header.label}</span>
                    {header.sortable && <SortIcon direction={getSortDirection(header.key)} />}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {displayedStudents.map((student) => (
              <tr key={student.id} className="hover:bg-yellow-50 border-b">
                <td className="py-3 px-4 font-medium">{student.name}</td>
                <td className="py-3 px-4">{student.collegeName}</td>
                <td className="py-3 px-4">{student.course}</td>
                <td className="py-3 px-4 text-center">{student.year || 'N/A'}</td>
                <td className="py-3 px-4">{student.contact || 'N/A'}</td>
                <td className="py-3 px-4">{student.parentContact || 'N/A'}</td>
                <td className="py-3 px-4">
                  <select
                      onChange={(e) => handleRoomAssignment(student.id, e.target.value)}
                      value={student.roomNumber || ""}
                      className="text-xs bg-white border border-gray-300 rounded p-1 focus:outline-none focus:ring-1 focus:ring-brand-primary w-full max-w-[120px]"
                  >
                      <option value="" disabled>{student.roomNumber ? `Room ${student.roomNumber}` : 'Assign'}</option>
                      {student.roomNumber && <option value={student.roomNumber}>Room {student.roomNumber}</option>}
                      {availableRooms.map(room => (
                          <option key={room.number} value={room.number}>
                              Room {room.number} ({room.occupantIds.length}/{room.capacity})
                          </option>
                      ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {displayedStudents.length === 0 && (
            <div className="text-center py-12 text-gray-500">
                <p className="text-lg font-semibold">No students found.</p>
                <p className="text-sm">Try adjusting your search or filter criteria.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default StudentListPage;