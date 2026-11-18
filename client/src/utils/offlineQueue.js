/**
 * Offline Attendance Queue for Mobile & Intermittent Connectivity
 * Allows teachers to take attendance in classrooms without active internet.
 */

const QUEUE_KEY = 'hamro_vidhyalaya_offline_attendance_queue';

export function getOfflineQueue() {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading offline queue:', err);
    return [];
  }
}

export function saveToOfflineQueue(batch) {
  try {
    const queue = getOfflineQueue();
    // Add timestamp & client-generated batch ID
    const entry = {
      id: 'batch-' + Date.now(),
      createdAt: new Date().toISOString(),
      ...batch
    };
    queue.push(entry);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    return entry;
  } catch (err) {
    console.error('Error saving to offline queue:', err);
    return null;
  }
}

export function clearOfflineQueue() {
  localStorage.removeItem(QUEUE_KEY);
}

export async function syncOfflineQueueToServer(token) {
  const queue = getOfflineQueue();
  if (queue.length === 0) return { syncedBatches: 0, totalRecords: 0 };

  let totalRecords = 0;
  let syncedBatches = 0;

  for (const batch of queue) {
    try {
      const res = await fetch('/api/attendance/offline-sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          sync_batch_id: batch.id,
          records: batch.records,
          date_bs: batch.date_bs,
          device_info: navigator.userAgent
        })
      });

      if (res.ok) {
        syncedBatches++;
        totalRecords += (batch.records ? batch.records.length : 0);
      }
    } catch (err) {
      console.warn('Network failed during offline sync:', err.message);
      // Stop and keep remaining in queue
      break;
    }
  }

  // If all synced, clear queue
  if (syncedBatches === queue.length) {
    clearOfflineQueue();
  } else {
    // Keep un-synced items
    const remaining = queue.slice(syncedBatches);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
  }

  return { syncedBatches, totalRecords, remainingCount: getOfflineQueue().length };
}
