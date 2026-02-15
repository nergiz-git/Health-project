// import { Plus, Pill, Clock, Edit, Trash2 } from "lucide-react";

// const medications = [
//   {
//     id: 1,
//     name: "Metformin",
//     dose: "500mg",
//     time: "08:00 AM",
//     frequency: "Twice daily",
//     note: "Take with food",
//   },
//   {
//     id: 2,
//     name: "Lisinopril",
//     dose: "10mg",
//     time: "08:00 AM",
//     frequency: "Once daily",
//   },
//   {
//     id: 3,
//     name: "Atorvastatin",
//     dose: "20mg",
//     time: "02:00 PM",
//     frequency: "Once daily",
//   },
// ];

// export default function MedicationsPage() {
//   return (
//     <main className="flex-1 overflow-y-auto">
//       <div className="max-w-[1600px] mx-auto px-8 py-10 relative">

//         {/* BACKGROUND IMAGE */}
//         <div
//           className="fixed inset-0 opacity-20 bg-cover bg-center pointer-events-none"
//           style={{
//             backgroundImage: "url('/medications-bg.png')", // assets foldera at
//             zIndex: 0,
//           }}
//         />

//         <div className="relative z-10">

//           {/* HEADER */}
//           <div className="flex items-center justify-between mb-10">
//             <div>
//               <h1 className="text-[28px] font-bold text-slate-900 mb-2">
//                 Dərmanlar
//               </h1>
//               <p className="text-slate-500">
//                 Dərman qəbulunuzu idarə edin və qeyd tutun.
//               </p>
//             </div>

//             <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/30">
//               <Plus size={20} />
//               Dərman Əlavə Et
//             </button>
//           </div>

//           {/* GRID */}
//           <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//             {medications.map((med) => (
//               <div
//                 key={med.id}
//                 className="bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all"
//               >
//                 <div className="p-7">

//                   {/* TOP */}
//                   <div className="flex gap-4">
//                     <div className="p-3 bg-blue-100 rounded-xl h-fit">
//                       <Pill className="text-blue-600" />
//                     </div>

//                     <div className="flex-1">
//                       <h3 className="text-xl font-bold text-slate-900">
//                         {med.name}
//                       </h3>
//                       <p className="text-slate-600 font-medium">{med.dose}</p>

//                       <div className="flex gap-6 text-sm text-slate-600 mt-3">
//                         <div className="flex items-center gap-2">
//                           <Clock size={16} />
//                           {med.time}
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Pill size={16} />
//                           {med.frequency}
//                         </div>
//                       </div>

//                       {med.note && (
//                         <div className="bg-slate-50 rounded-lg p-3 mt-4 text-sm text-slate-600">
//                           {med.note}
//                         </div>
//                       )}

//                       {/* ACTIONS */}
//                       <div className="flex gap-3 mt-5">
//                         <button className="flex items-center gap-2 border border-blue-300 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 font-semibold">
//                           <Edit size={16} />
//                           Redaktə Et
//                         </button>

//                         <button className="flex items-center gap-2 border border-red-300 text-red-600 px-4 py-2 rounded-md hover:bg-red-50 font-semibold">
//                           <Trash2 size={16} />
//                           Sil
//                         </button>
//                       </div>

//                     </div>
//                   </div>

//                 </div>
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>
//     </main>
//   );
// }


import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";


import { Plus, Pill, Clock, Trash2, Pencil,Utensils } from "lucide-react";

import AddMedicationModal from "./AddMedicationModal";
import EditMedicationModal from "./EditMedicationModal";

function MedicationsPage() {
  // 🔹 dərman state
const { user } = useOutletContext();
const storageKey = `medications_${user?.id}`;
const [medications, setMedications] = useState(() => {
  const saved = localStorage.getItem(storageKey);
  return saved ? JSON.parse(saved) : [];
});

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingMed, setEditingMed] = useState(null);


  // ➕ ADD
  const handleAddMedication = (data) => {
    const newMed = {
      id: Date.now(),
      ...data,
    };
    setMedications((prev) => [...prev, newMed]);
    setIsAddOpen(false);
  };

  // ✏️ EDIT
  const handleUpdateMedication = (updatedMed) => {
    setMedications((prev) =>
      prev.map((m) => (m.id === updatedMed.id ? updatedMed : m))
    );
    setEditingMed(null);
  };

  // 🗑 DELETE
  const handleDeleteMedication = (id) => {
    setMedications((prev) => prev.filter((m) => m.id !== id));
  };
