// src/pages/Pharmacy/Pharmacy.jsx
import { useState } from 'react';
import { 
  FiBox, FiCheckCircle, FiAlertCircle, FiActivity, FiX 
} from 'react-icons/fi';
import { FaPills } from 'react-icons/fa';
import { useNotification } from '../../context/NotificationContext';

const initialPendingRxData = [
  {
    id: 'RX-2026-0892',
    patient: 'Oluwaseun Adeleke',
    matric: '214567',
    doctor: 'Dr. Adanna Eze',
    time: '09:10 AM',
    meds: [
      { name: 'Rabeprazole Sodium 20mg', qty: '14 capsules' },
      { name: 'Gaviscon Liquid 200ml', qty: '1 bottle' },
      { name: 'Paracetamol 500mg', qty: '20 tablets' },
    ],
    priority: false,
  },
  {
    id: 'RX-2026-0893',
    patient: 'Chioma Okonkwo',
    matric: '219804',
    doctor: 'Dr. T. Olaolapo',
    time: '09:05 AM',
    meds: [
      { name: 'Artemether/Lumefantrine 80/480mg', qty: '6 tablets' },
      { name: 'Paracetamol 500mg', qty: '18 tablets' },
    ],
    priority: true,
  },
];

const initialLowStockData = [
  { id: 1, name: 'Rabeprazole Sodium 20mg', stock: 12, threshold: 50 },
  { id: 2, name: 'Artemether/Lumefantrine 80/480mg', stock: 8, threshold: 30 },
  { id: 3, name: 'Amoxicillin 500mg', stock: 15, threshold: 40 },
  { id: 4, name: 'Gaviscon Liquid 200ml', stock: 4, threshold: 20 },
];

