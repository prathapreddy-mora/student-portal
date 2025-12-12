import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Room } from '../../types';

const RoomsPage: React.FC = () => {
  const { rooms, students } = useAppContext();

  const getStudentName = (studentId?: string) => {
    if (!studentId) return 'N/A';
    return students.find(s => s.id === studentId)?.name || 'Unknown';
  };

  const firstFloorRooms = rooms.filter(r => r.floor === 1);
  const secondFloorRooms = rooms.filter(r => r.floor === 2);

  const getRoomCardStyle = (room: Room) => {
    const occupancy = room.occupantIds.length;
    if (occupancy === 0) return 'border-green-500 bg-green-50';
    if (occupancy < room.capacity) return 'border-yellow-500 bg-yellow-50';
    return 'border-red-500 bg-red-500 text-white'; // Full rooms have dark bg and light text
  };
  
  const getStatusTextStyle = (room: Room) => {
    const occupancy = room.occupantIds.length;
    if (occupancy === 0) return 'text-green-700';
    if (occupancy < room.capacity) return 'text-yellow-700';
    return 'text-red-100'; // Light text for full rooms
  }

  const RoomCard: React.FC<{ room: Room }> = ({ room }) => (
    <div className={`p-4 rounded-lg shadow-md border-l-4 ${getRoomCardStyle(room)}`}>
      <p className="font-bold text-lg">Room {room.number}</p>
      <p className={`font-semibold ${getStatusTextStyle(room)}`}>
        {room.occupantIds.length} / {room.capacity} Occupied
      </p>
      {room.occupantIds.length > 0 && (
        <ul className="text-xs mt-2 space-y-1">
          {room.occupantIds.map(id => (
            <li key={id} className="truncate">- {getStudentName(id)}</li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Room Status</h1>
      
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b-2 pb-2">First Floor (101 - 120)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {firstFloorRooms.map(room => (
            <RoomCard key={room.number} room={room} />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b-2 pb-2">Second Floor (201 - 218)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {secondFloorRooms.map(room => (
            <RoomCard key={room.number} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;