import { useState, useEffect } from 'react';
import { FiBox, FiCheckCircle, FiAlertCircle, FiActivity } from 'react-icons/fi';
import { FaPills } from 'react-icons/fa';
import { useNotification } from '../../context/NotificationContext';
import {
  getPharmacyQueue,
  getStock,
  dispensePrescription,
  rejectPrescription,
  reorderStock,
} from '../../services/pharmacyService';

export default function Pharmacy() {
  const { notifySuccess, notifyError, notifyInfo } = useNotification();
  const [activeTab, setActiveTab] = useState('dispense');
  const [queue, setQueue] = useState([]);
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    setLoading(true);
    setError('');
    try {
      const [q, s] = await Promise.all([getPharmacyQueue(), getStock()]);
      setQueue(q || []);
      setStock(s || []);
    } catch (err) {
      setError(err.message || 'Failed to load pharmacy data');
    } finally {
      setLoading(false);
    }
  }

  const pendingRx = [];
  const prescriptionItems = [];
  queue.forEach((c) => {
    (c.prescription || []).forEach((p) => {
      if (!p.dispensed && !p.rejected) {
        prescriptionItems.push({
          consultationId: c.id,
          patient: `${c.patientId?.firstName || ''} ${c.patientId?.lastName || ''}`.trim(),
          matric: c.patientId?.patientId || '',
          doctor: c.doctorId?.name || '',
          item: p,
        });
      }
    });
  });

  const lowStock = stock.filter((s) => s.stock < s.threshold);

  const handleDispense = async (rx) => {
    if (!window.confirm(`Dispense ${rx.item.drug} for ${rx.patient}?`)) return;
    try {
      await dispensePrescription(rx.item.id);
      notifySuccess(`Dispensed ${rx.item.drug}`);
      refresh();
    } catch (err) {
      notifyError(err.message || 'Dispense failed');
    }
  };

  const handleReject = async (rx) => {
    const reason = window.prompt('Reason for rejecting this prescription:');
    if (!reason) return;
    try {
      await rejectPrescription(rx.item.id, reason);
      notifyInfo(`Rejected: ${reason}`);
      refresh();
    } catch (err) {
      notifyError(err.message || 'Rejection failed');
    }
  };

  const handleReorder = async (item) => {
    try {
      await reorderStock(item.id, 100);
      notifySuccess(`Reordered ${item.name}`);
      refresh();
    } catch (err) {
      notifyError(err.message || 'Reorder failed');
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-[#14357A]">Pharmacy & Dispensary</h1>
        <p className="text-sm text-gray-500">Process prescriptions, manage inventory, and verify drug interactions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-gray-500 uppercase">Pending Rx</p>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#14357A] flex items-center justify-center"><FiBox size={16} /></div>
          </div>
          <h3 className="text-3xl font-bold text-[#14357A]">{prescriptionItems.length}</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-gray-500 uppercase">Low Stock</p>
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center"><FiAlertCircle size={16} /></div>
          </div>
          <h3 className="text-3xl font-bold text-[#14357A]">{lowStock.length}</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-gray-500 uppercase">Total Stock Items</p>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#14357A] flex items-center justify-center"><FiActivity size={16} /></div>
          </div>
          <h3 className="text-3xl font-bold text-[#14357A]">{stock.length}</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-gray-500 uppercase">Dispensed Today</p>
            <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><FiCheckCircle size={16} /></div>
          </div>
          <h3 className="text-3xl font-bold text-[#14357A]">—</h3>
        </div>
      </div>

      <div className="flex bg-white border border-gray-200 rounded-lg p-1 shadow-sm w-max">
        <button onClick={() => setActiveTab('dispense')} className={`px-4 py-1.5 rounded-md text-xs font-bold ${activeTab === 'dispense' ? 'bg-[#14357A] text-white' : 'text-gray-500'}`}>
          Pending Prescriptions ({prescriptionItems.length})
        </button>
        <button onClick={() => setActiveTab('inventory')} className={`px-4 py-1.5 rounded-md text-xs font-bold ${activeTab === 'inventory' ? 'bg-[#14357A] text-white' : 'text-gray-500'}`}>
          Low Stock ({lowStock.length})
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : activeTab === 'dispense' ? (
            prescriptionItems.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><FiCheckCircle size={32} /></div>
                <h3 className="font-bold text-[#14357A] mb-2">All Prescriptions Dispensed</h3>
                <p className="text-sm text-gray-500">No pending prescriptions in the queue.</p>
              </div>
            ) : (
              prescriptionItems.map((rx) => (
                <div key={rx.item.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-[#14357A]">{rx.patient}</h3>
                      <p className="text-xs text-gray-500">{rx.matric} • {rx.doctor}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Rx</p>
                      <p className="text-xs font-bold text-[#14357A]">{rx.item.id}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-xs bg-[#F8FAFC] p-2 rounded border border-gray-100">
                      <span className="font-semibold text-gray-700">{rx.item.drug}</span>
                      <span className="text-gray-500">{rx.item.dose} • {rx.item.frequency} • {rx.item.duration}</span>
                    </div>
                    {rx.item.instructions && (
                      <p className="text-[10px] text-gray-500 px-2">{rx.item.instructions}</p>
                    )}
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
              {lowStock.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-6">No low stock items.</p>
              ) : (
                <div className="space-y-2">
                  {lowStock.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-lg">
                      <div>
                        <p className="text-xs font-bold text-gray-700">{item.name}</p>
                        <p className="text-[10px] text-gray-500">Stock: {item.stock} / Threshold: {item.threshold} {item.unit}</p>
                      </div>
                      <button onClick={() => handleReorder(item)} className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-red-700">Reorder</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-sm text-[#14357A] mb-3 flex items-center gap-2"><FaPills className="text-[#F5B041]" /> Full Stock</h3>
            {stock.length === 0 ? (
              <p className="text-xs text-gray-500">No stock records.</p>
            ) : (
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {stock.map((s) => (
                  <div key={s.id} className="flex justify-between text-xs border-b border-gray-100 py-1.5">
                    <span className="text-gray-700 truncate">{s.name}</span>
                    <span className={`font-bold ml-2 ${s.stock < s.threshold ? 'text-red-600' : 'text-green-700'}`}>{s.stock}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}