useEffect(() => {
  if (user?.id) {
    localStorage.setItem(storageKey, JSON.stringify(medications));
  }
}, [medications, storageKey, user]);


  return (
    <div className=" !max-w-[1400px] mx-auto   py-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="!text-xl font-bold">Dərmanlar</h1>
          <p className="text-slate-500">
            Dərman qəbulunuzu idarə edin və qeyd tutun.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 text-white px-5 py-2.5 rounded-xl w-full md:w-auto"
        >
          <Plus size={18} />
          Dərman Əlavə Et
        </button>
      </div>

      {/* EMPTY STATE */}
      {medications.length === 0 && (
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-16 text-center shadow flex flex-col items-center">
          <Pill className="mb-4 text-gray-500" size={48} />
          <h2 className="text-2xl font-semibold mb-2">Hələ dərman yoxdur</h2>
          <p className="text-slate-500 mb-6 max-w-md">
            Cədvəlinizi izləməyə başlamaq üçün ilk dərmanınızı əlavə edin.
          </p>

          <button
            onClick={() => setIsAddOpen(true)}
            className="!bg-blue-600 text-white  mt-[35px] w-full px-6 py-2 rounded-lg"
          >
            + Dərman Əlavə Et
          </button>
        </div>
      )}

      {/* MEDICATION GRID */}
      {medications.length > 0 && (
        <div className="grid gap-6 ">
          {medications.map((med) => (
            <div
              key={med.id}
              className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow flex flex-col justify-between gap-4"
            >
            {/* TOP ROW */}
<div className="flex gap-4 items-start">

  {/* SOLDA BÖYÜK ICON */}
  <div className="bg-blue-100 p-3 rounded-xl">
    <Pill size={28} className="text-blue-600" />
  </div>

  {/* NAME + INFO */}
  <div className="space-y-1">
    <h3 className="text-xl font-semibold">{med.name}</h3>
    <p className="text-slate-500">{med.dose}
      <span>mg</span>
    </p>

    {/* <div className="flex gap-6 text-sm text-slate-600 mt-1">
      <span className="flex items-center gap-1">
        <Clock size={16} />
        {med.time}
        <span>AM</span>
      </span>

      <span className="flex items-center gap-1">
        <Pill size={16} />
        {med.frequency}
      </span>
    </div> */}
    <div className="flex gap-6 text-sm text-slate-600 mt-1 flex-wrap">

  {/* TIME */}
  <span className="flex items-center mt-[10px] gap-1">
    <Clock size={16} />
    {med.time}
  </span>

  {/* FREQUENCY */}
  <span className="flex items-center mt-[10px] gap-1">
    <Pill size={16} />
    {med.frequency}
  </span>

  {/* INTAKE CONDITION */}
  {med.intakeCondition && (
    <span className="flex items-center mt-[10px] gap-1">
      <Utensils size={16} />
      {med.intakeCondition}
    </span>
  )}

</div>

  </div>
</div>

{/* NOTE */}
{med.note && (
  <div className="bg-gray-100 rounded-xl mt-[15px] ml-[65px] px-4 py-3 text-gray-600 text-sm">
    {med.note}
  </div>
)}


              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setEditingMed(med)}
                  className="flex w-[200px] ml-[65px] items-center gap-1 border px-3 py-1 rounded-lg text-blue-600  justify-center"
                >
                  <Pencil size={16} /> Redaktə Et
                </button>

                <button
                  onClick={() => handleDeleteMedication(med.id)}
                  className="flex w-[120px] items-center gap-1 border px-3 py-1 rounded-lg text-red-600  justify-center"
                >
                  <Trash2 size={16} /> Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODALS */}
      <AddMedicationModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddMedication}
      />

      <EditMedicationModal
        medication={editingMed}
        onClose={() => setEditingMed(null)}
        onUpdate={handleUpdateMedication}
      />
    </div>
  );
}
export default MedicationsPage;