export default function Pharmacy() {
  const { notifySuccess, notifyInfo } = useNotification();
  const [activeTab, setActiveTab] = useState('dispense');
  const [pendingRx, setPendingRx] = useState(initialPendingRxData);
  const [lowStock, setLowStock] = useState(initialLowStockData);

  const handleDispense = (rx) => {
    if (!window.confirm(`Confirm dispense of ${rx.meds.length} item(s) for ${rx.patient}?`)) return;
    setPendingRx(pendingRx.filter(p => p.id !== rx.id));
    notifySuccess(`Rx ${rx.id} dispensed to ${rx.patient}.`);
  };

  const handleReject = (rx) => {
    const reason = window.prompt('Reason for rejecting this prescription:');
    if (!reason) return;
    setPendingRx(pendingRx.filter(p => p.id !== rx.id));
    notifyInfo(`Rx ${rx.id} rejected: ${reason}`);
  };

  const handleReorder = (item) => {
    setLowStock(lowStock.map(i =>
      i.id === item.id ? { ...i, stock: i.threshold + 100 } : i
    ));
    notifySuccess(`Reorder placed for ${item.name}.`);
  };

  const handleVerifyInteractions = () => {
    notifySuccess('No drug interactions detected in current queue.');
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-10">
      
      <div>
        <h1 className="text-2xl font-bold text-[#14357A]">Pharmacy & Dispensary</h1>
        <p className="text-sm text-gray-500">Process prescriptions, manage inventory, and verify drug interactions.</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-gray-500 uppercase">Pending Rx</p>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#14357A] flex items-center justify-center"><FiBox size={16} /></div>
          </div>
          <h3 className="text-3xl font-bold text-[#14357A]">{pendingRx.length}</h3>
          <p className="text-[10px] text-gray-500 mt-1">{pendingRx.filter(r => r.priority).length} urgent</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-gray-500 uppercase">Dispensed Today</p>
            <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><FiCheckCircle size={16} /></div>
          </div>
          <h3 className="text-3xl font-bold text-[#14357A]">{47 + (initialPendingRxData.length - pendingRx.length)}</h3>
          <p className="text-[10px] text-green-600 mt-1">On track</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-gray-500 uppercase">Low Stock</p>
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center"><FiAlertCircle size={16} /></div>
          </div>
          <h3 className="text-3xl font-bold text-[#14357A]">{lowStock.length}</h3>
          <p className="text-[10px] text-red-600 mt-1">Reorder required</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-gray-500 uppercase">Inventory</p>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#14357A] flex items-center justify-center"><FiActivity size={16} /></div>
          </div>
          <h3 className="text-3xl font-bold text-[#14357A]">1,284</h3>
          <p className="text-[10px] text-gray-500 mt-1">SKUs tracked</p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex bg-white border border-gray-200 rounded-lg p-1 shadow-sm w-max">
        <button onClick={() => setActiveTab('dispense')} className={`px-4 py-1.5 rounded-md text-xs font-bold ${activeTab === 'dispense' ? 'bg-[#14357A] text-white' : 'text-gray-500'}`}>Pending Prescriptions ({pendingRx.length})</button>
        <button onClick={() => setActiveTab('inventory')} className={`px-4 py-1.5 rounded-md text-xs font-bold ${activeTab === 'inventory' ? 'bg-[#14357A] text-white' : 'text-gray-500'}`}>Low Stock ({lowStock.length})</button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          {activeTab === 'dispense' ? (
            pendingRx.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><FiCheckCircle size={32} /></div>
                <h3 className="font-bold text-[#14357A] mb-2">All Prescriptions Dispensed</h3>
                <p className="text-sm text-gray-500">No pending prescriptions in the queue.</p>
              </div>
            ) : (
              pendingRx.map((rx) => (
                <div key={rx.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-[#14357A]">{rx.patient}</h3>
                        {rx.priority && <span className="bg-red-100 text-red-700 text-[9px] font-bold px-1.5 py-0.5 rounded">PRIORITY</span>}
                      </div>
                      <p className="text-xs text-gray-500">Matric: {rx.matric} • {rx.doctor}</p>
                    </div>
                    <div className="text-right"><p className="text-[10px] text-gray-400 uppercase font-bold">Rx ID</p><p className="text-xs font-bold text-[#14357A]">{rx.id}</p></div>
                  </div>
                  <div className="space-y-1.5 mb-4">
                    {rx.meds.map((m, i) => (
                      <div key={i} className="flex justify-between text-xs bg-[#F8FAFC] p-2 rounded border border-gray-100">
                        <span className="font-semibold text-gray-700">{m.name}</span>
                        <span className="text-gray-500">{m.qty}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleReject(rx)} className="bg-white border border-gray-200 text-gray-600 text-xs font-bold px-3 py-1.5 rounded hover:bg-gray-50">Reject</button>
                    <button onClick={() => handleDispense(rx)} className="bg-[#14357A] text-white text-xs font-bold px-4 py-1.5 rounded hover:bg-[#0C2356] flex items-center gap-1"><FiCheckCircle size={12} /> Dispense</button>
                  </div>
                </div>
              ))
            )
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h3 className="font-bold text-[#14357A] mb-4 flex items-center gap-2"><FiAlertCircle className="text-red-500" /> Low Stock Items</h3>
              <div className="space-y-2">
                {lowStock.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-lg">
                    <div>
                      <p className="text-xs font-bold text-gray-700">{item.name}</p>
                      <p className="text-[10px] text-gray-500">Stock: {item.stock} / Threshold: {item.threshold}</p>
                    </div>
                    <button onClick={() => handleReorder(item)} className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-red-700">Reorder</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-sm text-[#14357A] mb-3 flex items-center gap-2"><FaPills className="text-[#F5B041]" /> Drug Interaction Checker</h3>
            <input type="text" placeholder="Search drug..." className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-xs outline-none mb-2" />
            <button onClick={handleVerifyInteractions} className="w-full bg-[#14357A] text-white text-xs font-bold py-2 rounded-md hover:bg-[#0C2356]">Verify Interactions</button>
          </div>
          <div className="bg-[#14357A] text-white p-5 rounded-xl shadow-lg">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2"><FiActivity /> Dispensary Status</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-blue-300">Counter Open</span><span className="font-bold text-green-300">Yes</span></div>
              <div className="flex justify-between"><span className="text-blue-300">On Duty</span><span className="font-bold">Pharm. T. Alabi</span></div>
              <div className="flex justify-between"><span className="text-blue-300">Avg Dispense Time</span><span className="font-bold">4m 12s</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}