'use client'

import { useState, useEffect } from 'react'
import { createClient } from '../../../lib/supabase/client'
import { Plus, Search, Eye, Edit3, Trash2, ShieldAlert, Check, X } from 'lucide-react'

export default function AdminCollegesPage() {
  const [colleges, setColleges] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)
  const [editingCollege, setEditingCollege] = useState<any>(null)
  const [selectedCollege, setSelectedCollege] = useState<any>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const [formData, setFormData] = useState({
    college_name: '',
    email: '',
    password: '',
    status: 'active'
  })

  const supabase = createClient()

  useEffect(() => {
    loadColleges()
  }, [])

  const loadColleges = async () => {
    try {
      setLoading(true)
      const { data } = await supabase.from('colleges').select('*')
      setColleges(data || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenCreate = () => {
    setEditingCollege(null)
    setFormData({
      college_name: '',
      email: '',
      password: 'password',
      status: 'active'
    })
    setShowFormModal(true)
  }

  const handleOpenEdit = (college: any) => {
    setEditingCollege(college)
    setFormData({
      college_name: college.college_name,
      email: college.email,
      password: college.password || 'password',
      status: college.status || 'active'
    })
    setShowFormModal(true)
  }

  const handleOpenDetails = async (college: any) => {
    // Get student count for this college from mock_students
    const { data: students } = await supabase.from('students').select('*').eq('college_id', college.id)
    setSelectedCollege({
      ...college,
      studentCount: students ? students.length : 0
    })
    setShowDetailsModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setActionLoading(true)

    if (editingCollege) {
      // Update
      const { error } = await supabase
        .from('colleges')
        .update({
          college_name: formData.college_name,
          email: formData.email,
          password: formData.password,
          status: formData.status
        })
        .eq('id', editingCollege.id)

      if (error) {
        alert('Error: ' + error.message)
      } else {
        alert('College updated successfully!')
        setShowFormModal(false)
        loadColleges()
      }
    } else {
      // Create
      const { error } = await supabase
        .from('colleges')
        .insert(formData)

      if (error) {
        alert('Error: ' + error.message)
      } else {
        alert('College created successfully!')
        setShowFormModal(false)
        loadColleges()
      }
    }
    setActionLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this college? This will also remove associated college login accounts.')) return
    setActionLoading(true)
    const { error } = await supabase.from('colleges').delete().eq('id', id)
    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('College deleted successfully!')
      loadColleges()
    }
    setActionLoading(false)
  }

  const toggleStatus = async (college: any) => {
    const newStatus = college.status === 'active' ? 'inactive' : 'active'
    setActionLoading(true)
    const { error } = await supabase
      .from('colleges')
      .update({ status: newStatus })
      .eq('id', college.id)
    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert(`College status updated to ${newStatus}!`)
      loadColleges()
    }
    setActionLoading(false)
  }

  // Filter colleges based on search query
  const filteredColleges = colleges.filter(col => 
    col.college_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    col.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return <div style={{ padding: '100px 20px', textAlign: 'center', fontSize: '18px', color: 'var(--text-secondary)' }}>Loading Colleges...</div>
  }

  return (
    <div className="premium-container fade-in" style={{ padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>🏫 College Management</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Register institutions, manage login authorization credentials and toggle account status.</p>
        </div>
        <button onClick={handleOpenCreate} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> Create College
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '32px', position: 'relative', maxWidth: '480px' }}>
        <input 
          placeholder="Search colleges by name or email..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          className="premium-input"
          style={{ paddingLeft: '44px' }}
        />
        <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
          <Search size={18} />
        </div>
      </div>

      {/* Colleges Table */}
      <div className="table-container fade-in">
        <table className="premium-table">
          <thead>
            <tr>
              <th>College Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredColleges.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>No colleges found.</td>
              </tr>
            ) : (
              filteredColleges.map((col) => {
                const isActive = col.status === 'active'
                return (
                  <tr key={col.id}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{col.college_name}</td>
                    <td>{col.email}</td>
                    <td>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 600,
                        background: isActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: isActive ? 'var(--success)' : 'var(--danger)'
                      }}>
                        {isActive ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </td>
                    <td>{new Date(col.created_at).toLocaleDateString()}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleOpenDetails(col)} className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '13px' }} title="View Details">
                          <Eye size={14} />
                        </button>
                        <button onClick={() => handleOpenEdit(col)} className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '13px' }} title="Edit">
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => toggleStatus(col)} className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '13px', color: isActive ? 'var(--danger)' : 'var(--success)', borderColor: isActive ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)' }} title={isActive ? 'Deactivate' : 'Activate'}>
                          {isActive ? <X size={14} /> : <Check size={14} />}
                        </button>
                        <button onClick={() => handleDelete(col.id)} className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '13px', color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.2)' }} title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Form Modal */}
      {showFormModal && (
        <div className="modal-overlay">
          <div className="glass-card fade-in" style={{ width: '100%', maxWidth: '480px', padding: '32px' }}>
            <h2 style={{ fontSize: '22px', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>
              {editingCollege ? 'Edit College' : 'Create New College'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
              Define login credentials and properties for the institution.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '28px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '13px', color: 'var(--text-secondary)' }}>College Name *</label>
                  <input 
                    name="college_name" 
                    value={formData.college_name} 
                    onChange={(e) => setFormData({ ...formData, college_name: e.target.value })} 
                    required 
                    className="premium-input"
                    placeholder="e.g. PSNA College of Engineering"
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '13px', color: 'var(--text-secondary)' }}>Email Address *</label>
                  <input 
                    type="email"
                    name="email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    required 
                    className="premium-input"
                    placeholder="e.g. psna@college.com"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '13px', color: 'var(--text-secondary)' }}>Password *</label>
                  <input 
                    type="password"
                    name="password" 
                    value={formData.password} 
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                    required 
                    className="premium-input"
                    placeholder="Password"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '13px', color: 'var(--text-secondary)' }}>Status</label>
                  <select 
                    value={formData.status} 
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })} 
                    className="premium-input premium-select"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowFormModal(false)} className="btn btn-secondary" style={{ padding: '8px 20px' }}>Cancel</button>
                <button type="submit" disabled={actionLoading} className="btn btn-primary" style={{ padding: '8px 24px' }}>
                  {actionLoading ? 'Saving...' : 'Save College'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* College Details Modal */}
      {showDetailsModal && selectedCollege && (
        <div className="modal-overlay">
          <div className="glass-card fade-in" style={{ width: '100%', maxWidth: '480px', padding: '32px' }}>
            <h2 style={{ fontSize: '22px', marginBottom: '16px', fontFamily: 'var(--font-display)' }}>College Details</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '28px' }}>
              <p><strong>College Name:</strong> <span style={{ color: 'var(--text-primary)' }}>{selectedCollege.college_name}</span></p>
              <p><strong>Email Address:</strong> <span style={{ color: 'var(--text-primary)' }}>{selectedCollege.email}</span></p>
              <p><strong>Login Password:</strong> <span style={{ color: 'var(--text-primary)' }}>{selectedCollege.password}</span></p>
              <p><strong>Total Registered Students:</strong> <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{selectedCollege.studentCount}</span></p>
              <p><strong>Status:</strong> <span style={{ color: selectedCollege.status === 'active' ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>{selectedCollege.status.toUpperCase()}</span></p>
              <p><strong>Created Date:</strong> {new Date(selectedCollege.created_at).toLocaleString()}</p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowDetailsModal(false)} className="btn btn-secondary" style={{ padding: '10px 24px' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
